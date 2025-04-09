
import { supabase } from '@/integrations/supabase/client';

/**
 * Analyzes genomic data using Gemini 2.0 Flash
 * Uses Supabase Edge Functions to secure API key access
 */
export async function analyzeGenomicData(genomicData: string, queryPrompt?: string): Promise<string> {
  try {
    // Call the Supabase Edge Function that will use the Gemini API
    const { data, error } = await supabase.functions.invoke('gemini-analyze', {
      body: {
        genomicData,
        prompt: queryPrompt || "Analyze this genomic data and provide insights on health risks, traits, and recommendations.",
      }
    });
    
    if (error) {
      console.error("Error calling Gemini API via Supabase:", error);
      throw new Error(`Failed to analyze genomic data: ${error.message}`);
    }

    return data.analysisResults;
  } catch (error) {
    console.error("Error in analyzeGenomicData:", error);
    if (error instanceof Error) {
      return `Error analyzing genomic data: ${error.message}`;
    }
    return "An unknown error occurred during genomic analysis";
  }
}

/**
 * Direct API access method - Only for development! 
 * For production, use the Supabase Edge Function
 */
export async function _devDirectGeminiAnalysis(genomicData: string, apiKey: string): Promise<string> {
  try {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are a genomic analysis assistant. Analyze the following genomic data and provide insights: ${genomicData.substring(0, 1000)}...`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048
      }
    };

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.candidates[0]?.content.parts[0]?.text || 
      "No analysis could be generated from the genomic data.";
    
    return analysisText;
  } catch (error) {
    console.error("Error in direct Gemini analysis:", error);
    throw error;
  }
}
