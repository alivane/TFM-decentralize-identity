# Expid Frontend Application

## Introduction
This application is built to provide a user-friendly interface for currency exchange transactions in the Expid Application.

## Deployment
The main branch of this repository is automatically deployed on the server using Render.


## Environment Variables
The frontend application utilizes environment variables for configuration. An example .env file is provided in the project, where you can define variables such as API endpoints or other settings.

```bash
# You will need to get a assymetric key pair
REACT_APP_PRIVATE_KEY = [PRIVATE KEY]
REACT_APP_ENDPOINT=[URL OF THE API || http://localhost:3001]
# You will need to get from https://www.mapbox.com/ (This is for the MAP)
REACT_APP_MAPBOX_API_KEY=[MAPBOX API KEY]
```


## Technologies Used
ReactJS, Material UI, NodeJS, npm or yarn

## Available Scripts

In the project directory (cd frontend), you can run:

### `npm install`
To install the dependencies of the project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

**Backend Application README.md:**

# Expid Backend Application

## Introduction
This application is responsible for handling server-side logic and database interactions for the Expid Application.

## Deployment
The main branch of this repository is automatically deployed on the server using Render.

## Environment Variables
The backend application utilizes environment variables for configuration. An example .env file is provided in the project, where you can define variables such as database connection strings or API keys.
```bash
# You will need to get a project ID from infura https://www.pinata.cloud/
REACT_APP_PINATA_JWT=[PINATA SECRET JWT]
PINATA_SECRET=[PINATA SECRET ID]
PINATA_KEY=[PINATA KEY ID]

# You will need to get a assymetric key pair
APP_PUBLIC_KEY = [PUBLIC KEY]
APP_PRIVATE_KEY = [PRIVATE KEY]

# API PORT
PORT=[PORT || 3001]

# You will need to get from GPC https://console.cloud.google.com for FIREBASE DATABASE REAL TIME service
GCP_SERVICE_ACCOUNT=[SERVICE ACCOUNT OF THE GCP IN JSON FORMAT]

# You will need to get a POSTGRESQL database, the same that the AGENT
DATABASE=[URL DATABASE OF AGENT]

# You will need to get from an AGENT launched.
VERAMO_API_KEY=[VERAMO API KEY]
VERAMO_AGENT_OPEN_API = https://[URL AGENT EXPID]
VERAMO_DID_SUBJECT = "did:web:[URL AGENT EXPID]"
```

## Technologies Used
NodeJS, TypeScript, PostgreSQL, Firebase Realtime Database, Mapbox API and npm or yarn.

## Available Scripts:
To run the backend application locally, you need to have Node.js and TypeScript installed on your system. After cloning the repository, navigate to the project directory in your terminal and run the following command to install dependencies:

```bash
npm install
```
or 
```bash
yarn install 
```
To install the dependencies of the project.


```bash
yarn ts-node --esm ./src/server.ts
```
Runs the api server app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view the API.


# Additional Requirements for both projects
Docker

## Frontend Application:
```bash
# Build the Docker image for the frontend application
docker build -t expid-frontend .

# Run the Docker container for the frontend application
docker run -p 80:80 expid-frontend

```

## Backend Application:
```bash
# Build the Docker image for the backend application
docker build -t expid-backend .

# Run the Docker container for the backend application
docker run -p 3001:3001 expid-backend

```