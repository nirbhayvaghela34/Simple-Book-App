# MERN Stack CRUD Application

## Overview
This is a simple CRUD (Create, Read, Update, Delete) application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. Cloudinary is used for storing media files.

## Features
- **Create**: Add new entries with media files.
- **Read**: View all entries or specific entries.
- **Update**: Modify existing entries and media.
- **Delete**: Remove entries and associated media.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL)
- **Media Storage**: Cloudinary

## Setup Instructions

1. Clone the repository and navigate to the project folder.

### Backend Setup
2. Navigate to the `backend` directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
5. Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
6. Start the React development server:
   ```bash
   npm start
   ```
