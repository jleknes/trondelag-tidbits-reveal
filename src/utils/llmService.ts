
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

  const prompt = `Generer ett nytt, fascinerende og faktisk faktum om Nord-Trøndelag fylke i Norge. Dette er eksempler:
* Norges eneste Miss Universe noensinne kommer fra Stjørdal og heter Mona Grudt. Hun gikk til topps i konkurransen og fikk tittelen i 1990.
* Munkeby er navnet på osten som fire franske munker produserer i Munkeby Mariakloster i Munkebygrenda ved Levanger. Osten er laget på upasteurisert kumelk og er ifølge kokken Eivind Hellstrøm er den en av landets aller beste oster.

Returner bare faktumet, ingen ekstra tekst eller forklaring. Det skal være et komplett faktum som startar direkte uten innledning.`;

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
          content: 'Du er en ekspert på Nord-Trøndelag fylke i Norge. Du har god sans for humor og kommer med fakta som oppleves som morsomme for leseren. Svar på bokmål.'
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
