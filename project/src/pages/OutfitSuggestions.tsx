import React, { useState } from 'react';
import { Send, Sparkles, RefreshCw } from 'lucide-react';

const OutfitSuggestions: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Mock suggestions for demo
  const mockSuggestions = [
    {
      id: 1,
      outfit: "Smart Casual Look",
      items: [
        {
          name: "Men Slim Fit Cotton Casual Shirt",
          image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          price: 1999
        },
        {
          name: "Men Blue Regular Fit Jeans",
          image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          price: 3299
        },
        {
          name: "Men White Sneakers",
          image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          price: 8999
        }
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuggestions(mockSuggestions);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">AI Outfit Suggestions</h1>
            <p className="text-gray-600">
              Describe your style, occasion, or preferences, and let our AI suggest the perfect outfit for you
            </p>
          </div>

          {/* Prompt Input */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="bg-white rounded-lg shadow-sm p-4 flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Suggest a smart casual outfit for a coffee date' or 'What should I wear to a summer wedding?'"
                className="flex-1 border-0 focus:ring-0 text-lg"
              />
              <button
                type="submit"
                disabled={loading || !prompt}
                className="bg-pink-500 text-white px-6 py-2 rounded-md font-medium hover:bg-pink-600 transition-colors disabled:bg-pink-300 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Get Suggestions
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Suggestions */}
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">{suggestion.outfit}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestion.items.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="aspect-w-1 aspect-h-1 mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 object-cover rounded-md"
                      />
                    </div>
                    <h3 className="font-medium mb-2">{item.name}</h3>
                    <p className="text-pink-500 font-medium">₹{item.price}</p>
                    <button className="w-full mt-3 bg-pink-500 text-white py-2 rounded-md font-medium hover:bg-pink-600 transition-colors">
                      Add to Bag
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Example Prompts */}
          {!suggestions.length && !loading && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-bold mb-4">Try these example prompts:</h2>
              <div className="space-y-2">
                {[
                  "Suggest a professional outfit for a job interview",
                  "What should I wear for a beach party?",
                  "Create a trendy streetwear look",
                  "Recommend an outfit for a formal dinner"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="block w-full text-left p-3 rounded-md hover:bg-gray-50 transition-colors text-gray-600 hover:text-pink-500"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutfitSuggestions;