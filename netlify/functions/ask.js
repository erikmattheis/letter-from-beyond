import { config } from 'dotenv';
import axios from 'axios';

config();

const id = () => {
  const date = Date.now().toString(36);
  const rnd = Math.random().toString(36).substr(2);
  return date + rnd;
};


let gameDescribed = false;

export async function handler(event, context) {
  try {

    const messages = JSON.parse(event.body).messages;
    const API_KEY = process.env.OPENAI_API_KEY;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "temperature": 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    const answer = response.data.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ answer: answer })
    };

  } catch (error) {
    console.log(error)
    let errorMessage;

    if (error.response && error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error.message;
    } else if (error && error.message) {
      errorMessage = error.message;
    }
    else if (error) {
      errorMessage = error;
    } else {
      errorMessage = 'An unknown error occurred.';
    }

    console.log(errorMessage);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage })
    };

  }
}