"use client";

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

type ApiKeysStore = {
  keys: {
    openai?: string;
    claude?: string;
    gemini?: string;
  };
  setApiKey: (provider: string, key: string) => void;
  getApiKey: (provider: string) => string | undefined;
  clearApiKey: (provider: string) => void;
};

// Default placeholder API keys for development
const defaultKeys = {
  openai: "sk-placeholder-openai-key",
  claude: "sk-ant-placeholder-claude-key",
  gemini: "AIza-placeholder-gemini-key",
};

// export const useApiKeys = create<ApiKeysStore>()(
//   persist(
//     (set, get) => ({
//       keys: defaultKeys,
//       setApiKey: (provider, key) => {
//         set((state) => ({
//           keys: {
//             ...state.keys,
//             [provider]: key,
//           },
//         }));
//       },
//       getApiKey: (provider) => {
//         return get().keys[provider as keyof ApiKeysStore['keys']];
//       },
//       clearApiKey: (provider) => {
//         set((state) => {
//           const newKeys = { ...state.keys };
//           delete newKeys[provider as keyof typeof newKeys];
//           return { keys: newKeys };
//         });
//       },
//     }),
//     {
//       name: "api-keys-storage",
//     }
//   )
// );
