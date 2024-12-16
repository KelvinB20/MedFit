from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import bcrypt
import jwt
import datetime

app = Flask(__name__)
CORS(app)  # Permite acesso de diferentes origens (Cross-Origin Resource Sharing)

# Conectando ao MongoDB (usando o MongoDB Compass)
client = MongoClient("mongodb://localhost:27017/")
db = client["local"]  # Nome do banco de dados
users_collection = db["users"]  # Nome da coleção de usuários

SECRET_KEY = "your_secret_key_here"  # Chave secreta para JWT (troque por algo mais seguro em produção)

# Função de registro
@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    birthDate = data.get("birthDate")

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email já registrado"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    user_data = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "birthDate": birthDate
    }

    users_collection.insert_one(user_data)
    return jsonify({"message": "Usuário registrado com sucesso!"}), 201

# Função de login
@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if user and bcrypt.checkpw(password.encode('utf-8'), user["password"]):
        token = jwt.encode(
            {"user_id": str(user["_id"]), "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
            SECRET_KEY, algorithm="HS256"
        )
        return jsonify({"message": "Login bem-sucedido", "token": token}), 200
    return jsonify({"error": "Credenciais inválidas"}), 400

if __name__ == "__main__":
    app.run(debug=True)
