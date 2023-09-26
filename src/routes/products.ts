import { Router, json, urlencoded } from "express";
import { getProduct } from "../controllers/products";

const router = Router();

router.use(json());
router.use(urlencoded({
    extended: false,
}));

router.route('/').get(getProduct);

export default router;