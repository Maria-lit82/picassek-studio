import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
let apiKey = '';
for (const line of envContent.split('\n')) {
  if (line.startsWith('OPENROUTER_API_KEY=')) {
    apiKey = line.replace('OPENROUTER_API_KEY=', '').replace(/"/g, '').trim();
  }
}

async function testGPT() {
  console.log("Testing GPT-4o-mini...");
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{role: "system", content: "Return ONLY JSON."}, {role: "user", content: "Test JSON { \"hello\": \"world\" }"}],
      response_format: { type: "json_object" }
    }),
  });
  
  const text = await response.text();
  console.log("GPT Status:", response.status);
  console.log("GPT Response:", text);
}

async function testSeedream() {
  console.log("Testing Seedream 4.5...");
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "bytedance-seed/seedream-4.5",
      messages: [{role: "user", content: "A cool cat"}],
    }),
  });
  
  const text = await response.text();
  console.log("Seedream Status:", response.status);
  console.log("Seedream Response:", text);
}

async function run() {
  await testGPT();
  await testSeedream();
}

run();
