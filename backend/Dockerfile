FROM  python:3.10.7-alpine3.16

COPY . /app
WORKDIR /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ENV DB_NAME=trivia
ENV DB_PASSWORD=postgres
ENV DB_HOST=db
ENV DB_USER=postgres

ENTRYPOINT ["gunicorn", "-b", ":8080", "main:APP"]