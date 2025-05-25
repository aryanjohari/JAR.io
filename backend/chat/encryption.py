from cryptography.fernet import Fernet
import hashlib
import base64

class ChatEncryption:
    def __init__(self, secret="06062024"):
        # Derive a 32-byte key from the secret using SHA-256
        key = hashlib.sha256(secret.encode()).digest()
        # Encode to base64 for Fernet (requires 32 url-safe base64-encoded bytes)
        key = base64.urlsafe_b64encode(key[:32])
        self.fernet = Fernet(key)

    def encrypt(self, message):
        """Encrypt a message."""
        if isinstance(message, str):
            message = message.encode()
        return self.fernet.encrypt(message).decode()

    def decrypt(self, encrypted_message):
        """Decrypt an encrypted message."""
        if isinstance(encrypted_message, str):
            encrypted_message = encrypted_message.encode()
        return self.fernet.decrypt(encrypted_message).decode()