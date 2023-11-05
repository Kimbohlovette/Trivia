FROM  python:3.10.7-alpine3.16

WORKDIR /app
RUN addgroup trivia && adduser -S -G trivia trivia
COPY requirements.txt .
RUN python3 -m venv venv
RUN source venv/bin/activate
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .
ENV DB_NAME=trivia_hsnh
ENV DB_PASSWORD=scJgIAJanNCUUcPctw6WfFi8McQu5BdX
ENV DB_HOST=dpg-cl3u7lquuipc738n1n70-a:5432
ENV DB_USER=trivia_hsnh_user

ENTRYPOINT ["gunicorn", "-b", ":8080", "flaskr:create_app()"]