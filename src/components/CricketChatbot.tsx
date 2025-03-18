
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CricketChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([
    { role: 'bot', content: 'Hi! I\'m your cricket assistant. Ask me anything about cricket!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const GEMINI_API_KEY = 'AIzaSyAspdAT1SevGnIwHOasVI8oAAfrUiI9gNg';

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Add cricket context to ensure the chatbot stays on topic
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "You are a cricket expert assistant. Only answer questions related to cricket. If the user asks about anything unrelated to cricket, politely refuse and steer the conversation back to cricket topics. Keep responses concise and focused on cricket information. The user asked: " + userMessage
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      });

      const data = await response.json();
      
      let botResponse = "I'm sorry, I couldn't generate a response at this time.";
      
      if (data.candidates && data.candidates[0]?.content?.parts) {
        botResponse = data.candidates[0].content.parts[0].text;
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Sorry, I encountered an error processing your request. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <button 
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-cricket-blue text-white p-3 rounded-full shadow-lg hover:bg-cricket-darkBlue transition-all duration-300 z-50"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chatbot window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 animate-slide-in-right">
          {/* Chat header */}
          <div className="bg-cricket-blue text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">Cricket Assistant</h3>
            <button onClick={toggleChatbot} className="text-white hover:text-gray-200">
              <X size={18} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-4 ${
                  msg.role === 'user' ? 'ml-auto' : 'mr-auto'
                } max-w-[85%]`}
              >
                <div 
                  className={`p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-cricket-blue text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-cricket-blue/70 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-cricket-blue/70 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-cricket-blue/70 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span>Typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about cricket..."
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-cricket-blue"
              />
              <Button 
                onClick={sendMessage} 
                className="rounded-l-none bg-cricket-blue hover:bg-cricket-darkBlue"
                disabled={isLoading}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CricketChatbot;
