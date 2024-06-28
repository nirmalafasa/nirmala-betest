# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm rebuild

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3030

# Start the application
CMD ["npm", "start"]