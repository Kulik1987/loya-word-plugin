<!-- https://dev.to/karanpratapsingh/dockerize-your-react-app-4j2e -->


# Build production image
docker-compose -f docker-compose.prod.yml build

# Let's start our production container on port 80 with the name "loya-react"
<!-- MAIN -->
docker run -p 80:80 --name loya-app avs85/loya-plugin-word-prod:latest
<!-- DEV -->
docker run -p 80:80 --name loya-app avs85/loya-plugin-word-dev:latest


# Push 
<!-- MAIN -->
docker push avs85/loya-plugin-word-dev:latest
<!-- DEV -->
docker push avs85/loya-plugin-word-dev:latest


# TODO:
1. RUN npm install --dev  дев зависимости не должны добавляться в образ!? webpack перенести в dependency? 