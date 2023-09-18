FROM  python:3.10.7-alpine3.16

COPY . /app
WORKDIR /app
RUN addgroup trivia && adduser -S -G trivia trivia

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ENV DB_NAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_HOST=db
ENV DB_USER=root

ENTRYPOINT ["gunicorn", "-b", ":8080", "flaskr:create_app()"]