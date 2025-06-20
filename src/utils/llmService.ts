
import { getApiKey } from './apiKeyManager';

export interface GeneratedFact {
  text: string;
  id: string;
  timestamp: number;
  source: 'generated';
}

export const generateFact = async (): Promise<GeneratedFact> => {
  const settings = getApiKey();
  if (!settings?.openaiKey) {
    throw new Error('API-nykkel ikkje funne');
  }

  const prompt = `Generer eit nytt, fascinerende og faktisk faktum om Nord-Trøndelag fylke i Noreg. Faktumet skal vere på nynorsk, akkurat som desse eksempla:

- "Nord-Trøndelag har Leka-øya, som inneheld nokre av verdas eldste bergartar frå 3,8 milliardar år tilbake."
- "Regionen er kjend for den tradisjonelle 'lefsa', som har blitt laga her i over 500 år."
- "Steinkjer, regionsenteret, blei fullstendig gjenoppbygd etter andre verdskrig og er kjend som ein av Noregs mest moderne småbyar."

Returner berre faktumet, ingen ekstra tekst eller forklaring. Det skal vere eitt komplett faktum som startar direkte utan innleiing.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${settings.openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Du er ein ekspert på Nord-Trøndelag fylke i Noreg. Skriv alltid på nynorsk.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Feil frå OpenAI: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const generatedText = data.choices?.[0]?.message?.content?.trim();

  if (!generatedText) {
    throw new Error('Ingen faktum vart generert');
  }

  return {
    text: generatedText,
    id: `generated-${Date.now()}`,
    timestamp: Date.now(),
    source: 'generated'
  };
};
