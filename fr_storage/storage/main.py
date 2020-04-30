from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/save', methods=['GET'])
def save():
    print("Hello")

    return 'hello'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5005, debug=True)
