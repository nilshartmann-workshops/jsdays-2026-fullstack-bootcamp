import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.get("/", controller.getAll);
router.delete("/:id", controller.remove);
router.get("/:id", controller.getById);


export default router;
