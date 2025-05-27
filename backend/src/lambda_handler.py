from utils.logger import loadLogger
from utils.router import Router
from utils.response import success
from handlers.scrapbook_handler import create_entry, list_entries
from handlers.map_handler import create_pin, list_pins
from handlers.companion_handler import send_message, get_history

logger = loadLogger(__name__)

# Initialize router
router = Router()

# Register routes
router.add_route('POST', '/scrapbook/create', create_entry)
router.add_route('GET', '/scrapbook/list', list_entries)
router.add_route('POST', '/map/create', create_pin)
router.add_route('GET', '/map/list', list_pins)
router.add_route('POST', '/companion/send', send_message)
router.add_route('GET', '/companion/history', get_history)

def lambda_handler(event, context):
    """Route incoming request to appropriate handler or handle OPTIONS."""
    http_method = event.get('httpMethod', '').upper()
    
    if http_method == 'OPTIONS':
        logger.debug("Handling OPTIONS request for CORS preflight")
        return success(200, {
            'message': 'CORS preflight'
        })
    
    return router.route(event)