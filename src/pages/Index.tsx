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
    "Nord-Trøndelag har Leka-øya, som inneheld nokre av verdas eldste bergartar frå 3,8 milliardar år tilbake.",
    "Regionen er kjend for den tradisjonelle 'lefsa', som har blitt laga her i over 500 år.",
    "Steinkjer, regionsenteret, blei fullstendig gjenoppbygd etter andre verdskrig og er kjend som ein av Noregs mest moderne småbyar.",
    "Området innehald delar av trekkruta til over 2 millionar reinsdyr, noko som gjer det til ein av Europas største dyremigrasjonar.",
    "Nord-Trøndelag har fleire helleristningar frå steinalderen enn noko anna norsk fylke, med over 5000 dokumenterte lokalitetar.",
    "Regionen produserer om lag 25% av Noregs totale lakseoppdrett, noko som gjer den avgjerande for landets sjømatindustri.",
    "Snåsa kommune har verdas djupaste isfrie vatn nord for polarsirkelen - Snåsavatnet.",
    "Området har den høgste konsentrasjonen av gravhaugar frå jernalder i heile Skandinavia.",
    "Skogane i Nord-Trøndelag produserte tømmer som historisk blei brukt til å byggje skip for den norske marinen.",
    "Regionen opplever midnattssol-fenomenet, med kontinuerleg dagslys i om lag 2 månader om sommaren.",
    "Tradisjonelle 'gamme' jordhus kan framleis finnast her, som representerer gamle samiske byggeteknikkar.",
    "Fylket har over 40 000 innsjøar, noko som gjer det til eit paradis for ferskvassfiske-entusiastar.",
    "Levanger er kjend for sitt årlege 'Levanger Marked', som har blitt halden kontinuerleg sidan 1653.",
    "Regionens dialekt blir rekna som ein av dei mest særeigne i Noreg, med unike uttaleformer.",
    "Nord-Trøndelag har den største populasjonen av kongeørn i Noreg, med over 200 hekkande par."
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
        description: "Eit spennande nytt faktum om Nord-Trøndelag",
      });
    } catch (error) {
      toast({
        title: "Feil ved generering",
        description: error instanceof Error ? error.message : "Noko gjekk gale",
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
        description: "AI-generert faktum kopiert til utklippstavla",
      });
    } else if (currentFact && currentFactIndex !== -1) {
      const shareUrl = `${window.location.origin}/fact/${currentFactIndex}`;
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Kopiert!",
        description: "Lenke kopiert til utklippstavla",
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
                  Innstillingar
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
                  Morosame Fakta om Nord-Trøndelag
                </h1>
                <p className="text-emerald-100 text-lg md:text-xl max-w-2xl drop-shadow-md">
                  Oppdag fascinerende fakta om Noregs vakre nordlege region
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="text-center mb-12">
              <div className="bg-white/75 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-200/50">
                <h2 className="text-2xl md:text-3xl font-semibold text-emerald-800 mb-4">
                  Utforsk Underverka i Nord-Trøndelag
                </h2>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
                  Frå urgamle bergformasjonar til moderne lakseoppdrett - Nord-Trøndelag er ein region 
                  rik på historie, kultur og naturskjønheit. Trykk på knappen under for å oppdage 
                  fantastiske fakta om denne merkelege delen av Noreg.
                </p>
                <Link to="/facts">
                  <Button variant="outline" className="mb-4">
                    Sjå alle fakta
                  </Button>
                </Link>
              </div>
            </div>

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
                      Del dette faktumet
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
                    Klar for å Lære Noko Nytt?
                  </h3>
                  <p className="text-emerald-700">
                    Trykk på knappen over for å byrje å utforske fascinerende fakta om Nord-Trøndelag, 
                    ein av Noregs mest interessante regionar!
                  </p>
                </div>
              </div>
            )}
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

export default Index;
