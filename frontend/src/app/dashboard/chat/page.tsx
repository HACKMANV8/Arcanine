'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Bot, User } from 'lucide-react';
import { mockChatMessages } from '@/lib/mock-data';

export default function ChatPage() {
  const [messages, setMessages] = useState(mockChatMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: String(messages.length + 1),
      role: 'user' as const,
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Mock AI response
    setTimeout(() => {
      const aiResponse = {
        id: String(messages.length + 2),
        role: 'assistant' as const,
        content: 'This is a mock AI response. In a real application, this would be powered by an AI model to provide helpful plant care advice.',
        timestamp: new Date().toISOString(),
        quickReplies: ['Tell me more', 'Show related plants', 'Get diagnosis'],
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
  };

  return (
    <div className="h-screen md:h-[calc(100vh-0px)] flex flex-col bg-neutral-light">
      {/* Header */}
      <div className="bg-white border-b border-neutral px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-neutral-darker">PlantCare AI Assistant</h1>
          <p className="text-sm text-green-600">● Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'assistant' ? 'bg-primary' : 'bg-secondary'
            }`}>
              {message.role === 'assistant' ? (
                <Bot className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'flex flex-col items-end' : ''}`}>
              <div
                className={`rounded-2xl px-5 py-3 ${
                  message.role === 'assistant'
                    ? 'bg-white shadow-soft'
                    : 'bg-primary text-white'
                }`}
              >
                <p className={`text-sm leading-relaxed whitespace-pre-line ${
                  message.role === 'assistant' ? 'text-neutral-dark' : 'text-white'
                }`}>
                  {message.content}
                </p>
              </div>

              {/* Quick Replies */}
              {message.role === 'assistant' && 'quickReplies' in message && message.quickReplies && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickReply(reply)}
                      className="bg-white border border-neutral hover:border-primary text-neutral-dark hover:text-primary text-sm px-4 py-2 rounded-full transition-all duration-200"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Timestamp */}
              <p className="text-xs text-neutral-muted mt-2">
                {new Date(message.timestamp).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-neutral p-4">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <button className="p-2.5 text-neutral-muted hover:text-primary transition-colors duration-200">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about plant care, diseases, or treatments..."
              rows={1}
              className="w-full px-4 py-3 pr-12 border border-neutral rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none min-h-12 max-h-32"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-3 bg-primary hover:bg-primary-dark text-white rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
