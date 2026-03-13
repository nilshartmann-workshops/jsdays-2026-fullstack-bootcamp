import { Router } from "express";
import * as controller from "./controller";
import { validate } from "../../middleware/validate";
import { CreateBookSchema } from "./validation-schema";
import { requireRole } from "../../middleware/auth";

const router = Router();

router.get("/", controller.getAll);
router.delete("/:id", controller.remove);
router.get("/:id", controller.getById);
// router.post("/", validate(CreateBookSchema), controller.create);
router.post(
  "/",
  requireRole("role_admin"),
  validate(CreateBookSchema),
  controller.create,
);

export default router;
