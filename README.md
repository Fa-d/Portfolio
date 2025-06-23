MY Portfolio

# Featues  
- [x] Intro
- [x] Header 
- [x] Education
- [x] Experience
- [x] Footer
- [x] Projects
- [x] Contact Me 
- [ ] Articles
- [ ] Notes
- [ ] Skills
- [ ] Certifications
- [ ] Analytics
- [ ] Open-Source Contributions

## Updating Site Content

This site uses a local admin panel to manage its content, which is stored in JSON files.

**Workflow for Updating Content:**

1.  **Run the Admin Backend Server:**
    *   Navigate to the `admin_api` directory: `cd admin_api`
    *   Start the server: `npm start` (This typically runs on `http://localhost:3001`)

2.  **Run the Frontend Development Server:**
    *   In the main project directory, run: `npm run dev` (This typically runs on `http://localhost:5173` or similar)

3.  **Access the Admin Panel:**
    *   Open your browser and go to `http://localhost:5173/admin` (or whatever port your Vite dev server is using).
    *   Log in using the admin credentials (default: `admin` / `admin123`). The credentials and JWT secret are configured in `admin_api/.env`.

4.  **Edit Content:**
    *   Use the admin panel interface to modify the content for different sections (Articles, Projects, Skills, etc.).
    *   Saving changes in the admin panel will update the corresponding JSON files in the `public/data/` directory locally.

5.  **Commit Changes:**
    *   After making your desired content updates, commit the changes made to the files in `public/data/` to your Git repository.
    *   Example:
        ```bash
        git add public/data/*.json
        git commit -m "Update site content for XYZ section"
        git push
        ```

6.  **Rebuild and Redeploy:**
    *   Build the static site: `npm run build`
    *   Deploy the contents of the `dist/` folder to your hosting provider (e.g., GitHub Pages, Netlify, Vercel). The live site will now reflect the updated content from the JSON files.

This process ensures that the content is version-controlled and the live site is always serving statically built files.