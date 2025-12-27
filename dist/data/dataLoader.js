"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryNotes = exports.purchaseOrders = exports.humanCorrections = exports.invoices = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function loadJSON(fileName) {
    const filePath = path_1.default.join(process.cwd(), "data", fileName);
    const raw = fs_1.default.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
}
exports.invoices = loadJSON("invoices.json");
exports.humanCorrections = loadJSON("human_corrections.json");
exports.purchaseOrders = loadJSON("purchase_orders.json");
exports.deliveryNotes = loadJSON("delivery_notes.json");
