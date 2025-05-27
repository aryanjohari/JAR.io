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

def generate_response(user_message: str) -> str:
    """Generate a simple rule-based companion response."""
    user_message = user_message.lower().strip()
    responses = {
        'hi': 'Hello! How can I make your day even better?',
        'hello': 'Hey there! What’s on your mind?',
        'how are you': 'I’m just a bundle of code, but I’m happy to chat!',
        'love': 'Aww, that’s so sweet! Tell me more about what you love.',
        'thanks': 'You’re welcome! 😊',
        'bye': 'Catch you later! Have a great day!'
    }
    
    for keyword, response in responses.items():
        if keyword in user_message:
            return response
    
    return 'I’m here for you! What’s up?'

def send_message(event):
    try:
        body = json.loads(event.get('body', '{}'))
        user_message = body.get('message')
        if not user_message:
            logger.debug("Missing required field: message")
            return error(400, "Missing required field: message")

        companion_response = generate_response(user_message)
        message_id = str(uuid.uuid4())
        timestamp = int(datetime.now().timestamp() * 1000)
        
        item = {
            'PK': 'companion',
            'SK': f'message#{message_id}',
            'type': 'companion',
            'user_message': user_message,
            'companion_response': companion_response,
            'timestamp': timestamp
        }
        table.put_item(Item=item)
        logger.debug(f"Saved companion message: {message_id}")
        return success(200, {
            'messageId': message_id,
            'userMessage': user_message,
            'companionResponse': companion_response,
            'timestamp': timestamp
        })
    
    except ClientError as e:
        logger.debug(f"DynamoDB error: {str(e)}")
        return error(500, f"DynamoDB error: {str(e)}")
    except json.JSONDecodeError:
        logger.debug("Invalid JSON in request body")
        return error(400, "Invalid JSON in request body")
    except Exception as e:
        logger.debug(f"Internal server error: {str(e)}")
        return error(500, "Internal server error")

def get_history(event):
    try:
        response = table.query(
            KeyConditionExpression=Key('PK').eq('companion'),
            ScanIndexForward=True  # Sort by SK (timestamp)
        )
        logger.debug("Retrieved companion history")
        return success(200, response['Items'])
    
    except ClientError as e:
        logger.debug(f"DynamoDB error: {str(e)}")
        return error(500, f"DynamoDB error: {str(e)}")
    except Exception as e:
        logger.debug(f"Internal server error: {str(e)}")
        return error(500, "Internal server error")