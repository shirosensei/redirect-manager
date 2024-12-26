# Redirect Manager

Redirect Manager is a web application that allows users to manage and configure URL redirections based on selected routes. The application features a user-friendly interface built with Vite and React, styled with vanilla CSS, and a robust backend powered by Node.js. The data is stored in a MySQL database.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Create, read, update, and delete (CRUD) URL redirections.
- User-friendly frontend interface for managing routes.
- Fast and efficient backend handling requests and database interactions.
- MySQL database for persistent storage of redirection data.

## Technologies Used

- **Frontend**: 
  - Vite
  - React
  - Vanilla CSS

- **Backend**: 
  - Node.js
  - Express.js

- **Database**: 
  - MySQL


### Installation

To get started with the Redirect Manager, follow these steps:

### Prerequisites

- Node.js (v16 or higher)
- MySQL Server

### Clone the Repository

```bash
git clone https://github.com/shirosensei/redirect-manager.git
cd redirect-manager
```

#### Setup the Backend

1. Navigate to the backend directory

```bash
cd backend
```

2. Install the dependencies 

```bash
npm install
```

3. create a `.env` file in the backend direcotyr and configure your database connection

```text
JWT_SECRET=jwt_key
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
```

4. Run the backend server

```bash
node index.js
```

#### Setup the Frontend

1. Navidate to the frontend directory

```bash
cd ../frontend
```

2. Install the dependencies

```bash
npm install
```

3. Run the frontend application

```bash
npm run dev
```


### Usage

Once both the frontend and backend are running, Generate a jwt token to access the Redirect Manager dashboard.

frontend is running on http://localhost:3306
backend is running on http://localhost:9000

### API Endpoints

GET /routes/redirections - Retrieve all redirects.
POST /routes/redirections - Create a new redirect.
PUT /routes/redirections/:id - Update an existing redirect.
DELETE /routes/redirections/:id - Delete a redirect.

### Contributing

Contributions are welcome! If you have suggestions for improvements or want to report a bug, please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.

### Contact

For any questions or inquiries, feel free to reach out
