import express from 'express';

import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels} from '../controller/hotelsController.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router ();

//CREATE
router.post ( '/', verifyAdmin, createHotel);

//UPDATE
router.put ( '/:id', verifyAdmin, updateHotel);

//DELETE
router.delete ( '/:id', verifyAdmin, deleteHotel);

//GET 
router.get ( '/:id', getHotel);

//GET all
router.get ( '/', getAllHotels);


export default router;