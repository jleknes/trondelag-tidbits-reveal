
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2 } from "lucide-react";

const Facts = () => {
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

  const shareFact = (factIndex: number) => {
    const shareUrl = `${window.location.origin}/fact/${factIndex}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Lenke kopiert til utklippstavlen!');
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
                Alle Fakta om Nord-Trøndelag
              </h1>
              <p className="text-emerald-100 text-lg md:text-xl drop-shadow-md">
                Utforsk alle våre fascinerende fakta om regionen
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {facts.map((fact, index) => (
                <Card key={index} className="bg-white/85 backdrop-blur-md border-emerald-200/50 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-emerald-800 text-lg leading-relaxed">{fact}</p>
                      </div>
                      <Button 
                        onClick={() => shareFact(index)}
                        variant="ghost" 
                        size="sm"
                        className="flex-shrink-0"
                      >
                        <Share2 size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-emerald-800/90 to-blue-800/90 text-white py-8 mt-16 backdrop-blur-sm shadow-2xl">
          <div className="container mx-auto px-4 text-center">
            <p className="text-emerald-100 drop-shadow-md">
              Feirer den rike arven og naturskjønnheten til Nord-Trøndelag, Norge
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Facts;
