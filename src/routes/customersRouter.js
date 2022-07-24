import { Router } from "express";
import dotenv from "dotenv"; 
import { getCustomers, getCustomersById, postCustomers, updateCustomers } from "../controllers/costumerContoller.js"; 
import { validateCustomers } from "../middlewares/validateCustomersMiddleware.js";
dotenv.config(); 

const router = Router();

router.get("/customers", getCustomers);  
router.get("/customers/:id", getCustomersById);  
router.post("/customers", validateCustomers, postCustomers);
router.put("/customers/:id", validateCustomers,updateCustomers); 

export default router;
