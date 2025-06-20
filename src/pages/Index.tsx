
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Share2, Settings, Sparkles, Loader2 } from "lucide-react";
import { hasApiKey } from "@/utils/apiKeyManager";
import { generateFact, GeneratedFact } from "@/utils/llmService";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const facts = [
    "Nord-Trøndelag har Leka-øya, som inneholder noen av verdens eldste bergarter fra 3,8 milliarder år tilbake.",
    "Regionen er kjent for den tradisjonelle 'lefsa', som har blitt laget her i over 500 år.",
    "Steinkjer, regionsenteret, ble fullstendig gjenoppbygd etter andre verdenskrig og er kjent som en av Norges mest moderne småbyer.",
    "Området inneholder deler av trekkreuten til over 2 millioner reinsdyr, noe som gjør det til en av Europas største dyremigrasjonar.",
    "Nord-Trøndelag har flere helleristninger fra steinalderen enn noe annet norsk fylke, med over 5000 dokumenterte lokaliteter.",
    "Regionen produserer omtrent 25% av Norges totale lakseoppdrett, noe som gjør den avgjørende for landets sjømatindustri.",
    "Snåsa kommune har verdens dypeste isfrie vann nord for polarsirkelen - Snåsavatnet.",
    "Området har den høyeste konsentrasjonen av gravhauger fra jernalder i hele Skandinavia.",
    "Skogene i Nord-Trøndelag produserte tømmer som historisk ble brukt til å bygge skip for den norske marinen.",
    "Regionen opplever midnattssol-fenomenet, med kontinuerlig dagslys i omtrent 2 måneder om sommeren.",
    "Tradisjonelle 'gamme' jordhus kan fortsatt finnes her, som representerer gamle samiske byggeteknikker.",
    "Fylket har over 40 000 innsjøer, noe som gjør det til et paradis for ferskvannsangling-entusiaster.",
    "Levanger er kjent for sitt årlige 'Levanger Marked', som har blitt holdt kontinuerlig siden 1653.",
    "Regionens dialekt blir regnet som en av de mest særegne i Norge, med unike uttaleformer.",
    "Nord-Trøndelag har den største populasjonen av kongeørn i Norge, med over 200 hekkende par."
  ];

  const [currentFact, setCurrentFact] = useState("");
  const [currentFactIndex, setCurrentFactIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [generatedFact, setGeneratedFact] = useState<GeneratedFact | null>(null);

  const getRandomFact = () => {
    setIsAnimating(true);
    setGeneratedFact(null);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setCurrentFact(facts[randomIndex]);
      setCurrentFactIndex(randomIndex);
      setIsAnimating(false);
    }, 200);
  };

  const generateAIFact = async () => {
    if (!hasApiKey()) {
      navigate('/settings');
      return;
    }

    setIsGeneratingAI(true);
    setIsAnimating(true);
    setCurrentFact("");
    setCurrentFactIndex(-1);

    try {
      const newFact = await generateFact();
      setGeneratedFact(newFact);
      setCurrentFact(newFact.text);
      toast({
        title: "Nytt AI-faktum generert!",
        description: "Et spennende nytt faktum om Nord-Trøndelag",
      });
    } catch (error) {
      toast({
        title: "Feil ved generering",
        description: error instanceof Error ? error.message : "Noe gikk galt",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAI(false);
      setIsAnimating(false);
    }
  };

  const shareFact = () => {
    if (generatedFact) {
      // For generated facts, we'll copy the text directly since they don't have permanent URLs yet
      navigator.clipboard.writeText(`${generatedFact.text}\n\n- Generert av AI om Nord-Trøndelag`);
      toast({
        title: "Kopiert!",
        description: "AI-generert faktum kopiert til utklippstavlen",
      });
    } else if (currentFact && currentFactIndex !== -1) {
      const shareUrl = `${window.location.origin}/fact/${currentFactIndex}`;
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Kopiert!",
        description: "Lenke kopiert til utklippstavlen",
      });
    }
  };

  const displayedFact = currentFact || "";
  const isAIFact = !!generatedFact;

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Increased opacity */}
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
            <div className="flex justify-end mb-4">
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Settings className="w-4 h-4 mr-2" />
                  Innstillinger
                </Button>
              </Link>
            </div>
            {/* Header content */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Coat of Arms */}
              <div className="flex-shrink-0">
                <img 
                  src="/lovable-uploads/b3fb0450-fff9-4190-b440-e6148864600d.png" 
                  alt="Nord-Trøndelag våpenskjold" 
                  className="w-20 h-24 md:w-24 md:h-28 object-contain filter drop-shadow-lg"
                />
              </div>
              
              {/* Title and Description */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight drop-shadow-lg">
                  Morsomme Fakta om Nord-Trøndelag
                </h1>
                <p className="text-emerald-100 text-lg md:text-xl max-w-2xl drop-shadow-md">
                  Oppdag fascinerende fakta om Norges vakre nordlige region
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Interactive Section */}
            <div className="text-center mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={getRandomFact}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3 px-8 text-lg rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                  size="lg"
                >
                  Få Tilfeldig Faktum
                </Button>
                
                <Button 
                  onClick={generateAIFact}
                  disabled={isGeneratingAI}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 text-lg rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                  size="lg"
                >
                  {isGeneratingAI ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Genererer...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generer AI-Faktum
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Fact Display */}
            {displayedFact && (
              <Card className={`max-w-3xl mx-auto shadow-2xl border-0 transition-all duration-500 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'} bg-white/85 backdrop-blur-md border-emerald-200/50`}>
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-2xl">{isAIFact ? "🤖" : "🇳🇴"}</span>
                    </div>
                    <p className="text-emerald-800 text-lg md:text-xl leading-relaxed font-medium mb-4">
                      {displayedFact}
                    </p>
                    {isAIFact && (
                      <p className="text-sm text-purple-600 mb-4 font-medium">
                        ✨ Generert av AI
                      </p>
                    )}
                    <Button 
                      onClick={shareFact}
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2 mx-auto"
                    >
                      <Share2 size={16} />
                      {isAIFact ? "Kopier faktum til utklippstavlen" : "Del dette faktumet"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Call to Action */}
            {!currentFact && (
              <div className="text-center mt-12">
                <div className="bg-emerald-50/85 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-xl border border-emerald-200/50">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                    Klar for å Lære Noe Nytt?
                  </h3>
                  <p className="text-emerald-700">
                    Trykk på knappen over for å begynne å utforske fascinerende fakta om Nord-Trøndelag, 
                    en av Norges mest interessante regioner!
                  </p>
                </div>
              </div>
            )}

            {/* Introduction - moved below call to action */}
            <div className="text-center mt-12">
              <div className="bg-white/75 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-200/50">
                <h2 className="text-2xl md:text-3xl font-semibold text-emerald-800 mb-4">
                  Utforsk Underverkene i Nord-Trøndelag
                </h2>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
                  Fra urgamle bergformasjoner til moderne lakseoppdrett - Nord-Trøndelag er en region 
                  rik på historie, kultur og naturskjønnhet.
                </p>
                <Link to="/facts">
                  <Button variant="outline" className="mb-4">
                    Se alle fakta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-emerald-800/90 to-blue-800/90 text-white py-8 mt-16 backdrop-blur-sm shadow-2xl">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center gap-4">
              <p className="text-emerald-100 drop-shadow-md">
                Feirer den rike arven og naturskjønnheten til Nord-Trøndelag, Norge
              </p>
              <div className="flex items-center gap-3">
                <span className="text-emerald-100 text-sm">Promptet av</span>
                <img 
                  src="/lovable-uploads/fc9c17c4-e1c1-437a-9f5f-5ed45071cd75.png" 
                  alt="Kantega logo" 
                  className="h-6 object-contain"
                />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
