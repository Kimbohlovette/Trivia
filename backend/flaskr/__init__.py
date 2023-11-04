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
    with app.app_context():
        setup_db(app)

        CORS(app, resources={r"*": {'origins': '*'}})

        @app.after_request
        def after_request(response):
            response.headers.add(
                'Access-Control-Allow-Headers',
                'Content-Type, Authorization')
            response.headers.add(
                'Access-Control-Allow-Headers',
                'GET, POST, DELETE,PUT')
            return response

        @app.route('/categories', methods=['GET'])
        def get_categories():
            try:

                categories = Category.query.all()
                formated_categories = [
                    category.format() for category in categories
                ]
                   
            except BaseException:
                abort(404)

            return jsonify({
                "categories": formated_categories
            })

        @app.route('/questions', methods=['GET'])
        def get_questions():
            try:
                questions = Question.query.order_by(Question.id).all()
                categories = [category.format() for category in Category.query.all()]
            except BaseException:
                abort(404)

            page = request.args.get('page', 1, type=int)
            start = (page - 1) * QUESTIONS_PER_PAGE
            end = start + QUESTIONS_PER_PAGE

            paginated_questions = [question.format()
                                for question in questions[start:end]]
            total_questions = len(questions)

            return jsonify({
                "questions": paginated_questions,
                "totalQuestions": total_questions,
                "currentCategory": "",
                "categories": categories
            })

        @app.route('/questions/<int:question_id>', methods=['DELETE'])
        def delete_question(question_id):

            question = Question.query.filter(
                Question.id == question_id).one_or_none()
            if question is None:
                abort(422)
            question.delete()

            return jsonify({"success": True, "delete_id": question_id})

        @app.route('/questions/create', methods=['POST'])
        def create_question():
            body = request.get_json()
            if (body.get("question") == "" or body.get("answer") == ""):
                abort(400)
            try:
                question = Question(
                    question=body.get("question"),
                    answer=body.get("answer"),
                    difficulty=body.get("difficulty"),
                    category=body.get("category"))
                question.insert()
                return jsonify({"success": True})
            except BaseException:
                abort(405)

        @app.route('/search', methods=['GET'])
        def search_questions():
            searchTerm = request.args.get('q', "")

            all_questions = Question.query.all()
            query = Question.query.filter(
                Question.question.ilike(
                    '%' + searchTerm + '%')).all()
            matched_questions = [question.format() for question in query]

            return jsonify({
                "questions": matched_questions,
                "totalQuestions": len(all_questions),
                "currentCategory": ""
            })

        @app.route('/categories/<int:cat_id>/questions', methods=['GET'])
        def filter_questions_by_category(cat_id):
            try:
                cat = Category.query.filter(Category.id == cat_id).one_or_none()
                if cat is None:
                    abort(404)
                all_questions = Question.query.all()
                questions = Question.query.filter(
                    Question.category == cat_id).all()

                return jsonify({
                    "questions": [question.format() for question in questions],
                    "currentCategory": cat.type,
                    "totalQuestions": len(all_questions)
                })
            except BaseException:
                abort(404)

        @app.route('/quizzes', methods=["POST"])
        def play():
            body = request.get_json()
            quiz_category = body.get('quiz_category')['type']
            previous_questions = body.get('previous_quizzes')
            if quiz_category == "" or previous_questions is None:
                abort(422)

            try:
                if quiz_category == "click":

                    questions = Question.query.all()
                    not_prev_selected_questions = [
                        question for question in questions if question.id not in previous_questions]

                    if not_prev_selected_questions == []:
                        return jsonify({"question": None})

                    random_index = random.randint(
                        0, len(not_prev_selected_questions) - 1)
                    
                    random_question = not_prev_selected_questions[random_index].format()

                    return jsonify({"question": random_question})

                else:
                    cat = Category.query.get()

                    questions = Question.query.filter(
                        Question.category == cat_id).all()

                    not_prev_selected_questions = [
                        question for question in questions if question.id not in previous_questions]

                    if not_prev_selected_questions == []:
                        return jsonify({"question": None})

                    random_index = random.randint(
                        0, len(not_prev_selected_questions) - 1)
                    random_question = not_prev_selected_questions[random_index].format(
                    )

                    return jsonify({"question": random_question})
            except BaseException:
                abort(422)

        @app.errorhandler(404)
        def not_found(error):
            return (jsonify({"success": False, "error": 404,
                            "message": "resource not found"}), 404, )

        @app.errorhandler(422)
        def unprocessable(error):
            return (
                jsonify(
                    {
                        "success": False,
                        "error": 422,
                        "message": "unprocessable"
                    }),
                422,
            )

        @app.errorhandler(405)
        def not_found(error):
            return (jsonify({"success": False, "error": 405,
                            "message": "method not allowed"}), 405, )

    return app
