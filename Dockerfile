# Use the official Node.js image as a base image
FROM node:18 AS build-stage

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Use the official lightweight Node.js 14 image for the runtime
FROM node:14-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the build from the previous stage
COPY --from=0 /usr/src/app/build ./build
COPY --from=0 /usr/src/app/package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
