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
exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.getEducationById = exports.getAllEducations = void 0;
// Prisma Tools
const client_1 = __importDefault(require("../../prisma/client"));
// Validator
const educationValidator_1 = require("../utils/validators/educationValidator");
const getAllEducations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const educations = yield client_1.default.education.findMany({
            orderBy: {
                startDate: 'desc'
            }
        });
        res.json({ educations });
    }
    catch (error) {
        console.error("Error fetching educations:", error);
        res.status(500).json({ message: "Failed to fetch educations", error });
    }
    return;
});
exports.getAllEducations = getAllEducations;
const getEducationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const education = yield client_1.default.education.findUnique({
            where: { id }
        });
        if (!education) {
            res.status(404).json({ message: "Education not found" });
            return;
        }
        res.json({ education });
    }
    catch (error) {
        console.error("Error fetching education:", error);
        res.status(500).json({ message: "Failed to fetch education", error });
    }
    return;
});
exports.getEducationById = getEducationById;
const createEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = educationValidator_1.educationCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        const education = yield client_1.default.education.create({
            data: parsed.data
        });
        res.status(201).json({ message: "Education created", education });
    }
    catch (error) {
        console.error("Error creating education:", error);
        res.status(500).json({ message: "Failed to create education", error });
    }
    return;
});
exports.createEducation = createEducation;
const updateEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsed = educationValidator_1.educationUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        // Check if education exists
        const existingEducation = yield client_1.default.education.findUnique({
            where: { id }
        });
        if (!existingEducation) {
            res.status(404).json({ message: "Education not found" });
            return;
        }
        // Update education
        const education = yield client_1.default.education.update({
            where: { id },
            data: parsed.data
        });
        res.json({ message: "Education updated", education });
    }
    catch (error) {
        console.error("Error updating education:", error);
        res.status(500).json({ message: "Failed to update education", error });
    }
    return;
});
exports.updateEducation = updateEducation;
const deleteEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if education exists
        const existingEducation = yield client_1.default.education.findUnique({
            where: { id }
        });
        if (!existingEducation) {
            res.status(404).json({ message: "Education not found" });
            return;
        }
        // Delete education
        yield client_1.default.education.delete({
            where: { id }
        });
        res.json({ message: "Education deleted" });
    }
    catch (error) {
        console.error("Error deleting education:", error);
        res.status(500).json({ message: "Failed to delete education", error });
    }
    return;
});
exports.deleteEducation = deleteEducation;
