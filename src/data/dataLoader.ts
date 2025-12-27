import fs from "fs";
import path from "path";

function loadJSON<T>(fileName: string): T {
  const filePath = path.join(process.cwd(), "data", fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export const invoices = loadJSON<any[]>("invoices.json");
export const humanCorrections = loadJSON<any[]>("human_corrections.json");
export const purchaseOrders = loadJSON<any[]>("purchase_orders.json");
export const deliveryNotes = loadJSON<any[]>("delivery_notes.json");
