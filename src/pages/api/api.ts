interface OpenAIResponse {
  choices: {text : string} [];
}

async function callOpenAIModel (currentWeight:string, targetWeight: string, userInput: string ) : Promise <string> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = 'https://api.openai.com/v1/completions';

  if (!apiKey) {
    throw new Error('OpenAI API key not provided');
  }

  const response = await fetch(apiUrl,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}` 
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Create a home weight loss plan, guiding me from ${currentWeight}kg to ${targetWeight}kg. As an experienced gym instructor, outline a schedule and dietary recommendations.` + userInput,
      max_tokens: 500,
      n: 1,
      stop: null,
      temperature: 0,
    })
  })

  const data = await response.json();
  console.log(data.choices[0].text.trim());
  return data.choices[0].text.trim();

}

export default callOpenAIModel;
