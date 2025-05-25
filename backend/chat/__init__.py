from flask import Blueprint

chat_bp = Blueprint('chat', __name__)

# Import routes to register them with the blueprint
from . import routes