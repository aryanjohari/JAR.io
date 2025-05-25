from flask import Flask
from flask_login import LoginManager
from chat.routes import chat_bp

app = Flask(__name__)
# app.config['SECRET_KEY'] = 'jar-io-05252024'  # Replace with secure key

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

# Register chat blueprint
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

if __name__ == '__main__':
    app.run(debug=True)