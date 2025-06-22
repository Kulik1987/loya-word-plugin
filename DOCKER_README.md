<!-- https://dev.to/karanpratapsingh/dockerize-your-react-app-4j2e -->

# Build production image
docker-compose -f docker-compose.prod.yml build

# Let's start our production container on port 80 with the name "loya-react"
<!-- docker run -d -p 80:80  --name speranskiy avs85/speranskiy-plugin:latest -->

docker compose -f docker-compose.prod.yml up
docker compose -f docker-compose.prod.yml up --force-recreate

# Push 
docker push avs85/speranskiy-plugin:latest

# TODO:
1. RUN npm install --dev  дев зависимости не должны добавляться в образ!? webpack перенести в dependency? 