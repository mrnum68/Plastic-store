import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

interface Lead {
    id: string;
    phone: string;
    items: string;
    material: string;
    total: string;
    note: string;
    createdAt: string;
    status: "new" | "contacted" | "done";
}

function ensureDataFile(): Lead[] {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    } catch {
        return [];
    }
}

function saveLeads(leads: Lead[]) {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

// GET: Retrieve all leads
export async function GET() {
    const leads = ensureDataFile();
    return NextResponse.json(leads);
}

// POST: Add a new lead
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { phone, items, material, total, note } = body;

        if (!phone || phone.length < 9) {
            return NextResponse.json({ error: "Số điện thoại không hợp lệ" }, { status: 400 });
        }

        const leads = ensureDataFile();
        const newLead: Lead = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            phone,
            items: items || "",
            material: material || "",
            total: total || "",
            note: note || "",
            createdAt: new Date().toISOString(),
            status: "new",
        };

        leads.unshift(newLead); // newest first
        saveLeads(leads);

        return NextResponse.json({ status: "ok", id: newLead.id });
    } catch (err) {
        return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
    }
}

// PATCH: Update lead status
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !["new", "contacted", "done"].includes(status)) {
            return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
        }

        const leads = ensureDataFile();
        const lead = leads.find(l => l.id === id);
        if (!lead) {
            return NextResponse.json({ error: "Không tìm thấy lead" }, { status: 404 });
        }

        lead.status = status;
        saveLeads(leads);

        return NextResponse.json({ status: "ok" });
    } catch {
        return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
    }
}

// DELETE: Remove a lead
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Thiếu ID" }, { status: 400 });
        }

        let leads = ensureDataFile();
        leads = leads.filter(l => l.id !== id);
        saveLeads(leads);

        return NextResponse.json({ status: "ok" });
    } catch {
        return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
    }
}
