import { NextResponse } from 'next/server';

export const runtime = 'edge';

const QUESTIONS = [
  "What's a secret you've never told anyone?",
  "Who is your secret crush?",
  "What's the bravest thing you've ever done?",
  "If you could change one thing about your past, what would it be?",
  "What's your biggest fear?",
  "What's the most embarrassing thing that happened to you recently?",
  "If you could have dinner with any historical figure, who would it be?",
  "What's a simple thing that makes you happy?",
  "What is your dream job?",
  "Where do you see yourself in 5 years?",
  "What's your favorite childhood memory?",
  "If you could travel anywhere right now, where would you go?",
  "What's a talent you wish you had?",
  "Who do you look up to the most?",
  "What's the best advice you've ever received?",
  "If you won the lottery today, what's the first thing you'd buy?",
  "What's a song that always puts you in a good mood?",
  "Do you believe in aliens?",
  "What's the last book you read?",
  "If you could have any superpower, what would it be?",
  "What's something you're really proud of?",
  "What's your favorite movie quote?",
  "Do you prefer cats or dogs?",
  "What's your ultimate comfort food?",
  "If you could live in any fictional world, which one would it be?",
  "What is a habit you want to break?",
  "Who is the funniest person you know?",
  "What is your idea of a perfect date?",
  "What is something you want to learn this year?",
  "If you could time travel, would you go to the past or future?"
];

export async function POST(req: Request) {
  try {
    // Shuffle and pick 3 unique questions
    const shuffled = QUESTIONS.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const text = selected.join('||');

    return new NextResponse(text, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error: any) {
    console.error('Suggest API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
