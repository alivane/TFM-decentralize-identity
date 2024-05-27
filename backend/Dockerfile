# Use an official Node runtime (Alpine version) as a parent image
FROM node:18.18.2-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["yarn", "ts-node", "--esm", "./src/server.ts"]
