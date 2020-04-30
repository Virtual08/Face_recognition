FROM python:3.6-slim-stretch

COPY storage /root

WORKDIR /root

RUN pip3 install -r requirements.txt

EXPOSE 5005

CMD python3 main.py