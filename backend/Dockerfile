FROM  python:3.10.7-alpine3.16

WORKDIR /app
RUN addgroup trivia && adduser -S -G trivia trivia
COPY requirements.txt .
RUN python3 -m venv venv
RUN source venv/bin/activate
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

ENTRYPOINT ["gunicorn", "-b", ":8080", "flaskr:create_app()"]