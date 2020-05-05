FROM openjdk:8-jdk-alpine
# Environment Variable that defines the endpoint of sentiment-analysis python api.
ENV FR_LOGIC_API_URL http://127.0.0.1:5000
ENV SPRING_DS_URL jdbc:mysql://127.0.0.1:3306/devdb
ENV SPRING_DDL none
ENV FR_STORE_URL http://127.0.0.1:5005
ADD target/FaceRecognitionWEBApp.jar /
EXPOSE 8080
CMD ["java", "-jar", "FaceRecognitionWEBApp.jar", "--fr.logic.api.url=${FR_LOGIC_API_URL}" , "--fr.storage.api.url=${FR_STORE_URL}", "--spring.datasource.url=${SPRING_DS_URL}", "--spring.jpa.hibernate.ddl-auto=${SPRING_DDL}"]