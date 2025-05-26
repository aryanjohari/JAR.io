from utils.logger import loadLogger
from utils.router import Router
from handlers.scrapbook_handler import create_entry, list_entries

logger = loadLogger(__name__)

# Initialize router
router = Router()

# Register routes
router.add_route('POST', '/scrapbook/create', create_entry)
router.add_route('GET', '/scrapbook/list', list_entries)

def lambda_handler(event, context):
    """Route incoming request to appropriate handler."""
    return router.route(event)