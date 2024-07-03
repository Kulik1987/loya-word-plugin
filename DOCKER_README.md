<!-- https://dev.to/karanpratapsingh/dockerize-your-react-app-4j2e -->

# Build production image
docker-compose -f docker-compose.prod.yml build

# Let's start our production container on port 80 with the name "loya-react"
docker run -d -p 80:80 -p 443:443 --name loya-app avs85/loya-plugin-anonymazer-local:latest

# Push 
docker push avs85/loya-plugin-anonymazer-local:latest

# TODO:
1. RUN npm install --dev  дев зависимости не должны добавляться в образ!? webpack перенести в dependency? 