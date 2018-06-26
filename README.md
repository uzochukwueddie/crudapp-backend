# CRUD App RESTful Interface
A simple CRUD RESTful interface built with node.js. It uses express framework and mongoDB database. Data is loaded from a json file and saved into mongodb database. The CRUD application interfaces with a frontend application built with Angular 6. Once data is loaded from file and saved to db, data can be sorted, filtered, edited and deleted from the frontend of the application.

# Tools and Dependencies
- Node
- Express
- Mongodb
- Mongoose
- Joi
- Mongoose Unique Validator
- Cors
- Load Json File Module

# Getting Started
To get started, you need to install node.js latest version from https://nodejs.org/en/. Also install mongodb on your local nachine via https://www.mongodb.com/download-center?jmp=nav#community. Once you have that setup, you can clone the project from github using git clone https://github.com/uzochukwueddie/crudapp-backend.git.

# How to Run
Once the project is downloaded, open with your favorite editor and also open project in a terminal. Run the command ```npm install``` to install all dependencies. The server can be started by using the command ```node server.js```. You can also install nodemon to start the server. Run ```npm install -g nodemon``` to install nodemon package globally and then you can start the server by running ```nodemon server```. Server runs on port 3000.

# Project Structure
The project uses MVC architecture. It contains a server.js file from where the application is run. Model folder contains the database schema. Routes folder contains http methods GET, POST, PUT, DELETE. Controllers folder contains functions for the routes. package.json file contains metadata for the application. It holds information about the project and its dependencies.

# Endpoints
Available endpoints 
```javascript
# Get data from database
http://localhost:3000/api/crud/get-data 

# Read data from json file and load into database
http://localhost:3000/api/crud/read

# Filter
http://localhost:3000/api/crud/date-filter

# Update item
http://localhost:3000/api/crud/item/:id

# Delete item
http://localhost:3000/api/crud/delete-item/:id

```
