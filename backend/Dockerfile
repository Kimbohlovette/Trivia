FROM  python:3.10.7-alpine3.16

WORKDIR /app
RUN addgroup trivia && adduser -S -G trivia trivia
COPY requirements.txt .
RUN python3 -m venv venv
RUN source venv/bin/activate
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .
ENV DB_NAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_HOST=db
ENV DB_USER=root

ENTRYPOINT ["gunicorn", "-b", ":8080", "flaskr:create_app()"]