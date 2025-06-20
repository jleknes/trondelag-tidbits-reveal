
export interface ApiKeySettings {
  openaiKey?: string;
  provider: 'openai';
}

const STORAGE_KEY = 'nord-trondelag-settings';

export const saveApiKey = (settings: ApiKeySettings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const getApiKey = (): ApiKeySettings | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const hasApiKey = (): boolean => {
  const settings = getApiKey();
  return !!(settings?.openaiKey?.trim());
};

export const clearApiKey = () => {
  localStorage.removeItem(STORAGE_KEY);
};
