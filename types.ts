
export interface Scene {
  sceneNumber: number;
  description: string;
  jsonPrompt: string; // This will be a stringified JSON
}

export interface ScriptData {
  title: string;
  logline: string;
  scenes: Scene[];
}
