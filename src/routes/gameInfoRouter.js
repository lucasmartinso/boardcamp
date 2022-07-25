import { Router } from "express";
import { getCategories, getGames, postCategories, postGames } from "../controllers/gameInfoController.js";
import { validateCategorie } from "../middlewares/validateCategorieMiddleware.js";
import { validateGames } from "../middlewares/validateGamesMiddleware.js";
import dotenv from "dotenv"; 
dotenv.config(); 

const router = Router();

router.get("/categories", getCategories); 
router.post("/categories",validateCategorie,postCategories);
router.get("/games",getGames); 
router.post("/games",validateGames,postGames);

export default router;

