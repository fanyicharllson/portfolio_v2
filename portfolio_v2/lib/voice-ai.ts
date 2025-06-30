/* eslint-disable @typescript-eslint/no-unused-vars */
// Voice AI utility functions for external API integration

export interface VoiceAIConfig {
  openaiApiKey?: string;
  elevenLabsApiKey?: string;
  azureSpeechKey?: string;
  azureSpeechRegion?: string;
}

export class VoiceAIService {
  private config: VoiceAIConfig;

  constructor(config: VoiceAIConfig) {
    this.config = config;
  }

  // Process text with OpenAI GPT for intelligent responses
  async processWithOpenAI(
    input: string,
    context = "portfolio"
  ): Promise<string> {
    if (!this.config.openaiApiKey) {
      throw new Error("OpenAI API key not configured");
    }

    const systemPrompt = `You are Charllson's AI portfolio assistant. You help visitors navigate and learn about Fanyi Charllson Fanyi portfolio. 

Key information about Charllson:
- Full-stack developer with 3+ years experience
- Specializes in React, Next.js, TypeScript, Python
- Has worked on e-commerce platforms, AI applications, mobile apps
- Currently available for new opportunities
- Based in Cameroon
- Contact: fanyicharllson@gmail.com

Respond conversationally and helpfully. Keep responses concise (1-2 sentences). If asked to navigate, mention the section name.`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.config.openaiApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: input },
            ],
            max_tokens: 150,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      return (
        data.choices[0]?.message?.content ||
        "I'm sorry, I couldn't process that request."
      );
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw new Error("Failed to process with AI");
    }
  }

  // Convert text to speech using ElevenLabs (high quality)
  async textToSpeechElevenLabs(
    text: string,
    voiceId = "21m00Tcm4TlvDq8ikWAM"
  ): Promise<ArrayBuffer> {
    if (!this.config.elevenLabsApiKey) {
      throw new Error("ElevenLabs API key not configured");
    }

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            Accept: "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": this.config.elevenLabsApiKey,
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("ElevenLabs API request failed");
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error("ElevenLabs API error:", error);
      throw new Error("Failed to generate speech");
    }
  }

  // Convert speech to text using Azure Speech Services
  async speechToTextAzure(audioBlob: Blob): Promise<string> {
    if (!this.config.azureSpeechKey || !this.config.azureSpeechRegion) {
      throw new Error("Azure Speech credentials not configured");
    }

    try {
      const response = await fetch(
        `https://${this.config.azureSpeechRegion}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`,
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": this.config.azureSpeechKey,
            "Content-Type": "audio/wav",
          },
          body: audioBlob,
        }
      );

      const data = await response.json();
      return data.DisplayText || "";
    } catch (error) {
      console.error("Azure Speech API error:", error);
      throw new Error("Failed to convert speech to text");
    }
  }

  // Fallback to browser Web Speech API
  async processWithWebSpeechAPI(input: string): Promise<string> {
    // This is the fallback method we implemented in the component
    // It provides basic command processing without external APIs
    return this.processBasicCommands(input);
  }

  private processBasicCommands(input: string): string {
    const lowerInput = input.toLowerCase();

    const responses = {
      greeting:
        "Hello! I'm Charllson's AI assistant. I can help you explore the portfolio and answer questions about Charllson's work and skills.",
      projects:
        "Charllson has created amazing projects including e-commerce platforms, AI applications, and mobile apps. Each project showcases different technical skills and problem-solving approaches.",
      skills:
        "Charllson is highly skilled in modern web technologies like React, Next.js, TypeScript, and Python. The skills section shows detailed proficiency levels for each technology.",
      contact:
        "You can reach Charllson through the contact form, email at hello@example.com, or connect on LinkedIn. Charllson is currently available for exciting new opportunities!",
      experience:
        "Charllson brings over 3 years of professional full-stack development experience, having worked with various companies and cutting-edge technologies.",
      about:
        "Charllson Kyaw Kyaw Aung is a passionate full-stack developer from Myanmar, specializing in creating innovative digital solutions with modern technologies.",
    };

    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return responses.greeting;
    }
    if (lowerInput.includes("project") || lowerInput.includes("work")) {
      return responses.projects;
    }
    if (lowerInput.includes("skill") || lowerInput.includes("technology")) {
      return responses.skills;
    }
    if (lowerInput.includes("contact") || lowerInput.includes("hire")) {
      return responses.contact;
    }
    if (
      lowerInput.includes("experience") ||
      lowerInput.includes("background")
    ) {
      return responses.experience;
    }
    if (lowerInput.includes("about")) {
      return responses.about;
    }

    return `I heard you say: "${input}". I can help you learn about Charllson's projects, skills, experience, or contact information. What would you like to know?`;
  }
}

// Utility function to create service instance
export function createVoiceAIService(): VoiceAIService {
  return new VoiceAIService({
    openaiApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    elevenLabsApiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
    azureSpeechKey: process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY,
    azureSpeechRegion: process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION,
  });
}
