
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const facts = [
    "Nord-Trøndelag har Leka-øya, som inneheld nokre av verdas eldste bergartar frå 3,8 milliardar år tilbake.",
    "Regionen er kjend for den tradisjonelle 'lefsa', som har blitt laga her i over 500 år.",
    "Steinkjer, regionsenteret, blei fullstendig gjenoppbygd etter andre verdskrig og er kjend som ein av Noregs mest moderne småbyar.",
    "Området inneheld delar av trekkruta til over 2 millionar reinsdyr, noko som gjer det til ein av Europas største dyremigrasjonar.",
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
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomFact = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setCurrentFact(facts[randomIndex]);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
            Morosame Fakta om Nord-Trøndelag
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            Oppdag fascinerende fakta om Noregs vakre nordlege region
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Utforsk Underverka i Nord-Trøndelag
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Frå urgamle bergformasjonar til moderne lakseoppdrett - Nord-Trøndelag er ein region 
              rik på historie, kultur og naturskjønheit. Trykk på knappen under for å oppdage 
              fantastiske fakta om denne merkelege delen av Noreg.
            </p>
          </div>

          {/* Interactive Section */}
          <div className="text-center mb-8">
            <Button 
              onClick={getRandomFact}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              Få Tilfeldig Faktum
            </Button>
          </div>

          {/* Fact Display */}
          {currentFact && (
            <Card className={`max-w-3xl mx-auto shadow-xl border-0 transition-all duration-500 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">🇳🇴</span>
                  </div>
                  <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium">
                    {currentFact}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          {!currentFact && (
            <div className="text-center mt-12">
              <div className="bg-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                  Klar for å Lære Noko Nytt?
                </h3>
                <p className="text-blue-700">
                  Trykk på knappen over for å byrje å utforske fascinerende fakta om Nord-Trøndelag, 
                  ein av Noregs mest interessante regionar!
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-200">
            Feirar den rike arven og naturskjønheita til Nord-Trøndelag, Noreg
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
