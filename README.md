# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and ESLint rules for linting and code quality.

Currently, two official plugins are available for Fast Refresh:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

---

## Frontend Deployment

The frontend of this application is hosted on Vercel and is now live! You can access the app at:

[**https://starknote.vercel.app/**](https://starknote.vercel.app/)

Feel free to explore the app and interact with the UI. However, please note that the frontend requires a backend to be fully functional.

---

## Backend Setup (Required)

The backend is hosted on Render and is live as well! It uses a MongoDB Atlas (cloud-based MongoDB) for database management.

You can access the live backend API at:

- **Base URL**: [https://uptick-week-4.onrender.com](https://uptick-week-4.onrender.com)
- **Sign-in endpoint**: [https://uptick-week-4.onrender.com/api/sign-in](https://uptick-week-4.onrender.com/api/sign-in)

The backend handles user authentication, note management (CRUD operations), and integrates with MongoDB Atlas.

---

## API Routes

### Route without Authentication

#### /api/sign-up

- **POST** `/api/sign-up`
  - Creates a new user from request body details.

#### /api/sign-in

- **POST** `/api/sign-in`
  - Signs in a user from request body details.

---

### Route with Authentication

#### /api/user

- **GET** `/api/user`

  - Returns all users, or a single user if `user_id` is provided as a query parameter.

- **DELETE** `/api/user`

  - Deletes a user using `id` from request body and removes all notes attached to the user.

- **PATCH** `/api/user`
  - Updates user details from request body.

#### /api/note

- **GET** `/api/note`

  - Returns all notes, or all notes for a single user if `user_id` is provided as a query parameter.

- **POST** `/api/note`

  - Creates a new note from request body details.

- **DELETE** `/api/note`

  - Deletes a note using its `id` from request body.

- **PATCH** `/api/note`
  - Updates note details from request body.

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

   If you want to run the backend locally or modify it, you can still clone and set it up as follows:

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
     npm run dev
     ```
     The backend will now be running on `http://localhost:5500`.

3. **Connect Frontend to Backend**:
   - Once both the frontend and backend are running, the React frontend will be able to interact with the backend API (for user management, note CRUD operations, etc.).
   - For the live app, no further setup is needed, as the frontend already connects to the deployed backend.

---

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Backend**: Express.js, MongoDB (via MongoDB Atlas), Mongoose ODM, JWT Authentication
- **Database**: MongoDB (hosted on MongoDB Atlas)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
