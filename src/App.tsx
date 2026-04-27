/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Image as ImageIcon, 
  X, 
  HelpCircle, 
  GraduationCap, 
  Upload,
  RefreshCw,
  Info
} from 'lucide-react';
import { chatWithTutor, Message } from './services/geminiService';
import { MathRenderer } from './components/MathRenderer';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ mimeType: string; data: string } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1];
        setSelectedImage({
          mimeType: file.type,
          data: base64Data
        });
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() && !selectedImage) return;

    const newUserMessage: Message = {
      role: "user",
      parts: [
        ...(selectedImage ? [{ inlineData: selectedImage }] : []),
        { text: textToSend }
      ]
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    const currentImageData = selectedImage; // Store to clear later
    clearImage();
    setIsLoading(true);

    try {
      const result = await chatWithTutor(messages, textToSend, currentImageData || undefined);
      const newModelMessage: Message = {
        role: "model",
        parts: [{ text: result.text }]
      };
      setMessages(prev => [...prev, newModelMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "model",
        parts: [{ text: "I'm having a little trouble connecting to my notebook. Could we try again? " }]
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskWhy = () => {
    handleSendMessage(undefined, "Why did we do that? Can you explain the concept behind this step?");
  };

  const handleRestart = () => {
    if (confirm("Are you sure you want to start a new problem?")) {
      setMessages([]);
      clearImage();
    }
  };

  return (
    <div className="flex flex-col h-screen h-screen bg-[#0F0F0F] text-[#E0D7D0] font-serif overflow-hidden">
      {/* Header Navigation */}
      <header className="flex justify-between items-center px-10 py-6 border-b border-[#2A2A2A] bg-[#121212] z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0F0F0F] font-bold text-xs">Σ</div>
          <span className="text-lg tracking-widest uppercase font-sans font-light">Lumina Mentor</span>
        </div>
        <div className="flex gap-8 font-sans text-[10px] tracking-widest uppercase opacity-40">
          <button onClick={handleRestart} className="hover:text-[#C5A059] transition-colors">Start Over</button>
          <span className="opacity-20 cursor-default">Archive</span>
          <span className="text-[#C5A059]">Active Session</span>
        </div>
        <div className="w-8 h-8 rounded-full border border-[#2A2A2A] flex items-center justify-center">
          <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`}></div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Pane: Problem Workspace */}
        <section className="w-[420px] border-r border-[#2A2A2A] p-10 flex flex-col hidden lg:flex bg-[#0F0F0F]">
          <div className="mb-8">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-2 block">Active Problem</span>
            <h2 className="text-2xl font-light text-[#F5F2ED]">Mathematical Study</h2>
          </div>
          
          {/* Uploaded Image Workspace */}
          <div className="relative flex-1 bg-[#161616] rounded-xl border border-[#2A2A2A] p-6 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <div className="absolute top-0 left-0 w-full p-3 bg-[#1A1A1A] border-b border-[#2A2A2A] flex justify-between px-4">
              <span className="font-sans text-[9px] uppercase tracking-widest opacity-40">work_item_math.jpg</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-[#2A2A2A]"></div>
                <div className="w-1 h-1 rounded-full bg-[#2A2A2A]"></div>
              </div>
            </div>
            
            {imagePreview ? (
              <div className="relative w-full h-full flex items-center justify-center mt-6">
                <img 
                  src={imagePreview} 
                  className="max-w-full max-h-[80%] rounded shadow-2xl grayscale-[30%] opacity-90" 
                  alt="Problem"
                />
                <button 
                  onClick={clearImage}
                  className="absolute top-0 right-0 p-2 text-white/20 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center opacity-20 space-y-4">
                <Upload size={40} className="stroke-1" />
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase">Pending Data</p>
              </div>
            )}

            <div className="mt-8 w-full border-t border-dashed border-[#2A2A2A] pt-4">
              <p className="font-sans text-[10px] text-center opacity-40 leading-relaxed uppercase tracking-widest italic">
                {isLoading ? "Socratically processing structure..." : "Awaiting visual input for analysis"}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-4 border border-[#C5A059] text-[#C5A059] font-sans text-[10px] uppercase tracking-widest rounded-sm hover:bg-[#C5A059] hover:text-[#0F0F0F] transition-all font-bold"
            >
              Upload Problem
            </button>
          </div>
        </section>

        {/* Right Pane: Socratic Dialogue */}
        <section className="flex-1 bg-[#0D0D0D] flex flex-col relative">
          <div 
            ref={scrollRef}
            className="flex-1 p-8 md:p-20 overflow-y-auto scroll-smooth flex flex-col"
          >
            {messages.length === 0 && (
              <div className="max-w-2xl mb-12">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-4 block">Mentor</span>
                <p className="text-4xl leading-[1.3] text-[#F5F2ED] font-light">
                  Approach your studies with a clear mind.
                </p>
                <p className="text-xl leading-relaxed mt-8 opacity-60 font-light">
                  Share a problem you find challenging. I will help you uncover the solution through patient observation and small, logical transitions.
                </p>
              </div>
            )}

            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-16 last:mb-2"
                >
                  <span className={`font-sans text-[10px] uppercase tracking-[0.2em] mb-4 block ${msg.role === 'user' ? 'text-white/40' : 'text-[#C5A059]'}`}>
                    {msg.role === 'user' ? 'Student' : 'Mentor'}
                  </span>
                  <div className={msg.role === 'user' ? 'opacity-90' : ''}>
                    {msg.parts.map((part, pIdx) => (
                      <div key={pIdx}>
                        {part.text && (
                          <div className={msg.role === 'model' ? 'text-2xl font-light text-[#F5F2ED] leading-relaxed' : 'text-xl opacity-80'}>
                            <MathRenderer content={part.text} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <div className="flex flex-col mb-12 pt-4">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-4 block">Mentor</span>
                <div className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
          </div>

          {/* Socratic Interactions Bar */}
          <AnimatePresence>
            {messages.length > 0 && messages[messages.length - 1].role === 'model' && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-10 py-6 border-t border-[#2A2A2A] bg-[#0D0D0D] flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <button
                    onClick={handleAskWhy}
                    className="px-10 py-4 bg-[#C5A059] text-[#0F0F0F] rounded-full text-xs uppercase tracking-widest font-sans font-bold shadow-[0_10px_30px_rgba(197,160,89,0.1)] hover:bg-[#D4AF37] transition-all"
                  >
                    Why did we do that?
                  </button>
                  <span className="text-[11px] font-sans opacity-20 italic">Question the fundamental logic.</span>
                </div>
                
                <div className="flex flex-col items-end opacity-40">
                  <span className="text-[10px] font-sans uppercase tracking-widest mb-2">Depth</span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className={`w-6 h-0.5 ${i < Math.min(messages.length / 2, 4) ? 'bg-[#C5A059]' : 'bg-[#2A2A2A]'}`}></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Bar */}
          <div className="h-28 px-10 border-t border-[#2A2A2A] bg-[#121212] flex items-center gap-6">
            <form onSubmit={handleSendMessage} className="flex-1 flex items-center gap-4">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageSelect}
                className="hidden" 
                accept="image/*"
              />
              <div className="flex-1 flex items-center bg-[#0D0D0D] border border-[#2A2A2A] rounded-full px-8 h-14 transition-all focus-within:border-[#C5A059]/50">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Share your thoughts or observations..." 
                  className="bg-transparent border-none outline-none text-sm font-sans w-full text-[#F5F2ED] placeholder:opacity-20 translate-y-[1px]"
                />
                <button 
                  type="submit"
                  disabled={isLoading || (!inputText.trim() && !selectedImage)}
                  className="ml-4 text-[#C5A059] opacity-60 hover:opacity-100 disabled:opacity-10 transition-all"
                >
                  <Send size={20} className="rotate-[-10deg]" />
                </button>
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-14 h-14 flex lg:hidden items-center justify-center border border-[#2A2A2A] rounded-full hover:bg-[#1A1A1A] text-[#C5A059] transition-all"
              >
                <ImageIcon size={20} />
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
