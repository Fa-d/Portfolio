# Admin API Backend

This Node.js/Express server provides the backend functionality for the local admin panel used to manage the website's content.

## Running the Server

1.  Navigate to the `admin_api` directory:
    ```bash
    cd admin_api
    ```
2.  Install dependencies (if not already done):
    ```bash
    npm install
    ```
3.  Start the server (uses `nodemon` for automatic restarts during development):
    ```bash
    npm start
    ```
    The server will typically run on `http://localhost:3001` (configurable via the `PORT` variable in `.env`).

## Configuration (`.env` file)

Create a `.env` file in the `admin_api` directory with the following variables:

```env
PORT=3001
JWT_SECRET=your_jwt_secret_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$f5yH.Lp0nC5DDGv8hBvX7u2sgsONcvj3pm2DQJrX7xrG6MMNi2Moe # Example hash for 'admin123'
```

**IMPORTANT SECURITY NOTES:**

*   **`JWT_SECRET`**: **You MUST change `your_jwt_secret_key_here` to a strong, unique secret string.** This is critical for securing the admin session tokens.
*   **`ADMIN_PASSWORD_HASH`**: The default password is 'admin123'. It's highly recommended to change this. To generate a new hash for a new password, you can use an online bcrypt hash generator or a script. For example, to generate a hash in Node.js:
    ```javascript
    // const bcrypt = require('bcryptjs'); // If using CommonJS
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync("yourNewPassword", salt);
    // console.log(hash);
    ```
    Replace the existing `ADMIN_PASSWORD_HASH` with the new hash.

This server allows editing of JSON files located in the main project's `public/data/` directory. Remember to commit these JSON files to Git after making changes via the admin panel.
