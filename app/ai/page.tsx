'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage() {
    if (!input.trim()) return;

    const newUserMessage: Message = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || 'Failed to get AI response');
      }

      const data = await res.json();
      const assistantMessage = data.message;

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="w-[60vw] h-[90vh] bg-black text-white p-8 rounded-lg flex flex-col">
          <h1 className="text-center mb-4 text-5xl font-bold text-red-500">Ask AI</h1>

          <div className="flex-1 p-4 overflow-y-auto mb-4 rounded-lg [&::-webkit-scrollbar]:hidden">
            {messages.length === 0 && <p>Say hi to the assistant!</p>}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-black text-white border-2 border-[#f26168] shadow-md shadow-[#f26168]'
                      : 'bg-black text-white border-2 border-[#f26168] shadow-md shadow-[#f26168]'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 mb-2">Error: {error}</p>}

          <div className="w-full flex gap-5 justify-center items-center">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="w-1/2 p-5 px-10 rounded-2xl bg-white border-2 border-[#f26168] text-black text-2xl font-semibold"
              disabled={loading}
            />

            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-32 h-20 px-4 py-2 bg-red-500 text-white text-2xl font-semibold rounded-md hover:bg-red-700 disabled:opacity-30"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
