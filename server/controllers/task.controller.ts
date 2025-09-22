import { Request, Response } from "express";
import Task from "../models/task.model";

export const getTasks = async (req: Request, res: Response) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate: Date;
  switch (filter) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 && -7)
      );
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "all":
    default:
      startDate = null;
      break;
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [
            { $sort: { status: 1, createdAt: -1 } }, // Sort by status (active first) and then by creation date
          ],
          activeTaskCount: [
            { $match: { status: "active" } },
            { $count: "count" },
          ],
          completedTaskCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks || [];
    const activeTaskCount = result[0].activeTaskCount[0]?.count || 0;
    const completedTaskCount = result[0].completedTaskCount[0]?.count || 0;

    res.status(200).json({
      status: 200,
      tasks,
      activeTaskCount,
      completedTaskCount,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Lỗi truy vấn dữ liệu!",
      error: error,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    let objectUpdate = {};
    if (req.body.title) {
      objectUpdate = { title: req.body.title };
    } else if (req.body.status) {
      objectUpdate = {
        status: req.body.status,
        completedAt: req.body.completedAt,
      };
    }

    await Task.updateOne({ _id: req.params.id }, { ...objectUpdate });

    res.status(200).json({
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Lỗi cập nhật dữ liệu!",
      error,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await Task.deleteOne({ _id: req.params.id });

    res.status(200).json({
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Lỗi xóa dữ liệu!",
      error,
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = new Task({ title: req.body.title, status: "active" });
    await task.save();

    res.status(200).json({
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Lỗi xóa dữ liệu!",
      error,
    });
  }
};
