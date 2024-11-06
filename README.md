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

### Dockerfile guide

### **What is a Dockerfile?**
The `Dockerfile` is a script that defines the steps required to build a Docker image. It tells Docker how to set up the environment inside the container, what dependencies to install, and how to run the application. Each instruction in a `Dockerfile` creates a new layer in the image, and Docker executes these instructions in sequence to build a fully functional container.

### **Dockerfile Instructions**

Here’s an overview of the most commonly used instructions in a `Dockerfile`:

#### **1. `FROM`**
- **Purpose**: Specifies the base image for your Docker container.
- **Usage**: Every Dockerfile must start with a `FROM` instruction. It tells Docker which image to use as the starting point for your application.
  
  **Example**:
  ```dockerfile
  FROM node:18
  ```
  This instruction tells Docker to use the official `node:18` image as the base image. This image already has Node.js and npm installed, so we don’t need to install them manually.

#### **2. `RUN`**
- **Purpose**: Executes commands inside the container during the build process. This is useful for installing dependencies or configuring the environment.
- **Usage**: You can chain multiple commands with `&&` to run them in one layer.

  **Example**:
  ```dockerfile
  RUN npm install
  ```
  This installs the dependencies defined in `package.json` inside the container.

#### **3. `COPY`**
- **Purpose**: Copies files or directories from your local machine into the Docker container’s filesystem.
- **Usage**: It can be used to copy application code, configuration files, or other assets that are necessary for your app.

  **Example**:
  ```dockerfile
  COPY package*.json ./
  COPY . .
  ```
  - The first `COPY` copies `package.json` and `package-lock.json` to the container to allow dependency installation.
  - The second `COPY` copies all the application code and files from your local machine to the container.

#### **4. `WORKDIR`**
- **Purpose**: Sets the working directory for subsequent instructions (e.g., `RUN`, `CMD`, `ENTRYPOINT`).
- **Usage**: If the directory doesn’t exist, Docker will create it for you. All subsequent commands will be executed from this directory.

  **Example**:
  ```dockerfile
  WORKDIR /app
  ```
  This sets `/app` as the working directory in the container. Any subsequent commands (e.g., `RUN`, `COPY`, `CMD`) will run in this directory.

#### **5. `CMD`**
- **Purpose**: Defines the default command that is executed when a container starts. If no command is specified when starting the container, Docker will run the command specified by `CMD`.
- **Usage**: A Dockerfile can only have one `CMD` instruction. If you need to specify multiple commands, you can use `ENTRYPOINT` combined with `CMD`.

  **Example**:
  ```dockerfile
  CMD ["node", "app.js"]
  ```
  This tells Docker to run `node app.js` when the container starts. You can replace `app.js` with the entry point of your application.

#### **6. `EXPOSE`**
- **Purpose**: Documents which ports the container will listen on at runtime. This is purely informational and does not actually publish the ports to the host machine. 
- **Usage**: While `EXPOSE` itself does not make the ports accessible, it works in conjunction with the `docker run -p` command to map the container port to a host port.

  **Example**:
  ```dockerfile
  EXPOSE 3000
  ```
  This documents that the application inside the container will listen on port `3000`.

#### **7. `ENV`**
- **Purpose**: Sets environment variables inside the container. These variables can be accessed by the running application.
- **Usage**: It is useful for setting configuration parameters like database URLs, API keys, or app settings.

  **Example**:
  ```dockerfile
  ENV NODE_ENV production
  ```
  This sets an environment variable `NODE_ENV` with the value `production` inside the container.

#### **8. `USER`**
- **Purpose**: Specifies the user to run the container as. By default, Docker containers run as the root user, but it's a good practice to run the application as a non-root user with minimal privileges.
- **Usage**: This enhances security by reducing the potential impact of a container compromise.

  **Example**:
  ```dockerfile
  USER node
  ```
  This sets the user to `node`, a non-root user, which is generally a best practice for Node.js applications. This minimizes the risk of running the app as a privileged user (root).





























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