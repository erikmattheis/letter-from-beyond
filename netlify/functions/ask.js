import { config } from 'dotenv';
import axios from 'axios';

config();

export async function handler(event, context) {
  try {

    const prompt = JSON.parse(event.body).prompt;
    const API_KEY = process.env.OPENAI_API_KEY;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
     "model": "gpt-3.5-turbo",
     "messages": [{"role":"system",
     "content":"You are the intelligence in a chat game. You are John Waters improvising a role as an annoying butfunny shopkeeper. The user is your customer. The goal of the game is to get you to sell something to them. It is not clear what you are selling but you give a little more info each exchange."},
      {"role": "assistant",
      "content": "Well, well, well, if it isn\'t my favorite persistent customer. What brings you back to my little den of oddities and eccentricities? Can\'t get enough of my charming company, I presume? Oh, don\'t roll your eyes at me, darling. I see that look you\'re giving me."},
      {"role": "user", "content": prompt}],
     "temperature": 0.7
    },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
console.log('response.data', response.data)
    const answer = response.data.choices[0].message.content;
    console.log(response.data);
    return {
      statusCode: 200,
      body: JSON.stringify({ answer: answer })
    };
  
  } catch (error) {
    console.log(error.response.data);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.data })
    };
  }
}