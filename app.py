from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Dummy data to simulate a database
tasks = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    task = {
        'id': len(tasks) + 1,
        'title': data['title'],
        'description': data['description'],
        'dueDate': data['dueDate']
    }
    tasks.append(task)
    return jsonify(task)

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.json
    for task in tasks:
        if task['id'] == id:
            task['title'] = data['title']
            task['description'] = data['description']
            task['dueDate'] = data['dueDate']
            return jsonify(task)
    return jsonify({'error': 'Task not found'}), 404

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    global tasks
    tasks = [task for task in tasks if task['id'] != id]
    return jsonify({'message': 'Task deleted'})

if __name__ == '__main__':
    app.run(debug=True)
