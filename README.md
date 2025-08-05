# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and ESLint rules for linting and code quality.

Currently, two official plugins are available for Fast Refresh:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

---

## Frontend Deployment

The frontend of this application is hosted on Vercel. You can access it at:

[**https://starknote.vercel.app/**](https://starknote.vercel.app/)

Feel free to explore the app and interact with the UI. However, please note that the frontend requires a backend to be fully functional.

---

## Backend Setup (Required)

In order to fully use the application, you need to set up a backend API. You have two options:

1. **Use Your Own Backend**: You can create your own backend following the structure and functionality outlined in the [Uptick-Week_4 repo](https://github.com/Odewale-Emmanuel/Uptick-Week_4). This backend handles user authentication, note management (CRUD operations), and integrates with a MongoDB database.

2. **Clone My Backend**: You can also clone my existing backend from [Uptick-Week_4](https://github.com/Odewale-Emmanuel/Uptick-Week_4). Simply follow the instructions in the backend's README to get it running locally or deploy it to your preferred cloud platform.

### Backend API Features

The backend provides the following features:

- **User Management**: Allows users to register, sign in, and manage their data (CRUD).
- **Note Management**: Allows users to create, read, update, and delete their notes.
- **JWT Authentication**: Secure routes for user-specific data and note management, requiring a valid JWT token.

---

## How to Run the Full Application

1. **Frontend (React App)**:

   - Clone this repo:
     ```bash
     git clone https://github.com/Odewale-Emmanuel/StarkNote.git
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the app:
     ```bash
     npm run dev
     ```
     The frontend should now be running locally on `http://localhost:5173`.

2. **Backend (Express + MongoDB)**:

   - Clone the backend repo:
     ```bash
     git clone https://github.com/Odewale-Emmanuel/Uptick-Week_4.git
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up your MongoDB connection in the `config.js` or `.env` file.
   - Run the backend:
     ```bash
     npm run start
     ```
     The backend will now be running on `http://localhost:5000`.

3. **Connect Frontend to Backend**:
   - Once both the frontend and backend are running, the React frontend will be able to interact with the backend API (for user management, note CRUD operations, etc.).
   - Make sure to update the frontend API URL to point to your local or deployed backend if necessary.

---

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Backend**: Express.js, MongoDB, Mongoose ODM, JWT Authentication
- **Database**: MongoDB

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
