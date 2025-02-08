# Judge Judy Agent

[Follow on X](https://x.com/judge_agent)

[Chat with Judge Judy](https://bonapp.org/judge-judy-agent/chat)

[Ask Judge Judy to arbitrate](https://bonapp.org/judge-judy-agent/arbitrate)

## Setup

```
git clone https://github.com/BonAppResearch/judge-judy-agent.git
cd judge-judy-agent
git submodule update --init --recursive
```

See the respective README.md files for each submodule for more information.

## How it works

### Character

Judge Judy is deployed as an autonomous agent on Autonome with ElizaOS. The character's behavior and capabilities are defined in `judge-judy.character.json`, which includes:

- Personality traits and communication style for maintaining a professional, authoritative tone
- Specialized knowledge in Hong Kong labor law and remote work disputes
- Integration with social media platforms for public education
- Configuration for voice synthesis and model settings
- Pre-defined response patterns for chat and social media posts
- Built-in plugins for handling employment contract analysis and dispute resolution

### Knowledge

The character's knowledge is defined in `judge-judy.knowledge.json`. The chunks were generated by feeding the Hong Kong Employment Ordinance (Cap. 57) into an LLM.

### Chat

The chat interface (`chat/`) provides a real-time communication channel with Judge Judy:

- Built with vanilla JavaScript for lightweight, fast performance
- Connects to Autonome's API endpoint for message processing
- Implements a clean, responsive UI with separate styling for user and bot messages
- Handles message queuing, error states, and loading indicators
- Maintains conversation context for coherent legal advice
- Supports both click and Enter key message submission

### API

The API (`api/`) is built using a Next.js 14 + FastAPI hybrid architecture:

- Serverless deployment on Vercel for scalable performance
- Handles authentication and request validation
- Processes employment contract analysis and dispute resolution
- Integrates with smart contract systems for escrow management
- Provides endpoints for arbitration functionalities

### UI

The user interface (`ui/`) connects the various components through:

- Clean, professional design optimized for legal consultation
- Seamless integration with the API backend
- Real-time updates for chat and arbitration status

## Caveats

- We wished to use RAG for agent knowledge, but it's not supported on Autonome unless we deploy a custom docker image.
- We also had problems deploying on Autonome when the knowledge array was too large. To demo, we only selected a few chunks.
- Autonome deployment is often blocked by Twitter login, so we have deployed two different instances of the agent to handle chat and social media separately.
- Ideally employment contracts should be uploaded and stored by the agent, but we don't have a storage solution yet.
- In the future, we wish to implement ZK Email to ensure the authenticity of the arbitration documents submitted by the users.
- A more customized multisig contract tailor-made for the corresponding employment contract should be used in the future.

## Outlook

- We hope to expand Judge Judy's knowledge to include more jurisdictions and more laws.
- This project can be extended to a protocol guild style pledge where employers promise to use the protocol for arbitration.
- This protocol can be extended as a proof of employment protocol where employees can prove their employment on a decentralized version of Glassdoor.
