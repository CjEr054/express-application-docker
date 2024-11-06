# The steps to build this application into a docker image and sharing the docker image 

## Building the docker image and running the container
1. Create and write the script inside of the Dockerfile
```docker 
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

2. Build the docker image
```powershell
docker build -t my-express-application .
```

3. Run the docker container
```powershell
docker run -p 3000:3000 my-express-application
```

## Sharing the docker image
### Share the docker image by pushing it to Docker Hub
1. Create an account on Docker Hub https://hub.docker.com/

2. Tag the created image with your Docker Hub username (replace <username> with your Docker Hub username)
```powershell
docker tag my-express-application <username>/my-express-application:latest
```

3. Push the image to Docker Hub
```powershell
docker push <username>/my-express-application:latest
``` 

4. The shared image can now be pulled by:
```powershell
docker pull <username>/my-express-application:latest
```

5. Once you have pulled the image you can run it using:
```powershell
docker run -p 3000:3000 <username>/my-express-application:latest
```

### Sharing the docker image by exporting the docker image to a .tar file
1. Convert the docker image to a .tar file
```powershell
docker save -o my-express-application.tar my-express-application
```

2. Load the image on another machine:
```powershell
docker load -i my-express-application.tar
```

3. After loading the image you can start the container with:
```powershell
docker run -p 3000:3000 my-express-application
```