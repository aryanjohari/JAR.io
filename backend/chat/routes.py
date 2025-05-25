from flask import jsonify
from flask_login import login_required, current_user
from . import chat_bp
from .cipher import DumfuckCipher

cipher = DumfuckCipher()

@chat_bp.route('/messages', methods=['GET'])
@login_required
def get_messages():
    # Placeholder: Return dummy messages with Dumfuck Cipher
    messages = [
        {'user': current_user.id, 'message': 'Hello, Sakshi!'},
        {'user': 'Sakshi', 'message': 'Hey, Dumfuck!'}
    ]
    # Apply cipher to messages
    ciphers = [{'user': m['user'], 'message': cipher.encode(m['message'])} for m in messages]
    return jsonify(ciphers)