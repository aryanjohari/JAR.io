import json
from decimal import Decimal
from typing import Any

def decimal_serializer(obj: Any) -> Any:
    """Convert DynamoDB Decimal and other non-serializable types to JSON-serializable formats."""
    if isinstance(obj, Decimal):
        # Convert Decimal to int if it's a whole number, else float
        return int(obj) if obj % 1 == 0 else float(obj)
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

def success(status_code: int, body: Any) -> dict:
    return {
        'statusCode': status_code,
        'body': json.dumps(body, default=decimal_serializer),
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'GET,POST'
        }
    }

def error(status_code: int, message: str) -> dict:
    return {
        'statusCode': status_code,
        'body': json.dumps({'error': message}),
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'GET,POST'
        }
    }