'use client';

import React, { useState } from 'react';

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
    } catch (e: any) {
      setError(e.message);
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
    <div className=" w-full h-screen flex  items-center justify-center bg-gray-950 p-8">
      <div className="w-[60vw] h-[90vh] bg-gray-950 text-white p-8 rounded-lg">
        <h1 className="text-center mb-4 text-5xl font-bold text-purple-800">Ask AI</h1>

        <div className=" p-4 h-[70vh] overflow-y-auto mb-4 rounded-lg [&::-webkit-scrollbar]:hidden">
          {messages.length === 0 && <p>Say hi to the assistant!</p>}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-gray-950 text-white border-2 border-white shadow-md shadow-blue-200'
                    : 'text-purple-700 bg-gray-950 border-2 border-purple-500 shadow-md shadow-purple-300'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 mb-2">Error: {error}</p>}
    <div className='w-full flex gap-5 justify-center items-center'>
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="w-1/2 p-5 px-10 rounded-2xl bg-white border-2 border-white text-black text-2xl font-semibold"
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className=" w-32 h-20 px-4 py-2 bg-purple-800 text-white text-2xl font-semibold rounded-md hover:bg-purple-800 disabled:opacity-30"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
        </div>


      </div>
    </div>
  );
}
