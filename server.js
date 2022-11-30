import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import hotelsRoutes from './routes/hotelsRoutes.js';
import roomsRoutes from './routes/roomsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';


const app = express ();
dotenv.config();
console.log ( process.env.NODE_ENV);

//Middleware
app.use ( cors ());
app.use ( express.json ());
app.use ( cookieParser ());

app.use ( '/api/auth', authRoutes);
app.use ( '/api/hotels', hotelsRoutes);
app.use ( '/api/rooms', roomsRoutes);
app.use ( '/api/users', usersRoutes);


// Response error message for all routes
app.use ( ( error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Someting went wrong!"
  return res.status ( errorStatus). json ({
    success: false,
    status: error,
    message: errorMessage,
    stack: error.stack
  })
});









//Conneted to MongoDB and Localhost
const PORT = process.env.PORT
const connect = async () => {
  try {
    await mongoose.connect ( process.env.DATABASE_URL);
    console.log( "Connected to MongoDB.");
  } catch ( error) {
    throw error;
  }
};
mongoose.connection.on ( "disconnected", () => {
  console.log ( "mongoDB disconnected!");
});

//Conneted to Localhost
app.listen ( PORT, () => {
  connect ();
  console.log ( `Connected to http://localhost:${ PORT}.`);
});


