function sanitizeN8nJson(json) {
  if (!json || typeof json !== 'object') return json;
  
  if (!Array.isArray(json.nodes)) json.nodes = [];
  if (!json.connections || typeof json.connections !== 'object') json.connections = {};

  json.nodes = json.nodes.map((node, index) => ({
    ...node,
    id: node.id ? String(node.id) : String(index + 1),
    name: node.name || `Node ${index + 1}`,
    type: node.type || "n8n-nodes-base.manualTrigger",
    typeVersion: node.typeVersion || 1,
    position: Array.isArray(node.position) && node.position.length >= 2 
              ? node.position 
              : [250 + (index * 200), 300],
    parameters: node.parameters || {}
  }));

  for (const sourceNode in json.connections) {
    let sourceData = json.connections[sourceNode];
    if (!sourceData) continue;
    
    if (Array.isArray(sourceData)) {
      sourceData = { "main": sourceData };
      json.connections[sourceNode] = sourceData;
    }

    if (!sourceData.main) sourceData.main = [[]];

    if (Array.isArray(sourceData.main) && sourceData.main.length > 0 && !Array.isArray(sourceData.main[0])) {
      sourceData.main = [sourceData.main];
    } else if (!Array.isArray(sourceData.main)) {
      sourceData.main = [[]];
    }
  }

  return json;
}

function parseGeminiResponse(rawText) {
  try {
    const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    
    if (parsed.json) {
      parsed.json = sanitizeN8nJson(parsed.json);
    }
    
    return parsed;
  } catch (error) {
    console.error("Failed to parse JSON from Gemini:", error);
    return {
      clarification: [],
      blueprint: [],
      json: { nodes: [], connections: {} }
    };
  }
}

module.exports = {
  parseGeminiResponse
};
