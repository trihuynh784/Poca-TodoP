import express from "express";
import * as controller from "../controllers/task.controller";

const router = express.Router();

router.get("/", controller.getTasks);

router.patch("/:id", controller.updateTask);

router.delete("/:id", controller.deleteTask);

router.post("/create", controller.createTask);

export default router;
