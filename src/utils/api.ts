export async function generateWorkflowBackend(prompt: string) {
  const res = await fetch('https://workflow-builder-omega-sage.vercel.app/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API returned ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data;
}
