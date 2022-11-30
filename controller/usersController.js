import  User from '../models/User.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

// @desc Update an user
// @route PUT /users/:id
// @access Private
export const updateUser = async ( req, res, next) => {
  try {
    const newUser = await User.findByIdAndUpdate 
    ( req.params.id, 
      { $set: req.body},
      { new: true}
    ).exec();
    res.status ( 200). json ( newUser);
  } catch ( error) {
    res.status ( 500). json ({ message: error.message});
    next ( error);
  }
};


// @desc Delete a user
// @route DELETE /users/:id
// @access Private
export const deleteUser = async ( req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete ( req.params.id);
    res.status ( 200). json ( deleteUser);
  } catch ( error) {
    res.status (500). json ({ message: error.message});
    next ( error);
  }
};


// @desc Get a user
// @route GET /hotels/:id
// @access Private
export const getUser = async ( req, res, next) => {
  try {
    const user = await User.findById ( req.params.id);
    if ( !usr) {
      res.send ( "The hotel not found.")
      return next ();
    }
    res.status ( 200). json ( user);
  } catch ( error) {
    next ( error);
  }
};


// @desc Get all users
// @route GET /users
// @access Private
export const getAllUsers = async ( req, res, next) => {
  try {
    const users = await User.find ();
    if ( users.length === 0) {
      res.send ( "No hotel found.")
      return next ();
    }
    res.status ( 200). json ( users);
  } catch ( error) {
    next ( error);
  }
};


