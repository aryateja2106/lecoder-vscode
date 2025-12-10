# LeCoder AI - Architecture Overview

## System Architecture

LeCoder AI is built on a layered architecture that separates concerns between agent management, orchestration, research pipeline, and UI components.

```
┌─────────────────────────────────────────────────────────┐
│                   VS Code Extension UI                   │
│                    (Webview Panels)                      │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                  Orchestration Layer                     │
│         (Task Decomposition & Agent Handoff)             │
└─────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼────────┐ ┌──────▼─────────┐ ┌──────▼───────────┐
│ Agent Registry │ │ tmux Sessions  │ │ Research Pipeline│
│ (Claude, etc.) │ │ (Orchestration)│ │ (Paper Ingestion)│
└────────────────┘ └────────────────┘ └──────────────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                   Storage Layer                          │
│            (.lecoder/ JSON Files)                        │
└─────────────────────────────────────────────────────────┘
                           │
                  ┌────────┴────────┐
                  │                 │
        ┌─────────▼──────────┐ ┌───▼──────────────┐
        │  LeCoder-cGPU      │ │  External APIs   │
        │  (Google Colab)    │ │  (arXiv, etc.)   │
        └────────────────────┘ └──────────────────┘
```

## Core Components

### 1. Extension Entry Point (`src/extension.ts`)
- Activates on workspace open or language event
- Initializes `.lecoder/` directory structure
- Registers commands and UI panels
- Manages extension lifecycle

### 2. Agent Management (`src/agents/`)
**Purpose**: Manage multiple AI coding agents (Claude Code, Gemini CLI, Codex CLI)

**Key Responsibilities**:
- Agent registration and configuration
- API key management
- Agent lifecycle (start, stop, restart)
- Status monitoring

**Planned Classes**:
```typescript
class AgentRegistry {
  registerAgent(config: AgentConfig): void
  getAgent(id: string): Agent
  listAgents(): Agent[]
}

class Agent {
  start(): Promise<void>
  stop(): Promise<void>
  execute(task: Task): Promise<Result>
}
```

### 3. tmux Orchestration (`src/tmux/`)
**Purpose**: Manage tmux sessions for parallel agent execution

**Key Responsibilities**:
- Create/destroy tmux sessions
- Pane management for multi-agent workflows
- Session persistence and recovery
- tmate integration for share links

**Planned Classes**:
```typescript
class TmuxSessionManager {
  createSession(name: string): TmuxSession
  attachAgent(agent: Agent, session: TmuxSession): void
  captureOutput(session: TmuxSession): string
}
```

### 4. Research Pipeline (`src/research/`)
**Purpose**: Ingest and process research papers

**Key Responsibilities**:
- PDF/arXiv download
- Markdown conversion
- Code extraction
- Citation tracking

**Planned Classes**:
```typescript
class PaperIngestion {
  downloadPaper(arxivId: string): Promise<Buffer>
  convertToMarkdown(pdf: Buffer): Promise<string>
  extractCode(markdown: string): CodeBlock[]
}
```

### 5. Orchestration Logic (`src/orchestration/`)
**Purpose**: Decompose tasks and coordinate agents

**Key Responsibilities**:
- Task decomposition into subtasks
- Agent assignment based on capabilities
- Inter-agent handoff
- Status tracking

**Planned Classes**:
```typescript
class TaskOrchestrator {
  decomposeTask(task: Task): SubTask[]
  assignAgent(subtask: SubTask): Agent
  handoff(from: Agent, to: Agent, context: Context): void
}
```

### 6. Storage Layer (`src/storage/`)
**Purpose**: Persist data locally in `.lecoder/` directory

**Key Responsibilities**:
- JSON file read/write
- Schema validation
- Data migration

**Data Files**:
- `agents.json` - Agent configurations
- `tasks.json` - Task metadata
- `cost-logs.json` - Cost tracking
- `projects.json` - Project metadata
- `tmux-sessions.json` - Active sessions
- `share-links.json` - tmate links

### 7. LeCoder-cGPU Integration (`src/colab/`)
**Purpose**: Execute code on Google Colab

**Key Responsibilities**:
- Backend communication
- Remote code execution
- Resource monitoring
- Cost tracking

### 8. UI Components (`src/ui/`)
**Purpose**: Provide interactive webview panels

**Planned Panels**:
- Agent Management Panel
- Task Dashboard
- Cost Tracker
- Settings Panel

### 9. Cost Tracking (`src/cost/`)
**Purpose**: Track API usage and costs

**Metrics**:
- Tokens used per agent
- API requests count
- Estimated costs
- Budget alerts

### 10. Safety Features (`src/safety/`)
**Purpose**: Prevent dangerous operations

**Guardrails**:
- Sensitive file detection
- Dangerous command detection
- User confirmation prompts
- Audit logging

## Data Flow

### Task Execution Flow
```
1. User creates task via UI
   ↓
2. Task stored in .lecoder/tasks.json
   ↓
3. Orchestrator decomposes task
   ↓
4. Agents assigned from registry
   ↓
5. tmux sessions created for each agent
   ↓
6. Agents execute in parallel
   ↓
7. Results collected and stored
   ↓
8. Costs logged to .lecoder/cost-logs.json
```

### Research Paper Flow
```
1. User provides arXiv ID or PDF
   ↓
2. Paper downloaded/uploaded
   ↓
3. Converted to Markdown
   ↓
4. Code blocks extracted
   ↓
5. Task created to reproduce paper
   ↓
6. Agents execute code
   ↓
7. Results compared to paper
```

## Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js 20.19.2
- **Package Manager**: pnpm 10.8.1
- **Build System**: Turbo + esbuild
- **Testing**: Vitest
- **Linting**: ESLint + Prettier
- **UI Framework**: React (for webviews)
- **Session Management**: tmux
- **Remote Execution**: Google Colab (via LeCoder-cGPU)

## Security Considerations

1. **API Key Storage**: Never store keys in code; use VS Code's SecretStorage API
2. **File Access**: Validate all file paths before read/write
3. **Command Execution**: Whitelist safe commands; prompt for dangerous ones
4. **Network Requests**: Validate URLs; use HTTPS only
5. **User Data**: Store in `.lecoder/`; add to `.gitignore`

## Performance Considerations

1. **Lazy Loading**: Load agents only when needed
2. **Caching**: Cache paper downloads and conversions
3. **Parallel Execution**: Use tmux for concurrent agent tasks
4. **Resource Limits**: Monitor memory and CPU usage
5. **Batch Operations**: Group API calls to reduce latency

## Future Enhancements

- **Multi-Agent Collaboration**: Agents can communicate directly
- **Learning from History**: Agents learn from past tasks
- **Custom Agent Templates**: Users can create custom agents
- **Cloud Sync**: Sync `.lecoder/` data across devices
- **Marketplace**: Share agent configurations and tasks

---

**Document Version**: 0.1.0  
**Last Updated**: December 2025  
**Status**: Phase 1 - Foundation Complete
