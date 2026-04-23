const fallbackWorkflow = {
  "name": "NIAT WhatsApp Chatbot - Complete Assignment (On Message Trigger)",
  "nodes": [
    {
      "parameters": {},
      "id": "94fd41fb-3f20-4696-8f18-999da8bbfd3a",
      "name": "Sticky Note",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        0,
        0
      ],
      "notesInFlow": true,
      "notes": "# Workflow v3\n\n**NIAT WhatsApp Chatbot**\n\nComplete assignment implementation with:\n- WhatsApp Business Trigger (native)\n- WhatsApp Send nodes\n- Gemini AI integration\n- User registration & lead scoring\n- Career guidance system\n- Promotional scheduler\n- Google Sheets database"
    },
    {
      "parameters": {
        "jsCode": "// Extract WhatsApp message data from native trigger\nconst message = $input.item.json;\n\nconst phone = message.from;\nlet messageText = '';\n\nif (message.messageType === 'text') {\n  messageText = message.text.toLowerCase().trim();\n} else {\n  messageText = '[non-text message]';\n}\n\nreturn {\n  phone: phone,\n  message: messageText,\n  messageType: message.messageType,\n  timestamp: message.timestamp,\n  messageId: message.messageId\n};"
      },
      "id": "dd5ef8c8-4b75-41ea-afb6-f9e42a2112f1",
      "name": "Extract WhatsApp Data",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        304,
        544
      ]
    },
    {
      "parameters": {
        "operation": "searchAndUpdate",
        "documentId": {
          "__rl": true,
          "value": "YOUR_SPREADSHEET_ID",
          "mode": "list",
          "cachedResultName": "NIAT Users Database"
        }
      },
      "id": "a3ab7773-2c57-4932-86f6-d2c4803b1231",
      "name": "Lookup or Create User",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.5,
      "position": [
        528,
        544
      ]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false
          },
          "conditions": [
            {
              "id": "user_exists_condition",
              "leftValue": "={{ $json.rowNumber }}",
              "rightValue": "",
              "operator": {
                "type": "number",
                "operation": "exists"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "c159c0ac-32ba-4f33-b630-87d2e2874cb6",
      "name": "Check User Exists",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        752,
        544
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "welcome_message",
              "name": "reply",
              "value": "Hi 👋 Welcome to NIAT!\n\nI'm your admission assistant. I can help you with:\n✅ Course information\n✅ Fee structure\n✅ Career guidance\n✅ Admission process\n\nMay I know your name?",
              "type": "string"
            },
            {
              "id": "phone_data",
              "name": "phone",
              "value": "={{ $json.phone }}",
              "type": "string"
            },
            {
              "id": "stage_data",
              "name": "stage",
              "value": "ASK_NAME",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "42ef32a7-b499-4755-bac9-468e455cd992",
      "name": "New User - Welcome",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        2096,
        1024
      ]
    },
    {
      "parameters": {
        "jsCode": "// Normalize spelling mistakes and detect abuse\nlet msg = $input.item.json.message;\nconst originalMsg = msg;\n\n// Normalize common spelling mistakes\nmsg = msg\n  .replace(/\\bfess?\\b/gi, 'fees')\n  .replace(/\\bcoursess?\\b/gi, 'course')\n  .replace(/\\bplacemnt\\b/gi, 'placement')\n  .replace(/\\baddmission\\b/gi, 'admission')\n  .replace(/\\bfull stack\\b/gi, 'fullstack')\n  .replace(/\\bback end\\b/gi, 'backend');\n\n// Check for abusive language\nconst abuseWords = ['idiot', 'stupid', 'fuck', 'shit', 'damn', 'bastard', 'asshole'];\nconst isAbusive = abuseWords.some(word => msg.toLowerCase().includes(word));\n\n// Check for opt-out keywords\nconst optOutKeywords = ['stop', 'unsubscribe', 'opt out', 'optout'];\nconst isOptOut = optOutKeywords.some(word => msg.includes(word));\n\nreturn {\n  ...($input.item.json),\n  cleanMessage: msg,\n  originalMessage: originalMsg,\n  isAbusive: isAbusive,\n  isOptOut: isOptOut\n};"
      },
      "id": "5531d595-a081-454d-927b-6000478c675d",
      "name": "Normalize & Abuse Check",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        976,
        448
      ]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false
          },
          "conditions": [
            {
              "id": "abuse_check",
              "leftValue": "={{ $json.isAbusive }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "true"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "0081fca6-163a-416c-9f57-0a278b479ec6",
      "name": "Is Abusive?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        1200,
        448
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "abuse_reply",
              "name": "reply",
              "value": "I'm here to help you with NIAT courses, admissions, and career guidance. Please ask questions related to education and careers. 🙏",
              "type": "string"
            },
            {
              "id": "phone_passthrough",
              "name": "phone",
              "value": "={{ $json.phone }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "b956f753-fbee-42b0-954b-1d9c647c8234",
      "name": "Abuse Response",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        2096,
        256
      ]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false
          },
          "conditions": [
            {
              "id": "optout_check",
              "leftValue": "={{ $json.isOptOut }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "true"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "ac9f93da-4572-4714-b547-67f0e6720752",
      "name": "Is Opt-Out?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        1424,
        544
      ]
    },
    {
      "parameters": {
        "operation": "update",
        "documentId": {
          "__rl": true,
          "value": "YOUR_SPREADSHEET_ID",
          "mode": "list",
          "cachedResultName": "NIAT Users Database"
        },
        "sheetName": {
          "__rl": true,
          "value": "gid=0",
          "mode": "list",
          "cachedResultName": "Sheet1"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "optedOut": "true",
            "last_message_date": "={{ $now.format('yyyy-MM-dd HH:mm:ss') }}"
          }
        },
        "options": {}
      },
      "id": "955c2060-a759-435c-96d6-959240098df7",
      "name": "Mark User Opted Out",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.5,
      "position": [
        1872,
        448
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "optout_confirmation",
              "name": "reply",
              "value": "You've been unsubscribed from promotional messages. You can still ask questions anytime. Thank you! 👋",
              "type": "string"
            },
            {
              "id": "phone_pass",
              "name": "phone",
              "value": "={{ $json.phone }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "88f9dad2-1627-41be-ae4f-289d580b1cca",
      "name": "Opt-Out Confirmation",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        2096,
        448
      ]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false
          },
          "conditions": [
            {
              "id": "stage_check",
              "leftValue": "={{ $('Lookup or Create User').item.json.stage }}",
              "rightValue": "ASK_NAME",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "or"
        },
        "options": {}
      },
      "id": "b559a0af-1075-44d2-8151-04c79ac2c116",
      "name": "Is In Registration?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        1648,
        640
      ]
    },
    {
      "parameters": {
        "operation": "update",
        "documentId": {
          "__rl": true,
          "value": "YOUR_SPREADSHEET_ID",
          "mode": "list",
          "cachedResultName": "NIAT Users Database"
        },
        "sheetName": {
          "__rl": true,
          "value": "gid=0",
          "mode": "list",
          "cachedResultName": "Sheet1"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "name": "={{ $json.cleanMessage }}",
            "stage": "REGISTERED",
            "last_message_date": "={{ $now.format('yyyy-MM-dd HH:mm:ss') }}"
          }
        },
        "options": {}
      },
      "id": "1b5b9193-9046-4d02-ae77-b77d93ebe7ef",
      "name": "Save User Name",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.5,
      "position": [
        1872,
        640
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "registration_complete",
              "name": "reply",
              "value": "=Thank you, {{ $json.cleanMessage }}! 🎉\n\nRegistration complete. How can I help you today?\n\nYou can ask me about:\n📚 Courses at NIAT\n💰 Fee structure\n🎯 Career guidance\n📞 Admission process",
              "type": "string"
            },
            {
              "id": "phone_final",
              "name": "phone",
              "value": "={{ $json.phone }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "cd98b43f-df35-431f-b61f-f5800cdfc6b4",
      "name": "Registration Complete",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        2096,
        640
      ]
    },
    {
      "parameters": {
        "jsCode": "// Update message count and calculate lead score\nconst userData = $('Lookup or Create User').item.json;\nconst currentCount = parseInt(userData.message_count || '0');\nconst newCount = currentCount + 1;\n\n// Lead scoring based on message count\nlet leadStatus = 'low';\nif (newCount >= 10) {\n  leadStatus = 'high';\n} else if (newCount >= 5) {\n  leadStatus = 'medium';\n}\n\nreturn {\n  ...($input.item.json),\n  newMessageCount: newCount,\n  leadStatus: leadStatus,\n  userName: userData.name || 'User'\n};"
      },
      "id": "7bfad087-cedd-449c-9077-2aaacd71ad9d",
      "name": "Update Message Count & Lead",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1872,
        832
      ]
    },
    {
      "parameters": {
        "operation": "update",
        "documentId": {
          "__rl": true,
          "value": "YOUR_SPREADSHEET_ID",
          "mode": "list",
          "cachedResultName": "NIAT Users Database"
        },
        "sheetName": {
          "__rl": true,
          "value": "gid=0",
          "mode": "list",
          "cachedResultName": "Sheet1"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "message_count": "={{ $json.newMessageCount }}",
            "lead": "={{ $json.leadStatus }}",
            "last_message_date": "={{ $now.format('yyyy-MM-dd HH:mm:ss') }}"
          }
        },
        "options": {}
      },
      "id": "ca7d2520-a55d-4076-b3a6-c1b91ff86054",
      "name": "Save Message Count & Lead",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.5,
      "position": [
        2096,
        832
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "system_prompt",
              "name": "systemPrompt",
              "value": "You are an AI assistant for NIAT (National Institute of Advanced Technology), an educational institute.\n\n**Your primary tasks:**\n1. Categorize user questions into: NIAT_INFO, CAREER_GUIDANCE, EDUCATION, or UNRELATED\n2. Provide short, accurate, helpful responses\n3. Ask follow-up questions when needed for career guidance\n\n**NIAT Information (Hardcoded):**\n- **Courses Offered:** Full Stack Development, Backend Development, Software Development, Frontend Development\n- **Fee Structure:** ₹50,000 - ₹1,50,000 depending on course (Full Stack: ₹1,20,000, Backend: ₹80,000)\n- **Duration:** 4-6 months intensive programs\n- **Mode:** Online, Offline, and Hybrid options available\n- **Placement Support:** 100% placement assistance with tie-ups with 200+ companies\n- **Career Opportunities:** Software Engineer, Full Stack Developer, Backend Developer, DevOps Engineer, etc.\n- **Admission Process:** Online application → Counseling call → Payment → Course starts\n- **Contact:** contact@niat.edu.in, +91-9876543210\n- **Location:** Hyderabad, India\n\n**Career Guidance Rules:**\n- If user mentions intermediate marks below 60%: suggest skill-based courses first\n- If user mentions interest in coding: ask frontend vs backend preference\n- If user mentions marks 75%+: recommend Full Stack Development\n- Always ask for interests if not provided\n\n**Response Format:**\nProvide responses in this JSON structure:\n{\n  \"category\": \"NIAT_INFO | CAREER_GUIDANCE | EDUCATION | UNRELATED\",\n  \"reply\": \"Your short response here\",\n  \"needsFollowUp\": true/false,\n  \"followUpQuestion\": \"Question to ask if needsFollowUp is true\"\n}\n\n**Important:**\n- Keep replies under 150 words\n- Be friendly and professional\n- If question is UNRELATED, politely redirect to NIAT topics\n- For career guidance, gather: marks, interests, preferred field",
              "type": "string"
            },
            {
              "id": "user_message",
              "name": "userMessage",
              "value": "={{ $json.cleanMessage }}",
              "type": "string"
            },
            {
              "id": "user_context",
              "name": "userContext",
              "value": "=User: {{ $json.userName }}\nMessage Count: {{ $json.newMessageCount }}\nLead Status: {{ $json.leadStatus }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "2752253f-9634-4e5f-882f-d3a5a3ac1104",
      "name": "Prepare Gemini Input",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        2320,
        832
      ]
    },
    {
      "parameters": {
        "jsCode": "// Parse Gemini response and extract reply\nlet geminiResponse = $input.item.json.response || $input.item.json.text || '{}';\n\n// Try to extract JSON from response\nlet parsedResponse;\ntry {\n  // Check if response is wrapped in markdown code block\n  const jsonMatch = geminiResponse.match(/```json\\s*([\\s\\S]*?)\\s*```/);\n  if (jsonMatch) {\n    parsedResponse = JSON.parse(jsonMatch[1]);\n  } else {\n    parsedResponse = JSON.parse(geminiResponse);\n  }\n} catch (e) {\n  // Fallback if JSON parsing fails\n  parsedResponse = {\n    category: 'UNKNOWN',\n    reply: geminiResponse,\n    needsFollowUp: false\n  };\n}\n\nconst previousData = $('Prepare Gemini Input').item.json;\n\nreturn {\n  phone: previousData.phone || $input.item.json.phone,\n  reply: parsedResponse.reply,\n  category: parsedResponse.category,\n  needsFollowUp: parsedResponse.needsFollowUp || false,\n  followUpQuestion: parsedResponse.followUpQuestion || ''\n};"
      },
      "id": "737aa1ce-fea8-4066-a16a-23257ef21df8",
      "name": "Parse Gemini Response",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        2096,
        1216
      ]
    },
    {
      "parameters": {},
      "id": "43ee5560-7eef-4b75-9018-ff2f220b9401",
      "name": "Send WhatsApp Message",
      "type": "n8n-nodes-base.whatsApp",
      "typeVersion": 1.1,
      "position": [
        2320,
        640
      ],
      "webhookId": "ce8f8afb-d8eb-4df7-abc8-0a71f4197e57"
    },
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "triggerAtHour": 10
            }
          ]
        }
      },
      "id": "da856fb0-14b6-4af9-98b8-d92e38d1072e",
      "name": "Weekly Promo Scheduler",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        304,
        1648
      ]
    },
    {
      "parameters": {
        "operation": "getAll",
        "documentId": {
          "__rl": true,
          "value": "YOUR_SPREADSHEET_ID",
          "mode": "list",
          "cachedResultName": "NIAT Users Database"
        }
      },
      "id": "ef31721c-8ef2-4ad2-b509-2838f36e16a6",
      "name": "Get Opted-In Users",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.5,
      "position": [
        528,
        1648
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "promo_message",
              "name": "promoMessage",
              "value": "🎓 **New Batch Alert!**\n\nNIAT is launching a new Full Stack Development batch starting next Monday!\n\n✅ Limited seats available\n✅ Early bird discount: 20% OFF\n✅ 100% placement assistance\n\nReply with \"INTERESTED\" to book your seat!\n\n📞 Call: +91-9876543210\n🌐 Visit: www.niat.edu.in",
              "type": "string"
            },
            {
              "id": "phone_promo",
              "name": "phone",
              "value": "={{ $json.phone }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "efd3c1d2-9909-4f00-8ebf-be40c208f864",
      "name": "Prepare Promo Message",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        752,
        1648
      ]
    },
    {
      "parameters": {},
      "id": "7bf4be71-5bea-40f2-8df6-28a942578159",
      "name": "Send Promo Message",
      "type": "n8n-nodes-base.whatsApp",
      "typeVersion": 1.1,
      "position": [
        976,
        1648
      ],
      "webhookId": "f1da71b7-d452-4791-ab78-7990d632f0b2"
    },
    {
      "parameters": {},
      "id": "e12ec011-6ed0-45d8-8373-e73326ab12e4",
      "name": "Sticky Note - Promo",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        448,
        800
      ],
      "notesInFlow": true,
      "notes": "**Promotional Message System**\n\nScheduled: Every Monday 10:00 AM\nTarget: All opted-in users\nContent: Course promotions, new batches, offers"
    },
    {
      "parameters": {},
      "id": "cc108aea-070b-4714-b317-95d654c6df04",
      "name": "Sticky Note - Main Flow",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        1744,
        0
      ],
      "notesInFlow": true,
      "notes": "**Main Conversation Flow**\n\n1. Abuse detection → Polite redirect\n2. Opt-out handling → Update DB\n3. Registration flow → Collect name\n4. Message counting → Lead scoring\n5. Gemini AI → Smart responses\n6. WhatsApp delivery (native nodes)"
    },
    {
      "parameters": {
        "updates": [
          "messages"
        ],
        "options": {}
      },
      "type": "n8n-nodes-base.whatsAppTrigger",
      "typeVersion": 1,
      "position": [
        48,
        544
      ],
      "id": "791ac6e8-0953-4308-8cb0-0c198d2c9ea3",
      "name": "WhatsApp Trigger1",
      "webhookId": "42286069-85fa-4777-bdbf-a24fc9a0769a"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3.1,
      "position": [
        1680,
        1216
      ],
      "id": "a973b2c8-4942-4592-8fcb-8c21991243e6",
      "name": "AI Agent"
    }
  ],
  "connections": {
    "Extract WhatsApp Data": {
      "main": [
        [
          {
            "node": "Lookup or Create User",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Lookup or Create User": {
      "main": [
        [
          {
            "node": "Check User Exists",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Check User Exists": {
      "main": [
        [
          {
            "node": "Normalize & Abuse Check",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "New User - Welcome",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "New User - Welcome": {
      "main": [
        [
          {
            "node": "Send WhatsApp Message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Normalize & Abuse Check": {
      "main": [
        [
          {
            "node": "Is Abusive?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Is Abusive?": {
      "main": [
        [
          {
            "node": "Abuse Response",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Is Opt-Out?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Abuse Response": {
      "main": [
        [
          {
            "node": "Send WhatsApp Message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Is Opt-Out?": {
      "main": [
        [
          {
            "node": "Mark User Opted Out",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Is In Registration?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Mark User Opted Out": {
      "main": [
        [
          {
            "node": "Opt-Out Confirmation",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Opt-Out Confirmation": {
      "main": [
        [
          {
            "node": "Send WhatsApp Message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Is In Registration?": {
      "main": [
        [
          {
            "node": "Save User Name",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Update Message Count & Lead",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Save User Name": {
      "main": [
        [
          {
            "node": "Registration Complete",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Registration Complete": {
      "main": [
        [
          {
            "node": "Send WhatsApp Message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Update Message Count & Lead": {
      "main": [
        [
          {
            "node": "Save Message Count & Lead",
            "type": "main",
            "index": 0
          },
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Save Message Count & Lead": {
      "main": [
        [
          {
            "node": "Prepare Gemini Input",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parse Gemini Response": {
      "main": [
        [
          {
            "node": "Send WhatsApp Message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Weekly Promo Scheduler": {
      "main": [
        [
          {
            "node": "Get Opted-In Users",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Opted-In Users": {
      "main": [
        [
          {
            "node": "Prepare Promo Message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prepare Promo Message": {
      "main": [
        [
          {
            "node": "Send Promo Message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "WhatsApp Trigger1": {
      "main": [
        [
          {
            "node": "Extract WhatsApp Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent": {
      "main": [
        [
          {
            "node": "Parse Gemini Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1",
    "binaryMode": "separate",
    "availableInMCP": false
  },
  "versionId": "f58d9784-c4e1-4efc-a401-678080a4dc02",
  "meta": {
    "instanceId": "969257b09ad2942bbaff2e2288304f4969030574d109cdeca05bf11f630884df"
  },
  "id": "HLKvWnji4iJldxj3",
  "tags": []
};

module.exports = fallbackWorkflow;
