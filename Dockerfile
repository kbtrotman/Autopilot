FROM python:3.12

WORKDIR /code/
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY manage.py .
COPY ./autopilot ./autopilot/
COPY ./groups ./groups/
COPY ./users ./users/
COPY ./tasks ./tasks/
COPY ./schedules ./schedules/
COPY ./home ./home/
COPY ./scripts ./scripts/
COPY ./setup ./setup/
COPY ./triggers ./triggers/
EXPOSE 8000

USER root
RUN python manage.py makemigrations 
RUN python manage.py migrate
rUN python manage.py runserver 0.0.0.0:8000