
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";

interface RequestBody {
  genomicData: string;
  prompt: string;
}

interface GeminiGenerateContentRequest {
  contents: {
    parts: {
      text?: string;
    }[];
  }[];
  generationConfig?: {
    temperature?: number;
    topP?: number;
    topK?: number;
    maxOutputTokens?: number;
  };
}

serve(async (req) => {
  try {
    // CORS headers
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    };

    // Handle OPTIONS request for CORS preflight
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers });
    }

    // Verify API key exists
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "Missing Gemini API key. Please set GEMINI_API_KEY in Edge Function secrets.",
        }),
        { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    // Parse the request body
    const requestData: RequestBody = await req.json();
    const { genomicData, prompt } = requestData;

    if (!genomicData) {
      return new Response(
        JSON.stringify({ error: "Genomic data is required" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    // Create the prompt for Gemini
    const genomicDataSample = genomicData.length > 1000 
      ? `${genomicData.substring(0, 1000)}...` 
      : genomicData;

    const analysisPrompt = `
      You are a genomic analysis assistant. 
      ${prompt || "Analyze the following genomic data and provide insights on health risks, traits, and recommendations."}
      
      Here is a sample of the genomic data: ${genomicDataSample}
    `;

    // Create the request body for Gemini
    const geminiRequestBody: GeminiGenerateContentRequest = {
      contents: [
        {
          parts: [{ text: analysisPrompt }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048
      }
    };

    // Call the Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geminiRequestBody),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      throw new Error(`Gemini API returned ${geminiResponse.status}: ${errorText}`);
    }

    const geminiData = await geminiResponse.json();
    const analysisResults = geminiData.candidates[0]?.content.parts[0]?.text || 
      "No analysis could be generated from the genomic data.";

    // Return the analysis results
    return new Response(
      JSON.stringify({ analysisResults }),
      { headers: { ...headers, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
