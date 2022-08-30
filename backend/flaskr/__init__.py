from crypt import methods
import json
import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random

from models import setup_db, Question, Category

QUESTIONS_PER_PAGE = 10

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    setup_db(app)

    CORS(app, resources={r"*" : {'origins': '*'}})
    
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.add('Access-Control-Allow-Headers', 'GET, POST, DELETE,PUT')
        return response

    @app.route('/categories', methods=['GET'])
    def get_categories():
      try:

        categories = Category.query.all()
        formated_categories = {category.id: category.type for category in categories}
      except:
        abort(404)

      return jsonify({
        "categories": formated_categories
      })

    @app.route('/questions', methods=['GET'])
    def get_questions():
      try:
        questions = Question.query.order_by(Question.id).all()
        categories = { cat.id: cat.type for cat in Category.query.all()}
      except:
        abort(404)

      page = request.args.get('page', 1, type=int)
      start = (page - 1)*QUESTIONS_PER_PAGE
      end = start + QUESTIONS_PER_PAGE

      paginated_questions = [question.format() for question in questions[start:end]]
      total_questions = len(questions)

      return jsonify({
        "questions": paginated_questions,
        "totalQuestions": total_questions,
        "currentCategory": "",
        "categories": categories
      })

    @app.route('/questions/<int:question_id>', methods=['DELETE'])
    def delete_question(question_id):

      question = Question.query.filter(Question.id==question_id).one_or_none()
      if question is None:
        abort(404)
      question.delete()
      
      return jsonify({"success": True})

    """
    TEST: When you submit a question on the "Add" tab,
    the form will clear and the question will appear at the end of the last page
    of the questions list in the "List" tab.
    """
    @app.route('/questions', methods=["PUT"])
    def create_question():
      body = request.get_json()
      try:
        question = Question(
        question = body.get("question"),
        answer = body.get("answer"),
        difficulty = body.get("difficulty"),
        category = body.get("category"))
        question.insert()
        return jsonify({"success": True})
      except:
        abort(422)

    """
    TEST: Search by any phrase. The questions list will update to include
    only question that include that string within their question.
    Try using the word "title" to start.
    """

    @app.route('/questions', methods=['POST'])
    def search_questions():
      body = request.get_json()
      searchTerm = body.get('searchTerm')

      query = Question.query.filter(Question.question.ilike('%'+searchTerm + '%')).all()
      matched_questions = [question.format() for question in query]

      return jsonify({
        "questions": matched_questions,
        "totalQuestions": len(query),
        "currentCategory": ""
      })

    """
    TEST: In the "List" tab / main screen, clicking on one of the
    categories in the left column will cause only questions of that
    category to be shown.
    """
    @app.route('/categories/<int:cat_id>/questions', methods=['GET'])
    def filter_questions_by_category(cat_id):
      try:
        cat = Category.query.filter(Category.id==cat_id).one_or_none()
        if cat is None:
          abort(404)
        questions = Question.query.filter(Question.category==cat_id).all()

        return jsonify({
          "questions": [question.format() for question in questions],
          "currentCategory": cat.type,
          "totalQuestions": len(questions)
        })
      except:
        abort(404)

    """
    TEST: In the "Play" tab, after a user selects "All" or a category,
    one question at a time is displayed, the user is allowed to answer
    and shown whether they were correct or not.
    """
    @app.route('/quizzes', methods=["POST"])
    def play():
      body = request.get_json()
      quiz_category = body.get('quiz_category')['type']
      print(quiz_category)
      previous_questions = body.get('previous_questions')

      if quiz_category == "click":
        questions = Question.query.all()
        random_index = random.randint(0, len(questions)-1)
      else:
        cat = Category.query.filter(Category.type.ilike('%'+quiz_category+'%')).all()
        cat_id = cat[0].id

        questions = Question.query.filter(Question.id not in previous_questions, Question.category==cat_id).all()
        random_index = random.randint(0, len(questions)-1)

      random_question = questions[random_index].format()

      return jsonify({
        "question": random_question
      })

  
    @app.errorhandler(404)
    def not_found(error):
        return (
            jsonify({"success": False, "error": 404, "message": "resource not found"}),
            404,
        )

    @app.errorhandler(422)
    def unprocessable(error):
        return (
            jsonify({"success": False, "error": 422, "message": "unprocessable"}),
            422,
        )

    return app

