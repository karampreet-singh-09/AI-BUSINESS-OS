# Prompt Library & Management

Prompts are the source code of our AI features. They must be managed, versioned, and evaluated just like regular code.

## 1. Storage & Versioning
- **Static Prompts**: Short, static system prompts can live in the codebase (e.g., `src/features/ai/prompts/`).
- **Dynamic/Iterative Prompts**: Core system prompts that change frequently should be stored in the database or a prompt management system (e.g., Langfuse, Helicone) so they can be updated without deploying the app.

## 2. Prompt Architecture
Follow standard prompt engineering best practices:
1. **Role/Persona**: Define exactly who the AI is.
2. **Context**: Provide necessary background data.
3. **Instructions/Rules**: Clear, numbered constraints.
4. **Output Format**: Specify exactly how the output should look (though `generateObject` handles JSON schemas inherently).

## 3. Standard System Prompt Template
```typescript
export const CRM_AGENT_PROMPT = `
You are the AI Assistant for the organization "{{organization_name}}".

# CONTEXT
You have access to the user's CRM data.
Today's Date: {{date}}

# RULES
1. Never invent data. If you cannot find the answer in the provided context, state that explicitly.
2. Be concise and professional.
3. Always ask for confirmation before executing a destructive action (like deleting a contact).

# CONTEXT DATA
{{context_data}}
`
```

## 4. Prompt Evaluation
When modifying a core prompt, you must run it against a test suite of historical inputs to ensure you have not caused regression (e.g., the AI becoming overly verbose or refusing valid requests).
