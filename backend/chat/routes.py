from flask import jsonify, request
from flask_login import login_required, current_user
from . import chat_bp
from .cipher import DumfuckCipher

cipher = DumfuckCipher()
messages = []  # Temporary in-memory storage

@chat_bp.route('/messages', methods=['GET'])
@login_required
def get_messages():
    ciphers = [{'user': m['user'], 'message': cipher.encode(m['message'])} for m in messages]
    return jsonify(ciphers)

@chat_bp.route('/messages', methods=['POST'])
@login_required
def send_message():
    data = request.get_json()
    message = data.get('message')
    if not message:
        return jsonify({'error': 'No message provided'}), 400
    ciphered_message = cipher.encode(message)
    messages.append({'user': current_user.id, 'message': message})
    return jsonify({'user': current_user.id, 'message': ciphered_message})