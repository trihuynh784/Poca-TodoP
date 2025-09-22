"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = exports.deleteTask = exports.updateTask = exports.getTasks = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { filter = "today" } = req.query;
    const now = new Date();
    let startDate;
    switch (filter) {
        case "today":
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case "week":
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 && -7));
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
        const result = yield task_model_1.default.aggregate([
            { $match: query },
            {
                $facet: {
                    tasks: [
                        { $sort: { status: 1, createdAt: -1 } },
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
        const activeTaskCount = ((_a = result[0].activeTaskCount[0]) === null || _a === void 0 ? void 0 : _a.count) || 0;
        const completedTaskCount = ((_b = result[0].completedTaskCount[0]) === null || _b === void 0 ? void 0 : _b.count) || 0;
        res.status(200).json({
            status: 200,
            tasks,
            activeTaskCount,
            completedTaskCount,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "Lỗi truy vấn dữ liệu!",
            error: error,
        });
    }
});
exports.getTasks = getTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let objectUpdate = {};
        if (req.body.title) {
            objectUpdate = { title: req.body.title };
        }
        else if (req.body.status) {
            objectUpdate = {
                status: req.body.status,
                completedAt: req.body.completedAt,
            };
        }
        yield task_model_1.default.updateOne({ _id: req.params.id }, Object.assign({}, objectUpdate));
        res.status(200).json({
            status: 200,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "Lỗi cập nhật dữ liệu!",
            error,
        });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield task_model_1.default.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status: 200,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "Lỗi xóa dữ liệu!",
            error,
        });
    }
});
exports.deleteTask = deleteTask;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new task_model_1.default({ title: req.body.title, status: "active" });
        yield task.save();
        res.status(200).json({
            status: 200,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "Lỗi xóa dữ liệu!",
            error,
        });
    }
});
exports.createTask = createTask;
