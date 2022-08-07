FROM openjdk:17-jdk-alpine
ARG JAR_FILE=/build/libs/AlphaAnalytics-1.2.2.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]