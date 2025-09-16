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
exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkillById = exports.getAllSkills = void 0;
// Prisma Tools
const client_1 = __importDefault(require("../../prisma/client"));
// Validator
const skillValidator_1 = require("../utils/validators/skillValidator");
const getAllSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield client_1.default.skill.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json({ skills });
    }
    catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).json({ message: "Failed to fetch skills", error });
    }
    return;
});
exports.getAllSkills = getAllSkills;
const getSkillById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const skill = yield client_1.default.skill.findUnique({
            where: { id }
        });
        if (!skill) {
            res.status(404).json({ message: "Skill not found" });
            return;
        }
        res.json({ skill });
    }
    catch (error) {
        console.error("Error fetching skill:", error);
        res.status(500).json({ message: "Failed to fetch skill", error });
    }
    return;
});
exports.getSkillById = getSkillById;
const createSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = skillValidator_1.skillCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        const skill = yield client_1.default.skill.create({
            data: parsed.data
        });
        res.status(201).json({ message: "Skill created", skill });
    }
    catch (error) {
        console.error("Error creating skill:", error);
        res.status(500).json({ message: "Failed to create skill", error });
    }
    return;
});
exports.createSkill = createSkill;
const updateSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsed = skillValidator_1.skillUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        // Check if skill exists
        const existingSkill = yield client_1.default.skill.findUnique({
            where: { id }
        });
        if (!existingSkill) {
            res.status(404).json({ message: "Skill not found" });
            return;
        }
        // Update skill
        const skill = yield client_1.default.skill.update({
            where: { id },
            data: parsed.data
        });
        res.json({ message: "Skill updated", skill });
    }
    catch (error) {
        console.error("Error updating skill:", error);
        res.status(500).json({ message: "Failed to update skill", error });
    }
    return;
});
exports.updateSkill = updateSkill;
const deleteSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if skill exists
        const existingSkill = yield client_1.default.skill.findUnique({
            where: { id }
        });
        if (!existingSkill) {
            res.status(404).json({ message: "Skill not found" });
            return;
        }
        // Delete skill
        yield client_1.default.skill.delete({
            where: { id }
        });
        res.json({ message: "Skill deleted" });
    }
    catch (error) {
        console.error("Error deleting skill:", error);
        res.status(500).json({ message: "Failed to delete skill", error });
    }
    return;
});
exports.deleteSkill = deleteSkill;
