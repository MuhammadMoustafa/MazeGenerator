#my first Dockerfile

FROM python:3-alpine
WORKDIR /usr/mazeApp
COPY . .
EXPOSE 1234
CMD python3 -m http.server 1234
ARG BUILD_DATE
LABEL author="Muhammad Moustafa"
LABEL maintainer="muhammad.moustafa22@gmail.com"
LABEL org.label-schema.build-date=$BUILD_DATE