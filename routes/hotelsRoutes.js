import express from 'express';
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels} from '../controller/hotelsController.js';

const router = express.Router ();

//CREATE
router.post ( '/', createHotel);

//UPDATE
router.put ( '/:id', updateHotel);

//DELETE
router.delete ( '/:id', deleteHotel);

//GET 
router.get ( '/:id', getHotel);

//GET all
router.get ( '/', getAllHotels);


export default router;