FROM python:3.6-slim-stretch

RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev && \
    apt-get clean

COPY storage /root

WORKDIR /root

RUN pip3 install -r requirements.txt

EXPOSE 5005

CMD python3 main.py