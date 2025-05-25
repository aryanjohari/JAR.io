from flask import Flask, request, jsonify
from flask_login import LoginManager, login_user, login_required
from flask_cors import CORS
from chat.routes import chat_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'jar-io-05252024'
CORS(app, supports_credentials=True)
#, resources={r"/*": {"origins": "http://localhost:3000"}}

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

app.register_blueprint(chat_bp, url_prefix='/chat')

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

class User:
    def __init__(self, id):
        self.id = id
        self.is_authenticated = True
        self.is_active = True
        self.is_anonymous = False

    def get_id(self):
        return self.id

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    # Temporary hardcoded credentials (replace with DynamoDB in Step 7)
    if username == 'aryan' and password == 'sakshi':
        user = User(username)
        login_user(user)
        return jsonify({'success': True})
    return jsonify({'success': False, 'error': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)