import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import User from '../models/User.js';
import { createError } from '../utils/error.js';

// @desc Create a user
// @route POST /register
// @access Private
export const register = async ( req, res, next) => {
  const hashPassword = await bcrypt.hash ( req.body.password, 10);
  try {
    const newUser = new User ({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      city: req.body.city,
      image: req.body.image,
      password: hashPassword
    });
    await newUser.save ( newUser);
    res.status (200). send ( "User has been created.")
  } catch ( error) {
    next ( error);
  }
};


// @desc login account 
// @route POST /login
// @access Private
export const login = async ( req, res, next) => {
  const user = await User.findOne ({ username: req.body.username}).exec();
  try {
    if ( !user) {
      return next ( createError ( 
        404,
        "User is not found." 
      ))
    } 


    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if ( !isPasswordCorrect) {
      return next ( createError ( 
        400, 
        "Wrong password or username!"
        )
      );
    };

    const token = jwt.sign (
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT
    );
     
    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie ( 
      "access_token",
      token,
      { 
        httpOnly: true
      }).status ( 200).json ({ ...otherDetails});
  } catch ( error) {
    next ( error);
  }
};
