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
exports.updateSettings = exports.getSettings = void 0;
// Prisma Tools
const client_1 = require("../../prisma/client");
// Validator
const settingsValidator_1 = require("../utils/validators/settingsValidator");
const getSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the first (and only) settings record
        let settings = yield client_1.prisma.settings.findFirst();
        // If no settings exist, create default settings
        if (!settings) {
            settings = yield client_1.prisma.settings.create({
                data: {},
            });
        }
        res.json({ settings });
    }
    catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ message: "Failed to fetch settings", error });
    }
    return;
});
exports.getSettings = getSettings;
const updateSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = settingsValidator_1.settingsUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            res
                .status(400)
                .json({ message: "Invalid input", errors: parsed.error.flatten() });
            return;
        }
        // Get the first (and only) settings record
        let settings = yield client_1.prisma.settings.findFirst();
        // If no settings exist, create new settings
        if (!settings) {
            settings = yield client_1.prisma.settings.create({
                data: {
                    themeColor: parsed.data.themeColor || null,
                    seoTitle: parsed.data.seoTitle || null,
                    seoDescription: parsed.data.seoDescription || null,
                },
            });
        }
        else {
            // Update existing settings
            settings = yield client_1.prisma.settings.update({
                where: { id: settings.id },
                data: {
                    themeColor: parsed.data.themeColor,
                    seoTitle: parsed.data.seoTitle,
                    seoDescription: parsed.data.seoDescription,
                },
            });
        }
        res.json({ message: "Settings updated", settings });
    }
    catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ message: "Failed to update settings", error });
    }
    return;
});
exports.updateSettings = updateSettings;
