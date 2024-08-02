from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/endpoint', methods=['GET', 'POST'])
def handle_request():
    if request.method == 'POST':
        data = request.get_json()
        response = {
            "status": "success",
            "user_id": data.get('user_id'),
            "college_email_id": data.get('college_email_id'),
            "college_roll_number": data.get('college_roll_number'),
            "numbers_array": data.get('numbers_array', []),
            "alphabets_array": data.get('alphabets_array', [])
        }
        return jsonify(response)
    elif request.method == 'GET':
        response = {
            "operation_code": "12345"
        }
        return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
