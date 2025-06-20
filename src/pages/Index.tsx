
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const facts = [
    "Nord-Trøndelag is home to the Leka Island, which contains some of the world's oldest rocks, dating back 3.8 billion years.",
    "The region is famous for its traditional 'lefse' flatbread, which has been made here for over 500 years.",
    "Steinkjer, the regional center, was completely rebuilt after WWII and is known as one of Norway's most modern small cities.",
    "The area contains part of the migration route for over 2 million reindeer, making it one of Europe's largest wildlife migrations.",
    "Nord-Trøndelag has more Stone Age rock carvings (petroglyphs) than any other Norwegian county, with over 5,000 documented sites.",
    "The region produces about 25% of Norway's total salmon farming output, making it crucial for the country's seafood industry.",
    "Snåsa municipality is home to the world's deepest ice-free lake north of the Arctic Circle - Lake Snåsavatnet.",
    "The area has the highest concentration of burial mounds from the Iron Age in all of Scandinavia.",
    "Nord-Trøndelag's forests produce timber that was historically used to build ships for the Norwegian Navy.",
    "The region experiences the midnight sun phenomenon, with continuous daylight for about 2 months in summer.",
    "Traditional 'gamme' earth houses can still be found here, representing ancient Sami building techniques.",
    "The county has over 40,000 lakes, making it a paradise for freshwater fishing enthusiasts.",
    "Levanger is famous for its annual 'Levanger Market,' which has been held continuously since 1653.",
    "The region's dialect is considered one of the most distinctive in Norway, with unique pronunciation patterns.",
    "Nord-Trøndelag has the largest population of golden eagles in Norway, with over 200 breeding pairs."
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
            Nord-Trøndelag Fun Facts
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            Discover fascinating facts about Norway's beautiful northern region
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Explore the Wonders of Nord-Trøndelag
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              From ancient rock formations to modern salmon farms, Nord-Trøndelag is a region 
              rich in history, culture, and natural beauty. Click the button below to discover 
              amazing facts about this remarkable part of Norway.
            </p>
          </div>

          {/* Interactive Section */}
          <div className="text-center mb-8">
            <Button 
              onClick={getRandomFact}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              Get Random Fact
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
                  Ready to Learn Something New?
                </h3>
                <p className="text-blue-700">
                  Click the button above to start exploring fascinating facts about Nord-Trøndelag, 
                  one of Norway's most interesting regions!
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
            Celebrating the rich heritage and natural beauty of Nord-Trøndelag, Norway
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
