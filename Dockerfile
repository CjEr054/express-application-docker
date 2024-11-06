# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if present) into the container
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port your app is running on (default Express port is 3000)
EXPOSE 3000

# Set the command to run your application
CMD ["node", "index.js"]
