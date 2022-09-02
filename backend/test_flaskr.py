from multiprocessing import current_process
import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from flaskr import create_app
from models import setup_db, Question, Category


class TriviaTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "trivia_test"
        self.username="postgres"
        self.password = "abc"
        self.database_path = "postgresql://{}:{}@{}/{}".format(self.username, self.password,'localhost:5432', self.database_name)
        setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()
    
    def tearDown(self):
        """Executed after reach test"""
        pass

    """
    TODO
    Write at least one test for each test for successful operation and for expected errors.
    """

    def test_get_categories(self):
      res = self.client().get('/categories')
      data = json.loads(res.data)

      self.assertEqual(res.status_code, 200)
      self.assertEqual(data['categories']["1"], "Science")
      self.assertEqual(data['categories']["2"], "Art")
      self.assertEqual(data['categories']["3"], "Geography")
      self.assertEqual(data['categories']["4"], "History")
      self.assertEqual(data['categories']["5"], "Entertainment")
      self.assertEqual(data['categories']["6"], "Sports")

    def test_404_categories_not_found(self):
      res = self.client().get('/categories')
      data = json.loads(res.data)
      fake_category = {
        "1": "Sport"
      }
      self.assertTrue(fake_category != data["categories"])

    def test_get_questions(self):
      res = self.client().get('/questions')
      data = json.loads(res.data)
      self.assertEqual(res.status_code, 200)
      self.assertTrue(len(data["questions"]))
      self.assertTrue(data["totalQuestions"])
      self.assertEqual(data["currentCategory"], "")
    
    def test_404_sent_page_request_beyond_max_pages(self):
      res = self.client().get("/questions?page=1599")
      data = json.loads(res.data)

      self.assertEqual(res.status_code, 404)
      self.assertEqual(data["success"], False)
      self.assertEqual(data["message"], "resource not found")

    def test_delete_question(self):

      res = self.client().delete("/questions/32")
      data = json.loads(res.data)

      self.assertEqual(res.status_code, 200)
      self.assertEqual(data["success"], True)

    def test_422_question_does_not_exist(self):
      res = self.client().delete("/questions/4500000")
      data = json.loads(res.data)

      self.assertEqual(res.status_code, 422)
      self.assertEqual(data["success"], False)
    def test_create_question(self):
      res = self.client().put("/questions", json ={"question": "Who discovered the sea road to India?", "answer": "Mongo Pack", "difficulty": 2, "category": 4})
      data = json.loads(res.data)

      self.assertEqual(res.status_code, 200)
      self.assertEqual(data["success"], True)
    
    def test_405_create_question_failed(self):
      res = self.client().put("/questions", json = {"question": "", "aswer": "this is just an answer", "difficulty": 1})

      data = json.loads(res.data)
      
      self.assertEqual(res.status_code, 405)
      self.assertEqual(data["success"], False)
      self.assertEqual(data["message"], "method not allowed")

    def test_search_question(self):
      res = self.client().post("/questions", json = { "searchTerm": "egyptians"})
      data = json.loads(res.data)

      self.assertEqual(res.status_code, 200)
      self.assertEqual(
        data["questions"],
        [
          {
            "answer": "Scarab",
            "category": 4,
            "difficulty": 4,
            "id":23,
            "question": "Which dung beetle was worshipped by the ancient Egyptians?"
          }
        ])

    def test_404_not_found(self):
      res = self.client().get("/questionss", json={"searchTerm":"egyptians"})
      self.assertEqual(res.status_code, 404)

    def test_get_question_by_category(self):
      res = self.client().get("/categories/1/questions")
      data = json.loads(res.data)

      self.assertEqual(res.status_code, 200)
      self.assertEqual(data["currentCategory"], "Science")
      self.assertTrue(data["totalQuestions"]>0)
    
    def test_404_bad_request(self):
      res = self.client().get("/categories/56/questions")
      data = json.loads(res.data)

      self.assertEqual(res.status_code, 404)
      self.assertEqual(data["success"], False)
      self.assertEqual(data["message"], "resource not found")

    def test_play_quiz(self):
      res = self.client().post("/quizzes", json={ "previous_questions": [], "quiz_category": {"type":"Science", "id": 1}})

      self.assertEqual(res.status_code, 200)

    def test_422_bad_quiz_request(self):
      res = self.client().post("/quizzes", json={ "previous_questions": [], "quiz_category": {"type":"", "id": 1}})
      body = json.loads(res.data)

      self.assertEqual(res.status_code, 422)
      self.assertEqual(body['message'], "unprocessable")





# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()