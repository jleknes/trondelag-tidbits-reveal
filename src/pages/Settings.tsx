
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import { saveApiKey, getApiKey } from "@/utils/apiKeyManager";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [apiKey, setApiKey] = useState(getApiKey()?.openaiKey || '');
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Feil",
        description: "API-nykkel kan ikkje vere tom",
        variant: "destructive",
      });
      return;
    }

    saveApiKey({
      openaiKey: apiKey.trim(),
      provider: 'openai'
    });

    toast({
      title: "Lagra!",
      description: "API-nykkel er lagra trygt i nettlesaren din",
    });
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/82a0881f-8b4e-4b97-9c90-9e44a821c090.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(1px)',
          opacity: 0.6
        }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-emerald-50/80 via-blue-50/70 to-green-50/80">
        {/* Header */}
        <header className="bg-gradient-to-r from-emerald-700/90 to-blue-700/90 text-white shadow-xl backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Tilbake
                </Button>
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight drop-shadow-lg">
                Innstillingar
              </h1>
              <p className="text-emerald-100 text-lg md:text-xl drop-shadow-md">
                Konfigurer AI-integrasjon for å generere nye fakta
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/85 backdrop-blur-md border-emerald-200/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-emerald-800 text-2xl">OpenAI API-nykkel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="apiKey" className="text-sm font-medium text-emerald-700">
                    API-nykkel
                  </label>
                  <div className="relative">
                    <Input
                      id="apiKey"
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowKey(!showKey)}
                    >
                      {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>

                <div className="bg-emerald-50/80 p-4 rounded-lg border border-emerald-200">
                  <h3 className="font-medium text-emerald-800 mb-2">Korleis få API-nykkel:</h3>
                  <ol className="text-sm text-emerald-700 space-y-1 list-decimal list-inside">
                    <li>Gå til <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI API Keys</a></li>
                    <li>Logg inn eller opprett konto</li>
                    <li>Klikk "Create new secret key"</li>
                    <li>Kopier nykkelen og lim den inn her</li>
                  </ol>
                  <p className="text-xs text-emerald-600 mt-2">
                    Nykkelen blir lagra trygt i nettlesaren din og vert aldri sendt til våre serverar.
                  </p>
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Lagre API-nykkel
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-emerald-800/90 to-blue-800/90 text-white py-8 mt-16 backdrop-blur-sm shadow-2xl">
          <div className="container mx-auto px-4 text-center">
            <p className="text-emerald-100 drop-shadow-md">
              Feirar den rike arven og naturskjønheita til Nord-Trøndelag, Noreg
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Settings;
