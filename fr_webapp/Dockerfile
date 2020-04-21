FROM openjdk:8-jdk-alpine
# Environment Variable that defines the endpoint of sentiment-analysis python api.
ENV FR_LOGIC_API_URL http://127.0.0.1:5000
ADD target/FaceRecognitionWEBApp.jar /
EXPOSE 8080
CMD ["java", "-jar", "FaceRecognitionWEBApp.jar", "--fr.logic.api.url=${FR_LOGIC_API_URL}"]