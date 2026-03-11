import { Router } from "express";
import * as controller from "./controller";
import { validate } from "../../middleware/validate";
import { CreateAuthorSchema, UpdateAuthorSchema } from "./validation-schema";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(CreateAuthorSchema), controller.create);
router.put("/:id", validate(UpdateAuthorSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;
