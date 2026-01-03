/**
 * Google Gemini AI Integration
 * 
 * Configuration and helper functions for Google Gemini AI
 */

import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Model configuration
export const GEMINI_MODEL = "gemini-3-pro-preview";

/**
 * Get Gemini model instance
 */
export function getGeminiModel() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }
  return genAI.getGenerativeModel({ model: GEMINI_MODEL });
}

/**
 * Generate text using Gemini AI
 * 
 * @param prompt - The prompt to send to Gemini
 * @param options - Additional options for generation
 * @returns Generated text response
 */
export async function generateText(
  prompt: string,
  options?: {
    temperature?: number;
    maxTokens?: number;
    systemInstruction?: string;
  }
) {
  try {
    const model = getGeminiModel();
    
    const generationConfig = {
      temperature: options?.temperature ?? 0.7,
      maxOutputTokens: options?.maxTokens ?? 2048,
    };

    const systemInstruction = options?.systemInstruction
      ? { systemInstruction: options.systemInstruction }
      : {};

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      ...systemInstruction,
    });

    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Error generating text with Gemini:", error);
    throw new Error(`Gemini AI error: ${error.message || "Unknown error"}`);
  }
}

/**
 * Generate prescription suggestions using Gemini AI
 * 
 * @param symptoms - Patient symptoms
 * @param diagnosis - Doctor's diagnosis
 * @param patientHistory - Patient medical history (optional)
 * @returns AI-generated prescription suggestions
 */
export async function generatePrescriptionSuggestions(
  symptoms: string,
  diagnosis: string,
  patientHistory?: string
) {
  const systemInstruction = `You are a medical AI assistant helping doctors create prescriptions. 
Provide medication suggestions based on symptoms, diagnosis, and patient history.
Always include: medication name, dosage, frequency, and duration.
Consider drug interactions and patient allergies.
Format your response as JSON array of medication objects with: name, dosage, frequency, duration, reason.`;

  const prompt = `Based on the following information, suggest appropriate medications:

Symptoms: ${symptoms}
Diagnosis: ${diagnosis}
${patientHistory ? `Patient History: ${patientHistory}` : ""}

Provide medication suggestions in JSON format:
[
  {
    "name": "Medication Name",
    "dosage": "Dosage",
    "frequency": "Frequency",
    "duration": "Duration",
    "reason": "Reason for prescription"
  }
]`;

  try {
    const response = await generateText(prompt, {
      temperature: 0.3, // Lower temperature for more consistent medical responses
      systemInstruction,
    });

    // Try to parse JSON from response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // Fallback: return structured response
    return [{ name: "AI Suggestion", dosage: "As prescribed", frequency: "As needed", duration: "As directed", reason: response }];
  } catch (error: any) {
    console.error("Error generating prescription suggestions:", error);
    throw error;
  }
}

/**
 * Analyze medical report using Gemini AI
 * 
 * @param reportText - Extracted text from medical report
 * @param reportType - Type of report (lab, imaging, pathology, other)
 * @returns AI analysis of the report
 */
export async function analyzeMedicalReport(
  reportText: string,
  reportType: string
) {
  const systemInstruction = `You are a medical AI assistant analyzing medical reports.
Analyze the report for:
1. Key findings and abnormalities
2. Normal ranges and values
3. Potential concerns or red flags
4. Recommendations for follow-up

Provide a structured analysis in JSON format.`;

  const prompt = `Analyze the following ${reportType} report:

${reportText}

Provide analysis in JSON format:
{
  "summary": "Brief summary",
  "findings": ["Finding 1", "Finding 2"],
  "abnormalities": ["Abnormality 1", "Abnormality 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "confidence": 0.95
}`;

  try {
    const response = await generateText(prompt, {
      temperature: 0.2, // Very low temperature for accurate medical analysis
      systemInstruction,
    });

    // Try to parse JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // Fallback: return basic analysis
    return {
      summary: response,
      findings: [],
      abnormalities: [],
      recommendations: [],
      confidence: 0.8,
    };
  } catch (error: any) {
    console.error("Error analyzing medical report:", error);
    throw error;
  }
}

/**
 * Generate chatbot response using Gemini AI
 * 
 * @param message - User's message
 * @param conversationHistory - Previous messages in the conversation
 * @param userRole - User's role (patient, doctor, admin)
 * @returns AI-generated response
 */
export async function generateChatbotResponse(
  message: string,
  conversationHistory: Array<{ role: string; content: string }> = [],
  userRole: string = "patient"
) {
  const systemInstruction = `You are a medical AI assistant. 
${userRole === "patient" 
  ? "Provide general health information and answer medical questions. Always remind users to consult with their doctor for medical advice."
  : "Provide detailed medical information and assistance to healthcare professionals."
}
Be accurate, helpful, and always emphasize the importance of professional medical consultation for serious concerns.`;

  // Build conversation context
  const conversationContext = conversationHistory
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  const prompt = conversationContext
    ? `${conversationContext}\nuser: ${message}\nassistant:`
    : `user: ${message}\nassistant:`;

  try {
    const response = await generateText(prompt, {
      temperature: 0.7,
      systemInstruction,
    });

    return response;
  } catch (error: any) {
    console.error("Error generating chatbot response:", error);
    throw error;
  }
}

