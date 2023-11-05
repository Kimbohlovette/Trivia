# Trivia

Trivia web application is a trivia game running on the web. Students and/or competitors are asked questions about interesting but unimportant subjects. Students can take questions from a certain category or from all category play the trivia game.

Remote Server URL: https://trivia-api-zck0.onrender.com

Remote App Demo: https://trivia23.vercel.app

![image](https://github.com/Kimbohlovette/Trivia/assets/37558983/993eb2ba-6df4-4f11-a989-3e18b194cf3d)


## Code style
Code style follows the PEP8 style guide

# Getting Started

## Quick method
Install docker, docker-compose
Clone the repository to your local machine with git clone 
## Prerequisites

- Nodejs - Install nodejs to run the React frontend library and npm ( a package manager for nodejs applications)

- Python3 - Install python3 to run backend code. Python3.7 and above is recommended ( and pip or pip3 a package manager for installing python libraries)

## Installations

### Backend

In order to install backend dependencies and run the server, do the following

- Run move into the backend directory by running the `cd backend` provided you are in the Trivia directory

- Create a virtual environment for your backend project by running the following command

    `python3 -m venv venv`
 
- Activate the virtual environment by running

    `source venv/bin/activate`

- Run `pip3 install -r requirements.txt` to install all dependencies for the backend.

- In order to setup the postgresql database in your system, 

    1. `sudo -u postgres -i` to login into postgresql environment. (you will be asked to enter credendials for your computer)

    2. `dropdb trivia & createdb trivia` to create the trivia database.
    3. `psql trivia` to login into the psql terminal with the *trivia* database
    4. In the postgres database terminal, run the command 

        `\i ./tivia.psql` to setup database tables and populate the tables with data.
    
- Start the backend server by running `FLASK_APP=flaskr FLASK_DEBUG=1 flask run`

- In order to run backend tests,
    
    - Install `flask-unittest` flask unit test library using the command `pip install flask-unittest`
    - Run `python3 -m test_flaskr --verbose`

If the backend test runs successfully then you are good to go.


### Frontend

- Move into the frontend directory

- Run `npm install` to install frontend dependencies (This command should be run only once)

- Start the frontend server by running `npm start`

# API Documentation

## Getting started with Trivia API

The trivia API exposes some endpoints for manipulating and querying the trivia database. The base URL is 

`http://localhost:5000`

## Errors

- ***200*** - Success
- ***404*** - Resource not found error
- ***422*** - Bad request
- ***405*** - Method not allowed

A sample error message response

```
{
  "error": 422,
  "message": "unprocessable",
  "success": False
}
```

## Endpoints

### *[ GET ] http://localhost:5000/categories*

- Endpoint to get all categories as a dictionary object all keys being the category id's and values the category types.

- **Request data**: No data or parameters required

- **Request aguments**: No data or parameters required

- Returns: An object with a single key, categories, that contains an object of id: category_string key:value pairs.

Sample response: 

```
{
  "categories": {
    "1": "Science",
    "2": "Art",
    "3": "Geography",
    "4": "History",
    "5": "Entertainment",
    "6": "Sports"
  }
}

```

### *[ GET ] http://localhost:5000/questions?page=1*

- Retrieves a list of paginated questions

- **Request data**: No data or parameters required

- **Request arguments**: *page=1*

- **Returns**: An object with 10 paginated questions, total questions, object including all categories, and current category string.

**Sample response**

```
{
  "questions": [
    {
      "id": 1,
      "question": "This is a question",
      "answer": "This is an answer",
      "difficulty": 5,
      "category": 2
    }
  ],
  "totalQuestions": 100,
  "categories": {
    "1": "Science",
    "2": "Art",
    "3": "Geography",
    "4": "History",
    "5": "Entertainment",
    "6": "Sports"
  },
  "currentCategory": "History"
}

```

### *[ GET ] http://localhost:5000/categories/cat_id/questions*

- Retrieves a list of cateogories by id.

- **Request data**: No data or parameters required

- **Request arguments**: integer *cat_id* 

- **Returns**: An object with questions for the specified category, total questions, and current category string

**Sample response**

```
{
  "questions": [
    {
      "id": 1,
      "question": "This is a question",
      "answer": "This is an answer",
      "difficulty": 5,
      "category": 4
    }
  ],
  "totalQuestions": 100,
  "currentCategory": "History"
}

```

### *[ POST] http://localhost:5000/questions*

- Searches the database for questions that match search key

- **Request data**: 

```
{
  "searchTerm": "the search string to match"
}
```

- **Request arguments**: No arguments

- **Returns**: any array of questions, a number of totalQuestions that met the search term and the current category string

**Sample response**

```
{
  {
  "currentCategory": "",
  "questions": [
    {
      "answer": "Scarab",
      "category": 4,
      "difficulty": 4,
      "id": 23,
      "question": "Which dung beetle was worshipped by the ancient Egyptians?"
    }
  ],
  "totalQuestions": 19
}

```

### *[ PUT ] http://localhost:5000/questions*

- Sends a request to create a new question

- **Request data**: A json data object containing question, the answer to the question, category of question and it level of difficulty

```
{
  "question": "The study of past events is called?",
  "answer": "History",
  "category": 4,
  "difficulty": 2
}
```

- **Request arguments**: No arguments
- **Returns**: Returns a json object containing a success message
**Sample response**

```
{
  "success": true
}

```

### *[ DELETE] http://localhost:5000/questions/id*

- Deletes the question with the id `id`.

- **Request data**: No request body

- **Request arguments**: Integer `id`

- **Returns**: Returns a json object that contains a success message and the id of the deleted question on a successful delete operation

**Sample response**

```
{ 
  "success": True,
  "id": 13
}
```


### *[ POST ] http://localhost:5000/quizzes*

- This endpoint sends previous questions answered by a student with the category and then returns a single question for user to answer

- **Request data**: A list of previous questions id's, the category 

```
{
  "previous_questions": [],
  "quiz_category": {
    "type":"Science",
    "id": 1
  }
}

```

- **Request arguments**: No arguments

- **Returns**: Returns a single question object.

**Sample response**

```
{
  "question": {
    "answer": "The Liver",
    "category": 1,
    "difficulty": 4,
    "id": 20,
    "question": "What is the heaviest organ in the human body?"
  }
}

```

# Deployment

(localhost)

# Authors

- Kimboh Lovette Bantar

# Acknowledgments

- Many thanks to all Udacity session leads helped me pull through this project to this stage

- Thanks to my family and friends for the many ways they have supported me to reach this stage of the project.

## End














