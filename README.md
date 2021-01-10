# FC-UPI2.0
This repository contains the codebase of a backend server build during participation in a online hackathon.
 - Backend Server is created using NodeJs(Express) integrated with MongoDB(Cloud Atlas) database.
 - Provides features like Login, Registration, Password Hashing, JWT token varification etc.

 - This server is trying to mimic a real UPI, where if user has already registered then get his account details or else upload a CSV of past transations and get account details.
 - For a new user 8 digit unique account number should be assigned by the backend at the time of registration.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
NPM
NodeJs
MongoDB
```

### Installing

Follow these steps to installing  dependencies and running this project on your local
by setting development environment:

- Clone project on local

```
 git clone https://github.com/sy117/FC-UPI2.0.git
```
- Move to server Directory

```
 cd server
```

- Install Dependencies

```
 npm i

```
- Set environment variables in .env file

```
PORT = PORT_NUMBER
DB_URL = mongodb+srv://<user_name>:<password>@clusterfc.txgre.mongodb.net/<database_name>?retryWrites=true&w=majority
TOKEN_SECRET = YOUR_SECRET_TOKEN_FOR JWT
ACCOUNT_NUMBER = 8_DIGIT_DEFAULT_ACCOUNT_NUMBER

```

- Start Server on localhost

```
 npm start
```

## Deployment

Add deployment steps by yourself.

## Built With

* [Express](https://expressjs.com/) - The web framework used
* [MongoDB](https://www.mongodb.com/cloud/atlas) - Database Used
