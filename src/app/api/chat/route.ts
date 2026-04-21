import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "http://localhost:5678/webhook/ethereal-chatbot";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Log the request for debugging (remove in production)
    console.log("Chatbot request received:", {
      hasMessage: !!body.message,
      sessionId: body.sessionId,
      webhookUrl: N8N_WEBHOOK_URL,
    });

    // Check if webhook URL is valid (not localhost on Vercel)
    if (N8N_WEBHOOK_URL.includes("localhost") && process.env.VERCEL === "1") {
      console.error("WARNING: N8N_WEBHOOK_URL is set to localhost on Vercel!");
      return NextResponse.json(
        { error: "Chatbot service is not configured properly. Please check environment variables." },
        { status: 500 }
      );
    }

    const n8nRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!n8nRes.ok) {
      const text = await n8nRes.text();
      console.error("n8n error:", n8nRes.status, text);
      return NextResponse.json(
        { error: `Chatbot service returned ${n8nRes.status}: ${text.slice(0, 200)}` },
        { status: 502 }
      );
    }

    const raw = await n8nRes.text();
    console.log("n8n raw response received, length:", raw.length);

    if (!raw || raw.trim() === "") {
      return NextResponse.json(
        { error: "Chatbot service returned empty response" },
        { status: 502 }
      );
    }

    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("Non-JSON response from n8n:", raw.slice(0, 500));
      return NextResponse.json(
        { error: `Chatbot service returned invalid response format` },
        { status: 502 }
      );
    }

    // Handle all possible n8n response shapes:
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
      console.error("Could not extract reply from response:", JSON.stringify(data).slice(0, 500));
      return NextResponse.json(
        { error: "Chatbot service returned unexpected response format" },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply, sessionId: body.sessionId });
  } catch (err: any) {
    console.error("Chatbot proxy error:", err.message);
    
    // Check for timeout errors
    if (err.name === "TimeoutError" || err.message?.includes("timeout")) {
      return NextResponse.json(
        { error: "Chatbot service is taking too long to respond. Please try again." },
        { status: 504 }
      );
    }
    
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}