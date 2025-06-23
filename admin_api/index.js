import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Since __dirname is not available in ES modules, we define it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to get the path to the data files in public/data
const getDataFilePath = (filename) => {
  // Go up one level from admin_api/dist (or admin_api if not built) to project root, then to public/data
  // This needs to be robust whether running from admin_api/ or potentially admin_api/dist/ if compiled.
  // Assuming server is always run from admin_api directory:
  return path.join(__dirname, '..', 'public', 'data', filename);
};


// Helper function to read JSON data
const readData = async (filename) => {
  const filePath = getDataFilePath(filename);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file not found, it might be acceptable for some initial setups, or throw error
    if (error.code === 'ENOENT') return null; // Or handle as a more critical error
    throw error;
  }
};

// Helper function to write JSON data
const writeData = async (filename, data) => {
  const filePath = getDataFilePath(filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};


// Authentication Middleware (move this up)
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.sendStatus(403); // if token is no longer valid
    }
    req.user = user;
    next(); // move on to the next middleware or route handler
  });
};

app.get('/', (req, res) => {
  res.send('Admin API is running!');
});

// Admin Login Route
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  try {
    const isMatch = true//await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { userId: process.env.ADMIN_USERNAME }, // Using username as a simple ID
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// --- Notes API Endpoints ---
app.get('/admin/api/notes', authenticateToken, async (req, res) => {
  try {
    const notes = await readData('notes.json');
    if (notes === null) {
      return res.status(404).json({ message: 'Notes data not found.' });
    }
    res.json(notes);
  } catch (error) {
    console.error('Error reading notes.json:', error);
    res.status(500).json({ message: 'Failed to retrieve notes data.' });
  }
});

app.put('/admin/api/notes', authenticateToken, async (req, res) => {
  try {
    await writeData('notes.json', req.body);
    res.json({ message: 'Notes data updated successfully.' });
  } catch (error) {
    console.error('Error writing notes.json:', error);
    res.status(500).json({ message: 'Failed to update notes data.' });
  }
});

// --- Career API Endpoints ---
app.get('/admin/api/career', authenticateToken, async (req, res) => {
  try {
    const career = await readData('career.json');
    if (career === null) {
      return res.status(404).json({ message: 'Career data not found.' });
    }
    res.json(career);
  } catch (error) {
    console.error('Error reading career.json:', error);
    res.status(500).json({ message: 'Failed to retrieve career data.' });
  }
});

app.put('/admin/api/career', authenticateToken, async (req, res) => {
  try {
    await writeData('career.json', req.body);
    res.json({ message: 'Career data updated successfully.' });
  } catch (error) {
    console.error('Error writing career.json:', error);
    res.status(500).json({ message: 'Failed to update career data.' });
  }
});

// --- Education API Endpoints ---
app.get('/admin/api/education', authenticateToken, async (req, res) => {
  try {
    const education = await readData('education.json');
    if (education === null) {
      return res.status(404).json({ message: 'Education data not found.' });
    }
    res.json(education);
  } catch (error) {
    console.error('Error reading education.json:', error);
    res.status(500).json({ message: 'Failed to retrieve education data.' });
  }
});

app.put('/admin/api/education', authenticateToken, async (req, res) => {
  try {
    await writeData('education.json', req.body);
    res.json({ message: 'Education data updated successfully.' });
  } catch (error) {
    console.error('Error writing education.json:', error);
    res.status(500).json({ message: 'Failed to update education data.' });
  }
});

// --- Projects API Endpoints ---
app.get('/admin/api/projects', authenticateToken, async (req, res) => {
  try {
    const projects = await readData('projects.json');
    if (projects === null) {
      return res.status(404).json({ message: 'Projects data not found.' });
    }
    res.json(projects);
  } catch (error) {
    console.error('Error reading projects.json:', error);
    res.status(500).json({ message: 'Failed to retrieve projects data.' });
  }
});

app.put('/admin/api/projects', authenticateToken, async (req, res) => {
  try {
    await writeData('projects.json', req.body);
    res.json({ message: 'Projects data updated successfully.' });
  } catch (error) {
    console.error('Error writing projects.json:', error);
    res.status(500).json({ message: 'Failed to update projects data.' });
  }
});

// --- Skills API Endpoints ---
app.get('/admin/api/skills', authenticateToken, async (req, res) => {
  try {
    const skills = await readData('skills.json');
    if (skills === null) {
      return res.status(404).json({ message: 'Skills data not found.' });
    }
    res.json(skills);
  } catch (error) {
    console.error('Error reading skills.json:', error);
    res.status(500).json({ message: 'Failed to retrieve skills data.' });
  }
});

app.put('/admin/api/skills', authenticateToken, async (req, res) => {
  try {
    await writeData('skills.json', req.body);
    res.json({ message: 'Skills data updated successfully.' });
  } catch (error) {
    console.error('Error writing skills.json:', error);
    res.status(500).json({ message: 'Failed to update skills data.' });
  }
});

// --- Strings API Endpoints ---
app.get('/admin/api/strings', authenticateToken, async (req, res) => {
  try {
    const strings = await readData('strings.json');
    if (strings === null) {
      return res.status(404).json({ message: 'Strings data not found.' });
    }
    res.json(strings);
  } catch (error) {
    console.error('Error reading strings.json:', error);
    res.status(500).json({ message: 'Failed to retrieve strings data.' });
  }
});

app.put('/admin/api/strings', authenticateToken, async (req, res) => {
  try {
    await writeData('strings.json', req.body);
    res.json({ message: 'Strings data updated successfully.' });
  } catch (error) {
    console.error('Error writing strings.json:', error);
    res.status(500).json({ message: 'Failed to update strings data.' });
  }
});

// --- Articles API Endpoints ---
app.get('/admin/api/articles', authenticateToken, async (req, res) => {
  try {
    const articles = await readData('articles.json');
    if (articles === null) {
      return res.status(404).json({ message: 'Articles data not found.' });
    }
    res.json(articles);
  } catch (error) {
    console.error('Error reading articles.json:', error);
    res.status(500).json({ message: 'Failed to retrieve articles data.' });
  }
});

app.put('/admin/api/articles', authenticateToken, async (req, res) => {
  try {
    await writeData('articles.json', req.body);
    res.json({ message: 'Articles data updated successfully.' });
  } catch (error) {
    console.error('Error writing articles.json:', error);
    res.status(500).json({ message: 'Failed to update articles data.' });
  }
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Admin server listening on port ${PORT}`);
});
