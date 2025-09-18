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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperienceById = exports.getAllExperiences = void 0;
// Prisma Tools
const client_1 = require("../../prisma/client");
// Validator
const experienceValidator_1 = require("../utils/validators/experienceValidator");
const getAllExperiences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const experiences = yield client_1.prisma.experience.findMany({
            orderBy: {
                startDate: "desc",
            },
        });
        res.json({ experiences });
    }
    catch (error) {
        console.error("Error fetching experiences:", error);
        res.status(500).json({ message: "Failed to fetch experiences", error });
    }
    return;
});
exports.getAllExperiences = getAllExperiences;
const getExperienceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const experience = yield client_1.prisma.experience.findUnique({
            where: { id },
        });
        if (!experience) {
            res.status(404).json({ message: "Experience not found" });
            return;
        }
        res.json({ experience });
    }
    catch (error) {
        console.error("Error fetching experience:", error);
        res.status(500).json({ message: "Failed to fetch experience", error });
    }
    return;
});
exports.getExperienceById = getExperienceById;
const createExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = experienceValidator_1.experienceCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        const experience = yield client_1.prisma.experience.create({
            data: parsed.data,
        });
        res.status(201).json({ message: "Experience created", experience });
    }
    catch (error) {
        console.error("Error creating experience:", error);
        res.status(500).json({ message: "Failed to create experience", error });
    }
    return;
});
exports.createExperience = createExperience;
const updateExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsed = experienceValidator_1.experienceUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        // Check if experience exists
        const existingExperience = yield client_1.prisma.experience.findUnique({
            where: { id },
        });
        if (!existingExperience) {
            res.status(404).json({ message: "Experience not found" });
            return;
        }
        // Update experience
        const experience = yield client_1.prisma.experience.update({
            where: { id },
            data: parsed.data,
        });
        res.json({ message: "Experience updated", experience });
    }
    catch (error) {
        console.error("Error updating experience:", error);
        res.status(500).json({ message: "Failed to update experience", error });
    }
    return;
});
exports.updateExperience = updateExperience;
const deleteExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if experience exists
        const existingExperience = yield client_1.prisma.experience.findUnique({
            where: { id },
        });
        if (!existingExperience) {
            res.status(404).json({ message: "Experience not found" });
            return;
        }
        // Delete experience
        yield client_1.prisma.experience.delete({
            where: { id },
        });
        res.json({ message: "Experience deleted" });
    }
    catch (error) {
        console.error("Error deleting experience:", error);
        res.status(500).json({ message: "Failed to delete experience", error });
    }
    return;
});
exports.deleteExperience = deleteExperience;
