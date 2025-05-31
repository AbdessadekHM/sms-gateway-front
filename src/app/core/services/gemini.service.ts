import { Injectable } from '@angular/core';
import { GoogleGenAI } from "@google/genai";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {


  ai = new GoogleGenAI({apiKey: environment.apiKey});
    
  constructor() { 

  }


  async  generate(prompt: string): Promise<string| undefined> {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Generate a concise and clear SMS message based on the following prompt: " + prompt + ". The message should be suitable for sending via SMS and should not exceed 160 characters, don't include any external links or references.",
    });
    console.log(response.text);
    return response.text;
  }


}
