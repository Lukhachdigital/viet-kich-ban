import { GoogleGenAI, Type } from "@google/genai";
import type { ScriptData } from '../types';

export const generateScriptAndPrompts = async (idea: string, durationInMinutes: number, style: string): Promise<ScriptData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const numberOfScenes = Math.ceil((durationInMinutes * 60) / 8);

  const systemInstruction = `Bạn là một đạo diễn hình ảnh và nhà biên kịch AI chuyên nghiệp.
Nhiệm vụ của bạn là dựa vào ý tưởng của người dùng để viết một kịch bản video chi tiết và tạo ra các prompt kỹ thuật cho AI tạo video.
Bạn PHẢI trả lời bằng một đối tượng JSON hợp lệ duy nhất tuân thủ schema được cung cấp.

QUY TẮC CỰC KỲ QUAN TRỌNG:
1.  Kịch bản phải theo phong cách giả thuyết, liên tục đặt câu hỏi và trả lời bằng hình ảnh. (Mô tả cảnh viết bằng tiếng Việt).
2.  Mỗi cảnh tương ứng với một video dài 8 giây. TUYỆT ĐỐI tuân thủ số lượng cảnh được yêu cầu trong prompt của người dùng. Mảng 'scenes' phải có chính xác số lượng phần tử đó.
3.  Giá trị cho trường 'jsonPrompt' PHẢI là một chuỗi JSON (stringified JSON) hợp lệ và toàn bộ nội dung trong chuỗi JSON đó PHẢI ĐƯỢC VIẾT BẰNG TIẾNG ANH.
4.  Chuỗi JSON trong 'jsonPrompt' phải chứa một đối tượng có các khóa sau:
    - "prompt": (string) Mô tả chi tiết, sống động về hình ảnh của cảnh bằng tiếng Anh. Tập trung vào hành động, nhân vật, môi trường.
    - "style": (string) Các từ khóa mô tả phong cách hình ảnh (ví dụ: "cinematic, hyperrealistic, dramatic, 8k, high detail").
    - "camera_angle": (string) Mô tả góc máy (ví dụ: "medium shot, slightly low angle, aerial view").
    - "lighting": (string) Mô tả ánh sáng (ví dụ: "chiaroscuro, candlelight, moody, soft natural light").
    - "mood": (string) Mô tả tâm trạng, không khí của cảnh (ví dụ: "contemplative, isolated, mysterious, hopeful").
    - "negative_prompt": (string) "text, words, dialogue, speech bubbles, letters, watermark, signature".
5.  Prompt tiếng Anh phải thật chi tiết để AI tạo video cho ra kết quả tốt nhất. TUYỆT ĐỐI không có lời thoại, không chữ viết.`;
  
  const userPrompt = `
Ý tưởng chính: "${idea}"
Thời lượng video mong muốn: ${durationInMinutes} phút.
Số lượng cảnh cần tạo (mỗi cảnh 8 giây): ${numberOfScenes} cảnh.
Phong cách video tổng thể: ${style}.

Hãy tạo kịch bản và các prompt JSON chi tiết bằng tiếng Anh tương ứng theo cấu trúc đã chỉ định.
`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "Một tiêu đề sáng tạo và hấp dẫn cho kịch bản video."
      },
      logline: {
        type: Type.STRING,
        description: "Tóm tắt toàn bộ ý tưởng video trong một câu."
      },
      scenes: {
        type: Type.ARRAY,
        description: "Một mảng các cảnh tạo nên video.",
        items: {
          type: Type.OBJECT,
          properties: {
            sceneNumber: {
              type: Type.INTEGER,
              description: "Số thứ tự của cảnh, bắt đầu từ 1."
            },
            description: {
              type: Type.STRING,
              description: "Mô tả hình ảnh chi tiết về nội dung, hành động của cảnh và câu hỏi giả thuyết mà nó khám phá. Viết bằng tiếng Việt."
            },
            jsonPrompt: {
              type: Type.STRING,
              description: "Một chuỗi CHỈ chứa một đối tượng JSON hợp lệ ĐƯỢC VIẾT BẰNG TIẾNG ANH. Đối tượng JSON này là prompt chi tiết cho công cụ tạo video 'Flow VEO 3.1'. Nó phải mô tả cảnh một cách trực quan, TUYỆT ĐỐI KHÔNG chứa hội thoại hoặc văn bản. Cấu trúc của JSON bên trong phải có các khóa sau: 'prompt', 'style', 'camera_angle', 'lighting', 'mood', 'negative_prompt'. Không được bao bọc chuỗi JSON trong markdown."
            }
          },
          required: ['sceneNumber', 'description', 'jsonPrompt']
        }
      }
    },
    required: ['title', 'logline', 'scenes']
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    // Basic validation
    if (!parsedJson.title || !parsedJson.scenes || !Array.isArray(parsedJson.scenes)) {
      throw new Error("Cấu trúc phản hồi từ API không hợp lệ.");
    }
    
    return parsedJson as ScriptData;

  } catch (e: any) {
    console.error("Lỗi khi gọi Gemini API hoặc phân tích JSON:", e);
    const errorMessage = e.message || "Đã xảy ra lỗi không xác định.";
    throw new Error(`Lỗi từ Gemini API: ${errorMessage}`);
  }
};
