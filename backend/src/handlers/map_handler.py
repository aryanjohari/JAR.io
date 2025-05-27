import json
import boto3
import os
import uuid
from decimal import Decimal
from datetime import datetime
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
from utils.logger import loadLogger
from utils.response import success, error

logger = loadLogger(__name__)
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def create_pin(event):
    try:
        body = json.loads(event.get('body', '{}'))
        required_fields = ['latitude', 'longitude', 'description', 'date']
        if not all(body.get(field) for field in required_fields):
            logger.debug("Missing required fields: latitude, longitude, description, date")
            return error(400, "Missing required fields: latitude, longitude, description, date")
        
        # Validate latitude and longitude
        try:
            lat = float(body['latitude'])
            lon = float(body['longitude'])
            if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
                logger.debug("Invalid coordinates: latitude must be [-90, 90], longitude [-180, 180]")
                return error(400, "Invalid coordinates")
        except ValueError:
            logger.debug("Invalid coordinate format: must be numbers")
            return error(400, "Invalid coordinate format")

        pin_id = str(uuid.uuid4())
        item = {
            'PK': 'map',
            'SK': f'pin#{pin_id}',
            'type': 'map',
            'latitude': Decimal(str(lat)),
            'longitude': Decimal(str(lon)),
            'description': body['description'],
            'date': body['date'],
            'created_at': int(datetime.now().timestamp() * 1000)
        }
        table.put_item(Item=item)
        logger.debug(f"Created map pin: {pin_id}")
        return success(200, {'message': 'Pin saved', 'pinId': pin_id})
    
    except ClientError as e:
        logger.debug(f"DynamoDB error: {str(e)}")
        return error(500, f"DynamoDB error: {str(e)}")
    except json.JSONDecodeError:
        logger.debug("Invalid JSON in request body")
        return error(400, "Invalid JSON in request body")
    except Exception as e:
        logger.debug(f"Internal server error: {str(e)}")
        return error(500, "Internal server error")

def list_pins(event):
    try:
        response = table.query(
            KeyConditionExpression=Key('PK').eq('map')
        )
        logger.debug("Retrieved map pins")
        return success(200, response['Items'])
    
    except ClientError as e:
        logger.debug(f"DynamoDB error: {str(e)}")
        return error(500, f"DynamoDB error: {str(e)}")
    except Exception as e:
        logger.debug(f"Internal server error: {str(e)}")
        return error(500, "Internal server error")