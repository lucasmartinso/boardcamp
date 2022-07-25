import { Router } from "express";
import dotenv from "dotenv"; 
import { deleteRentals, getRentals, postRentals, postRentalsById } from "../controllers/rentController.js"; 
import { validateRentals } from "../middlewares/validateRentalsMiddleware.js";
dotenv.config(); 

const router = Router();

router.get("/rentals", getRentals);  
router.post("/rentals", validateRentals,postRentals);  
router.post("/rentals/:id/return", postRentalsById);
router.delete("/rentals/:id", deleteRentals); 

export default router;
