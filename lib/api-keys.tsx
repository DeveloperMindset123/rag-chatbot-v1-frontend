"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

// Default placeholder API keys for development
const defaultKeys = {
  openai: "sk-placeholder-openai-key",
  claude: "sk-ant-placeholder-claude-key",
  gemini: "AIza-placeholder-gemini-key",
};

type ApiKeys = {
  openai?: string;
  claude?: string;
  gemini?: string;
};

type ApiKeysContextType = {
  keys: ApiKeys;
  setApiKey: (provider: string, key: string) => void;
  getApiKey: (provider: string) => string | undefined;
  clearApiKey: (provider: string) => void;
};

const ApiKeysContext = createContext<ApiKeysContextType | undefined>(undefined);

export function ApiKeysProvider({ children }: { children: React.ReactNode }) {
  const [keys, setKeys] = useState<ApiKeys>(() => {
    // Load from localStorage on initial render
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('api-keys');
      return saved ? JSON.parse(saved) : defaultKeys;
    }
    return defaultKeys;
  });

  useEffect(() => {
    // Save to localStorage whenever keys change
    localStorage.setItem('api-keys', JSON.stringify(keys));
  }, [keys]);

  const setApiKey = (provider: string, key: string) => {
    setKeys(prev => ({
      ...prev,
      [provider]: key
    }));
  };

  const getApiKey = (provider: string) => {
    return keys[provider as keyof ApiKeys];
  };

  const clearApiKey = (provider: string) => {
    setKeys(prev => {
      const newKeys = { ...prev };
      delete newKeys[provider as keyof ApiKeys];
      return newKeys;
    });
  };

  return (
    <ApiKeysContext.Provider value={{ keys, setApiKey, getApiKey, clearApiKey }}>
      {children}
    </ApiKeysContext.Provider>
  );
}

export function useApiKeys() {
  const context = useContext(ApiKeysContext);
  if (context === undefined) {
    throw new Error('useApiKeys must be used within an ApiKeysProvider');
  }
  return context;
}