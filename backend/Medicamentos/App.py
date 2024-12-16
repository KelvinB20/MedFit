from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

# Configuração do Flask
app = Flask(__name__)
CORS(app)  # Habilitar CORS

# Configuração do MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Substitua pelo URI do MongoDB Atlas, se necessário
db = client["medicamentos_db"]  # Nome do banco de dados
collection = db["medicamentos"]  # Nome da coleção

# Rota para obter todos os medicamentos
@app.route("/api/medicamentos", methods=["GET"])
def get_medicamentos():
    medicamentos = list(collection.find({}, {"_id": 0}))  # Excluir o campo "_id" dos resultados
    return jsonify(medicamentos)

# Rota para adicionar um medicamento
@app.route("/api/medicamentos", methods=["POST"])
def add_medicamento():
    data = request.json
    if not data.get("name") or not data.get("interval"):
        return jsonify({"error": "Os campos 'name' e 'interval' são obrigatórios"}), 400

    collection.insert_one(data)
    return jsonify({"message": "Medicamento adicionado com sucesso!"}), 201

# Rota para deletar um medicamento
@app.route("/api/medicamentos/<name>", methods=["DELETE"])
def delete_medicamento(name):
    result = collection.delete_one({"name": name})
    if result.deleted_count == 0:
        return jsonify({"error": "Medicamento não encontrado"}), 404
    return jsonify({"message": "Medicamento deletado com sucesso!"})

# Inicialização do servidor
if __name__ == "__main__":
    app.run(debug=True)
