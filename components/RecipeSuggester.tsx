import React, { useState, useRef, useEffect, useContext } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';

interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
}

const QuickPrompt: React.FC<{ text: string; onClick: () => void }> = ({ text, onClick }) => (
    <button 
        onClick={onClick}
        className="px-4 py-2 bg-white border border-teal-100 rounded-full text-xs font-medium text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200 shadow-sm whitespace-nowrap"
    >
        {text}
    </button>
);

const HealthAIAssistant: React.FC = () => {
    const { config } = useContext(MasterSetupContext);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'ai',
            content: 'Hello! I am the SilverLine Health Assistant. I can help with appointments, general wellness advice, and hospital information. How can I assist you today?',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatSessionRef = useRef<Chat | null>(null);

    // Initialize Gemini Chat Session
    useEffect(() => {
        const apiKey = process.env.API_KEY;
        if (apiKey) {
            try {
                const ai = new GoogleGenAI({ apiKey });
                
                // Construct context from CMS config
                const doctorsList = config.doctors?.list?.map((d: any) => `${d.name} (${d.specialty})`).join(', ') || 'various specialists';
                const systemInstruction = `You are a helpful and empathetic medical assistant for SilverLine Hospital in Trichy. 
                
                Key Info:
                - Doctors available: ${doctorsList}.
                - Services: Cardiology, Oncology, Neurology, Orthopedics, and 24/7 Emergency Care.
                
                Guidelines:
                1. If asked about appointments, direct them to use the 'Appointment' button in the menu or call (123) 456-7890.
                2. If asked for medical advice, provide general wellness information but ALWAYS include a disclaimer that you are an AI and they should consult a doctor for a diagnosis.
                3. Be concise, professional, and warm.
                4. Format your responses with simple HTML tags like <b>, <br>, or <ul>/<li> for readability if needed.`;

                chatSessionRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction }
                });
            } catch (e) {
                console.warn("Failed to initialize AI, falling back to simulation.", e);
            }
        }
    }, [config]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            if (chatSessionRef.current) {
                // Use Real AI
                const result = await chatSessionRef.current.sendMessage({ message: text });
                const aiContent = result.text;
                
                if (aiContent) {
                    const aiResponse: Message = {
                        id: (Date.now() + 1).toString(),
                        role: 'ai',
                        content: aiContent,
                        timestamp: new Date()
                    };
                    setMessages(prev => [...prev, aiResponse]);
                    setIsTyping(false);
                    return;
                }
            }
            throw new Error("AI not available or empty response");
        } catch (error) {
            // Fallback to Simulation
            setTimeout(() => {
                const aiResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'ai',
                    content: generateSimulatedResponse(text),
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiResponse]);
                setIsTyping(false);
            }, 1000);
        }
    };

    const generateSimulatedResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('appointment') || lowerQuery.includes('book')) {
            return "You can book an appointment easily through our website using the 'Appointment' button in the menu, or by calling our reception at <strong>(123) 456-7890</strong>.";
        }
        if (lowerQuery.includes('headache') || lowerQuery.includes('migraine')) {
            return "Headaches can be caused by various factors including stress, dehydration, or eye strain. <ul><li>Drink plenty of water.</li><li>Rest in a quiet, dark room.</li><li>If pain persists, please consult our Neurology department.</li></ul>";
        }
        if (lowerQuery.includes('fever') || lowerQuery.includes('temperature')) {
            return "For fever, stay hydrated and rest. If your temperature exceeds 102°F (39°C) or lasts more than 3 days, please visit our General Medicine department immediately.";
        }
        if (lowerQuery.includes('diet') || lowerQuery.includes('food')) {
            return "A balanced diet rich in fruits, vegetables, and whole grains is essential. For personalized advice, our <a href='#healthpackages' class='text-[#00B5A5] underline'>Comprehensive Health Package</a> includes a consultation with a nutritionist.";
        }
        return "Thank you for your query. As an AI assistant, I recommend consulting with one of our <a href='#doctor' class='text-[#00B5A5] underline'>specialists</a> for specific medical advice tailored to your condition. Is there anything else about our hospital services I can help with?";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend(input);
    };

    return (
        <section className="py-12 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-4xl mx-auto my-16">
            <div className="bg-[#0E2A47] p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-400/20 to-transparent animate-pulse"></div>
                        <svg className="w-6 h-6 text-[#00B5A5] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.5 15.21a2 2 0 00-1.806.547M6.343 17.657A9 9 0 1017.657 6.343m0 0a9 9 0 00-6.342-6.342M12 2.25V4.5m5.25 5.25v2.25M8.25 9.75V12M12 9.75a2.25 2.25 0 00-2.25 2.25V15"></path></svg>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">SilverLine Assistant</h3>
                        <p className="text-blue-200 text-xs flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-1.5 ${chatSessionRef.current ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></span>
                            {chatSessionRef.current ? 'AI Powered' : 'Automated Support'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-[400px] bg-gray-50 p-4 overflow-y-auto flex flex-col space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div 
                            className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                                msg.role === 'user' 
                                ? 'bg-[#0E2A47] text-white rounded-br-none' 
                                : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                            }`}
                        >
                            <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0" dangerouslySetInnerHTML={{ __html: msg.content }} />
                            <p className={`text-[10px] mt-1.5 text-right ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                        </div>
                    </div>
                ))}
                
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Disclaimer Footer */}
            <div className="p-2 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-[10px] text-gray-400">
                    Disclaimer: This is an AI assistant. Medical advice should be provided by a qualified professional.
                </p>
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide">
                <QuickPrompt text="Book appointment" onClick={() => handleSend("How do I book an appointment?")} />
                <QuickPrompt text="Treat a headache" onClick={() => handleSend("How can I treat a bad headache?")} />
                <QuickPrompt text="Healthy diet tips" onClick={() => handleSend("Give me some healthy diet tips.")} />
                <QuickPrompt text="Fever advice" onClick={() => handleSend("I have a high fever, what should I do?")} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a health question..."
                    className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00B5A5] focus:bg-white transition-all text-sm"
                />
                <button 
                    type="submit" 
                    disabled={!input.trim() || isTyping}
                    className="p-3 bg-[#00B5A5] text-white rounded-full hover:bg-[#0E2A47] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md transform active:scale-95"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                </button>
            </form>
        </section>
    );
};

export default HealthAIAssistant;