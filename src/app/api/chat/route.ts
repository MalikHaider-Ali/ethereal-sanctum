import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "http://localhost:5678/webhook/ethereal-chatbot";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const n8nRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!n8nRes.ok) {
      const text = await n8nRes.text();
      console.error("n8n error:", n8nRes.status, text);
      return NextResponse.json(
        { error: `n8n returned ${n8nRes.status}: ${text}` },
        { status: 502 }
      );
    }

    const raw = await n8nRes.text();
    console.log("n8n raw response:", raw);

    if (!raw || raw.trim() === "") {
      return NextResponse.json(
        { error: "n8n returned empty response" },
        { status: 502 }
      );
    }

    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: `n8n returned non-JSON: ${raw.slice(0, 200)}` },
        { status: 502 }
      );
    }

    // Handle all possible n8n response shapes:
    // 1. { reply: "..." }                        — our Respond to Webhook format
    // 2. { output: "..." }                       — AI Agent direct output
    // 3. [{ output: "..." }]                     — array from "When Last Node Finishes"
    // 4. [{ json: { output: "..." } }]           — n8n wrapped array format
    let reply: string | undefined;

    if (typeof data === "string") {
      reply = data;
    } else if (Array.isArray(data)) {
      const first = data[0];
      reply =
        first?.reply ||
        first?.output ||
        first?.text ||
        first?.json?.reply ||
        first?.json?.output ||
        first?.json?.text ||
        first?.message;
    } else if (typeof data === "object") {
      reply =
        data.reply ||
        data.output ||
        data.text ||
        data.message ||
        data.response;
    }

    if (!reply) {
      console.error("Could not extract reply from:", JSON.stringify(data));
      return NextResponse.json(
        { error: `Unexpected response shape: ${JSON.stringify(data).slice(0, 300)}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply, sessionId: body.sessionId });
  } catch (err: any) {
    console.error("Proxy error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}