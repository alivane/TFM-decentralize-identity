# Step 1: Build the React application
FROM node:18.18.2-alpine AS build
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install
# Copy all source files
COPY . ./
# args
ARG REACT_APP_PINATA_API_KEY
ARG REACT_APP_PINATA_API_SECRET
ARG REACT_APP_PINATA_JWT
ARG REACT_APP_GATEWAY_URL
ARG REACT_APP_ENDPOINT
ARG REACT_APP_PUBLIC_KEY
ARG REACT_APP_MAPBOX_API_KEY
# Build the React application
RUN yarn run build

# Step 2: Serve the application using Nginx
FROM nginx:alpine
# Copy the build output to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html
# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
