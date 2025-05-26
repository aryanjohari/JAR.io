import json
import boto3
import os
import uuid
from datetime import datetime
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
from utils.logger import loadLogger
from utils.response import success, error

logger = loadLogger(__name__)
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def create_entry(event):
    try:
        body = json.loads(event.get('body', '{}'))
        if not body.get('text') or not body.get('date'):
            logger.debug("Missing required fields: text, date")
            return error(400, "Missing required fields: text, date")
        
        entry_id = str(uuid.uuid4())
        item = {
            'PK': 'scrapbook',
            'SK': f'name#{entry_id}',
            'type': 'scrapbook',
            'text': body['text'],
            'photo': body.get('photo', ''),
            'date': body['date'],
            'created_at': int(datetime.now().timestamp() * 1000)
        }
        table.put_item(Item=item)
        logger.debug(f"Created scrapbook entry: {entry_id}")
        return success(200, {'message': 'Entry saved', 'entryId': entry_id})
    
    except ClientError as e:
        logger.debug(f"DynamoDB error: {str(e)}")
        return error(500, f"DynamoDB error: {str(e)}")
    except json.JSONDecodeError:
        logger.debug("Invalid JSON in request body")
        return error(400, "Invalid JSON in request body")
    except Exception as e:
        logger.debug(f"Internal server error: {str(e)}")
        return error(500, "Internal server error")

def list_entries(event):
    try:
        response = table.query(
            KeyConditionExpression=Key('PK').eq('scrapbook')
        )
        logger.debug("Retrieved scrapbook entries")
        return success(200, response['Items'])
    
    except ClientError as e:
        logger.debug(f"DynamoDB error: {str(e)}")
        return error(500, f"DynamoDB error: {str(e)}")
    except Exception as e:
        logger.debug(f"Internal server error: {str(e)}")
        return error(500, "Internal server error")