import  Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';

// @desc Create a hotel
// @route POST /hotels
// @access Private
export const createHotel = async ( req, res, next) => {
  const newHotel = new Hotel ( req.body);

  try {
    await newHotel.save ();
    res.status ( 200). send ( "New hotel has been created.");
  } catch ( error) {
    res.status ( 500). json ({ message: error.message});
    next ( error);
  }
};

// @desc Update a hotel
// @route PUT /hotels/:id
// @access Private
export const updateHotel = async ( req, res, next) => {
  try {
    const newHotel = await Hotel.findByIdAndUpdate 
    ( req.params.id, 
      { $set: req.body},
      { new: true}
    ).exec();
    res.status ( 200). json ( newHotel);
  } catch ( error) {
    res.status ( 500). json ({ message: error.message});
    next ( error);
  }
};


// @desc Delete a hotel
// @route DELETE /hotels/:id
// @access Private
export const deleteHotel = async ( req, res, next) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete ( req.params.id);
    res.status ( 200). json ( deleteHotel);
  } catch ( error) {
    res.status (500). json ({ message: error.message});
    next ( error);
  }
};


// @desc Get a hotel
// @route GET /hotels/:id
// @access Private
export const getHotel = async ( req, res, next) => {
  try {
    const hotel = await Hotel.findById ( req.params.id);
    if ( !hotel) {
      res.send ( "The hotel not found.")
      return next ();
    }
    res.status ( 200). json ( hotel);
  } catch ( error) {
    next ( error);
  }
};


// @desc Get all hotels
// @route GET /hotels
// @access Private
export const getAllHotels = async ( req, res, next) => {
  try {
    const hotels = await Hotel.find ();
    if ( hotels.length === 0) {
      res.send ( "No hotel found.")
      return next ();
    }
    res.status ( 200). json ( hotels);
  } catch ( error) {
    next ( error);
  }
};


