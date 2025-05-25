# Dumfuck Cipher for JAR.io
    # Maps alphabets to emojis for Sakshi's personalized encoding

class DumfuckCipher:
    def __init__(self):
        # Extended mappings for all letters
        self.encode_map = {
            'a': '😊', 'b': '😍', 'c': '💕', 'd': '🌟', 'e': '💖',
            'f': '✨', 'g': '🌹', 'h': '💌', 'i': '😘', 'j': '💞',
            'k': '🌈', 'l': '💫', 'm': '🌸', 'n': '🍒', 'o': '💗',
            'p': '🌼', 'q': '🍓', 'r': '😻', 's': '💋', 't': '🌺',
            'u': '🍑', 'v': '💓', 'w': '🌷', 'x': '🍉', 'y': '💝',
            'z': '🌻', ' ': ' '  # Preserve spaces
        }
        self.decode_map = {v: k for k, v in self.encode_map.items()}

    def encode(self, text):
        """Encode text using the Dumfuck Cipher."""
        return ''.join(self.encode_map.get(c.lower(), c) for c in text)

    def decode(self, text):
        """Decode text from the Dumfuck Cipher."""
        result = ''
        i = 0
        while i < len(text):
            found = False
            for emoji, char in self.decode_map.items():
                if text[i:].startswith(emoji):
                    result += char
                    i += len(emoji)
                    found = True
                    break
            if not found:
                result += text[i]
                i += 1
        return result