from flask import jsonify, request
from flask_login import login_required, current_user
from . import chat_bp
from .cipher import DumfuckCipher
from .encryption import ChatEncryption
import boto3
from botocore.exceptions import ClientError
from datetime import datetime
import uuid

cipher = DumfuckCipher()
encryption = ChatEncryption()
dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')
table = dynamodb.Table('Messages')

@chat_bp.route('/messages', methods=['GET'])
@login_required
def get_messages():
    try:
        # Fetch messages from DynamoDB
        response = table.scan()
        items = response.get('Items', [])
        # Decrypt and apply cipher to messages
        messages = [
            {
                'user': item['user'],
                'message': cipher.encode(encryption.decrypt(item['encrypted_message'])),
                'timestamp': item['timestamp']
            }
            for item in sorted(items, key=lambda x: x['timestamp'])
        ]
        return jsonify(messages)
    except ClientError as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/messages', methods=['POST'])
@login_required
def send_message():
    data = request.get_json()
    message = data.get('message')
    if not message:
        return jsonify({'error': 'No message provided'}), 400
    try:
        # Apply cipher and encrypt
        ciphered_message = cipher.encode(message)
        encrypted_message = encryption.encrypt(message)
        # Store in DynamoDB
        table.put_item(
            Item={
                'id': str(uuid.uuid4()),
                'user': current_user.id,
                'encrypted_message': encrypted_message,
                'timestamp': datetime.utcnow().isoformat()
            }
        )
        return jsonify({'user': current_user.id, 'message': ciphered_message})
    except ClientError as e:
        return jsonify({'error': str(e)}), 500