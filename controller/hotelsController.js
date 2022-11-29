import  Hotel from '../models/Hotel.js';

export const createHotel = async ( req, res, next) => {
  const hotel = new Hotel ( req.body);

  try {
    const newHotel = await hotel.save ();
    res.status ( 200).json( newHotel);
  } catch ( error) {
    res.status ( 500). json ({ message: error.message});
    next ( error);
  }
};

//UPDATE
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

//DELETE
export const deleteHotel = async ( req, res, next) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete ( req.params.id);
    res.status ( 200). json ( deleteHotel);
  } catch ( error) {
    res.status (500). json ({ message: error.message});
    next ( error);
  }
};

//GET
export const getHotel = async ( req, res, next) => {
  try {
    const hotel = await Hotel.findById ( req.params.id);
    res.status ( 200). json ( hotel);
  } catch ( error) {
    res.status (500). json ({ message: error.message});
    next ( error);
  }
};

//GET all
export const getAllHotels = async ( req, res, next) => {
  try {
    const hotels = await Hotel.find ();
    res.status ( 200). json ( hotels);
  } catch ( error) {
    res.status (500). json ({ message: error.message});
    next ( error);
  }
};


