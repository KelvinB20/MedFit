from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.json_util import dumps
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir que o React se conecte

# Configurar conexão com o MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/healthData"
mongo = PyMongo(app)

data_collection = mongo.db.measurements

# Endpoint para buscar os dados armazenados
@app.route('/data', methods=['GET'])
def get_data():
    try:
        # Garantir que o timestamp seja enviado como string ISO 8601 para o frontend
        data = list(data_collection.find())
        for entry in data:
            if "timestamp" in entry and isinstance(entry["timestamp"], datetime):
                entry["timestamp"] = entry["timestamp"].isoformat()  # Converter datetime para string ISO
        return dumps(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint para salvar novos dados
@app.route('/data', methods=['POST'])
def save_data():
    try:
        content = request.json

        # Validar os dados recebidos
        altura = content.get("altura")
        peso = content.get("peso")
        sistolica = content.get("sistolica")
        diastolica = content.get("diastolica")
        imc = content.get("imc")
        categoria_imc = content.get("categoria_imc")
        categoria_pa = content.get("categoria_pa")

        if not all([altura, peso, sistolica, diastolica, imc, categoria_imc, categoria_pa]):
            return jsonify({"error": "Dados incompletos"}), 400

        # Criar objeto para salvar no banco
        measurement = {
            "altura": altura,
            "peso": peso,
            "sistolica": sistolica,
            "diastolica": diastolica,
            "imc": imc,
            "categoria_imc": categoria_imc,
            "categoria_pa": categoria_pa,
            "timestamp": datetime.utcnow()  # Usar UTC para consistência
        }

        data_collection.insert_one(measurement)

        return jsonify({"message": "Dados salvos com sucesso!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint para corrigir timestamps inválidos
@app.route('/fix-timestamps', methods=['POST'])
def fix_timestamps():
    try:
        updated_count = 0

        # Encontrar documentos sem timestamp ou com formato inválido
        documents = data_collection.find()
        for doc in documents:
            if "timestamp" not in doc or not isinstance(doc["timestamp"], datetime):
                # Atualizar documento com um novo timestamp no formato correto
                data_collection.update_one(
                    {"_id": doc["_id"]},
                    {"$set": {"timestamp": datetime.utcnow()}}
                )
                updated_count += 1

        return jsonify({"message": f"Timestamps corrigidos em {updated_count} documentos."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
