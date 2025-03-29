# EmployWise Frontend Assignment

This is a React application that integrates with the Reqres API to perform basic user management functions.

## Features

- Authentication with token-based login
- Paginated list of users
- Edit and delete user functionality
- Client-side search and filtering
- Responsive UI design with Tailwind CSS
- Toast notifications for success/error feedback

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/employwise-frontend.git
cd employwise-frontend
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm start
```

4. Open your browser and navigate to http://localhost:3000

## Usage

## Login

- Use the provided credentials:

  - Email: eve.holt@reqres.in
  - Password: cityslicka

## User Management

- View all users with pagination
- Search for users by name or email
- Edit user details (first name, last name, email)
- Delete users

## Tech Stack

- React
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling

## API Integration

This application integrates with the Reqres API, using the following endpoints:

- POST /api/login - User authentication
- GET /api/users?page=X - Fetch users with pagination
- PUT /api/users/{id} - Update user details
- DELETE /api/users/{id} - Delete a user

## Assumptions and Considerations

- The Reqres API is a mock API, so some operations like DELETE might not actually delete resources on the server
- Token storage is handled with localStorage for simplicity
- Proper error handling is implemented for API requests
- Responsive design works on mobile, tablet, and desktop devices
