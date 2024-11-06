# **Steps to Build and Share a Docker Image for Your Express Application**

## **1. Building the Docker Image and Running the Container**

### **Step 1: Create and Write the Script Inside the Dockerfile**

To build your Docker image, you need to write a `Dockerfile` that will define the environment for your Express app.

Here’s a sample `Dockerfile`:

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

### **Step 2: Build the Docker Image**

Once the `Dockerfile` is created, you can build the Docker image using the following command:

```powershell
docker build -t my-express-application .
```

This will package your application into a Docker image with the tag `my-express-application`.

### **Step 3: Run the Docker Container**

To run the Docker container and expose it to port `3000`, use this command:

```powershell
docker run -p 3000:3000 my-express-application
```

Now, you can access your app by navigating to `http://localhost:3000` in your browser.

---

## **2. Dockerfile Guide**

### **What is a Dockerfile?**

A `Dockerfile` is a script that contains a series of instructions for Docker to automate the process of creating an image. It specifies the base image, the environment setup, the application dependencies, and how to run the application inside a container.

Each instruction in a `Dockerfile` adds a layer to the Docker image. Docker executes these instructions sequentially to build a fully functional application container.

### **Dockerfile Instructions**

Here is a breakdown of the most commonly used instructions in a `Dockerfile`:

#### **1. `FROM`**

- **Purpose**: Specifies the base image for your container. This image provides the runtime environment for your application.
- **Usage**: Every Dockerfile starts with `FROM`, and it determines the starting point for the image.

  **Example**:
  ```dockerfile
  FROM node:18
  ```
  This uses the official `node:18` image, which already includes Node.js and npm installed.

#### **2. `RUN`**

- **Purpose**: Executes commands inside the container during the build process. This is typically used for installing dependencies and setting up the environment.
- **Usage**: You can chain multiple commands using `&&` to execute them in one layer.

  **Example**:
  ```dockerfile
  RUN npm install
  ```
  This installs the dependencies defined in the `package.json` file.

#### **3. `COPY`**

- **Purpose**: Copies files or directories from your host machine into the container.
- **Usage**: You can use `COPY` to transfer application files, dependencies, or configuration into the container.

  **Example**:
  ```dockerfile
  COPY package*.json ./
  COPY . .
  ```
  - The first `COPY` command copies `package.json` and `package-lock.json` to the container.
  - The second `COPY` command copies all other files and folders (e.g., application code, views, assets) into the container.

#### **4. `WORKDIR`**

- **Purpose**: Sets the working directory for subsequent instructions.
- **Usage**: If the directory doesn’t exist, Docker will create it automatically. All subsequent commands (e.g., `RUN`, `CMD`, `COPY`) will use this directory.

  **Example**:
  ```dockerfile
  WORKDIR /app
  ```
  This sets the `/app` directory as the working directory in the container.

#### **5. `CMD`**

- **Purpose**: Specifies the default command to run when the container starts.
- **Usage**: Only one `CMD` can be defined in a `Dockerfile`. If the container is started without a command, Docker will execute the one defined in `CMD`.

  **Example**:
  ```dockerfile
  CMD ["node", "app.js"]
  ```
  This tells Docker to run `node app.js` when the container starts. Replace `app.js` with the entry point of your application if necessary.

#### **6. `EXPOSE`**

- **Purpose**: Documents which ports the container will listen to at runtime.
- **Usage**: This is for documentation purposes. Use the `-p` option in the `docker run` command to map the container's ports to the host machine.

  **Example**:
  ```dockerfile
  EXPOSE 3000
  ```
  This tells Docker that the application inside the container listens on port `3000`.

#### **7. `ENV`**

- **Purpose**: Sets environment variables in the container.
- **Usage**: Environment variables can be used to configure your app, such as API keys, database URLs, etc.

  **Example**:
  ```dockerfile
  ENV NODE_ENV production
  ```
  This sets the `NODE_ENV` variable to `production`, which can be accessed inside the container by your application.

#### **8. `USER`**

- **Purpose**: Specifies the user the container should run as. Running as a non-root user is a security best practice.
- **Usage**: This enhances security by ensuring that your container doesn’t run with root privileges.

  **Example**:
  ```dockerfile
  USER node
  ```
  This sets the user to `node`, a non-root user, which is commonly used for Node.js applications.

---

## **3. Sharing the Docker Image**

### **Share the Docker Image by Pushing it to Docker Hub**

You can share your Docker image by pushing it to Docker Hub, a cloud repository for Docker images.

#### **Step 1: Create a Docker Hub Account**
- Go to [Docker Hub](https://hub.docker.com/) and create an account.

#### **Step 2: Tag the Created Image**
- Tag your Docker image with your Docker Hub username:

```powershell
docker tag my-express-application <username>/my-express-application:latest
```

#### **Step 3: Push the Image to Docker Hub**
- Push the image to Docker Hub:

```powershell
docker push <username>/my-express-application:latest
```

#### **Step 4: Pull the Image**
- Once your image is pushed to Docker Hub, it can be pulled on another machine using:

```powershell
docker pull <username>/my-express-application:latest
```

#### **Step 5: Run the Image**
- After pulling the image, you can run it using:

```powershell
docker run -p 3000:3000 <username>/my-express-application:latest
```

---

### **Sharing the Docker Image by Exporting the Docker Image to a `.tar` File**

You can also share your Docker image by exporting it to a `.tar` file.

#### **Step 1: Convert the Docker Image to a `.tar` File**
- Use the `docker save` command to convert the image into a `.tar` file:

```powershell
docker save -o my-express-application.tar my-express-application
```

#### **Step 2: Load the Image on Another Machine**
- On another machine, load the image using the `docker load` command:

```powershell
docker load -i my-express-application.tar
```

#### **Step 3: Run the Image**
- After loading the image, you can run it just like any other Docker image:

```powershell
docker run -p 3000:3000 my-express-application
```