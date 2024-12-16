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
    data = list(data_collection.find())
    return dumps(data), 200

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
            "timestamp": datetime.now()
        }

        data_collection.insert_one(measurement)

        return jsonify({"message": "Dados salvos com sucesso!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


