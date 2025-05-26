from utils.logger import loadLogger
from utils.response import error
from handlers.scrapbook_handler import create_entry, list_entries

logger = loadLogger(__name__)

def lambda_handler(event, context):
    resource = event.get('resource', '')
    operation = event.get('pathParameters', {}).get('operation', '')
    
    logger.debug(f"Received request: resource={resource}, operation={operation}")
    
    if resource == '/scrapbook/{operation}':
        if operation == 'create':
            return create_entry(event)
        elif operation == 'list':
            return list_entries(event)
        else:
            logger.debug(f"Unsupported operation: {operation}")
            return error(400, f"Unsupported operation: {operation}")
    
    logger.debug(f"Resource not found: {resource}")
    return error(404, "Resource not found")