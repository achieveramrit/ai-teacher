from flask import Flask, request, jsonify
from flask_cors import CORS
import grading_logic
import json

app = Flask(__name__)
CORS(app)

# Load sample data
with open('D:/et23btc0069/ai-teaching-assistant/backend/sample_data.json') as f:
    data = json.load(f)

@app.route('/grade', methods=['POST'])
def grade_assignment():
    try:
        submission = request.json['submission']
        rubric = request.json['rubric']
        result = grading_logic.grade_essay(submission, rubric)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat():
    question = request.json['question']
    context = data['knowledge_base']
   
    # Simple keyword-based response (replace with real NLP in production)
    response = "I can help with that! Here's what I know: "
    if "grade" in question.lower():
        response += "Your assignments are graded automatically with AI."
    elif "deadline" in question.lower():
        response += "The next deadline is Friday at 11:59 PM."
    else:
        response += "For more details, please check the course syllabus."
   
    return jsonify({"response": response})

@app.route('/dashboard', methods=['GET'])
def dashboard():
    return jsonify(data['dashboard_stats'])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)