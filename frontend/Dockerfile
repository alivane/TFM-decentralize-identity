# Step 1: Build the React application
FROM node:18.18.2-alpine AS build
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

COPY . ./
RUN yarn run build

# Step 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]