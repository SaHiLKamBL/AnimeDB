// app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';

 // optional, if you want Edge

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-r1-0528:free',
      messages: [
    { 
        role: 'system',
        content: 'You are an anime expert assistant. Your responses must be: 1) Only about anime-related topics (series, movies, characters, etc.) 2) General greetings when users say hello 3) In English only. If asked about non-anime topics, politely decline and steer conversation back to anime. Provide detailed, knowledgeable answers about anime.' 
    },
    ...messages,
]
    }),
  });

  if (!response.ok) {
    let errorBody = {};
    try {
      errorBody = await response.json();
    } catch {
      errorBody = { message: `Status ${response.status} with empty body` };
    }
    return NextResponse.json({ error: errorBody }, { status: response.status });
  }

  const data = await response.json();

  const assistantMessage = data.choices?.[0]?.message;

  if (!assistantMessage) {
    return NextResponse.json({ error: 'No assistant message returned' }, { status: 500 });
  }

  return NextResponse.json({ message: assistantMessage });
}
