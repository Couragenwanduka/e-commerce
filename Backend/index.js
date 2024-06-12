import express from 'express';
import cookieParser from 'cookie-parser';
import connectionDb from './config/mongodb.js';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import cors from 'cors';


dotenv.config();

connectionDb();

const app = express();

app.use(express.json());

app.use(cookieParser());

const allowedOrigins = [
  'https://e-commerce-chi-murex.vercel.app',
  'https://e-commerce-frontend-weld-chi.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies) to be sent
}));

app.use(express.urlencoded({ extended: true }));

app.use('/',router);

const port = process.env.Port||3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
