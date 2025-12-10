# LeCoder AI - VS Code Extension

> **Less Code, More Creation.**

LeCoder AI is an agentic research coding assistant for VS Code that helps you reproduce research papers, orchestrate multiple AI agents, and run experiments on Google Colab—all from your editor.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS_Code-^1.85.0-007ACC?logo=visualstudiocode)](https://code.visualstudio.com/)
[![Node](https://img.shields.io/badge/Node-20.19.2-339933?logo=node.js)](https://nodejs.org/)

## 🎯 Vision

LeCoder AI bridges the gap between research papers and working implementations. Whether you're a researcher, student, or ML engineer, LeCoder helps you:

- 📄 **Ingest Research Papers**: Convert PDF/arXiv papers to structured markdown
- 🤖 **Orchestrate AI Agents**: Coordinate Claude Code, Gemini CLI, and Codex CLI agents
- 🔬 **Run Experiments**: Execute code on Google Colab via LeCoder-cGPU integration
- 🖥️ **Manage Sessions**: tmux-based orchestration for parallel agent workflows
- 💾 **Track Everything**: Local storage for tasks, costs, and project metadata

## ✨ Key Features (Planned)

### Phase 1: Foundation & Rebranding ✅
- Clean VS Code extension architecture
- LeCoder branding and workspace structure
- `.lecoder/` directory for local data storage

### Phase 2: Multi-Agent Orchestration (Coming Soon)
- Agent registry (Claude Code, Gemini CLI, Codex CLI)
- tmux session management
- Agent handoff and task decomposition

### Phase 3: Research Pipeline (Coming Soon)
- PDF/arXiv paper ingestion
- Markdown conversion with citation tracking
- Code extraction and analysis

### Phase 4: Google Colab Integration (Coming Soon)
- LeCoder-cGPU backend integration
- Remote code execution
- Resource monitoring and cost tracking

### Phase 5: Advanced Features (Coming Soon)
- Multi-agent collaboration
- Safety guardrails
- Share links (tmate integration)

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 20.19.2 or higher
- **pnpm**: 10.8.1 or higher
- **tmux**: For session orchestration (install via `brew install tmux` on macOS)
- **VS Code**: 1.85.0 or higher

### Installation from Source

```bash
# Clone the repository
git clone https://github.com/aryateja2106/lecoder-vscode.git
cd lecoder-vscode

# Install dependencies
pnpm install

# Build the extension
pnpm build

# Launch VS Code with the extension
# Press F5 in VS Code to open Extension Development Host
```

### Installation from Marketplace (Coming Soon)

Once published, you'll be able to install LeCoder AI directly from the VS Code Marketplace.

## 📖 Usage

### Initialize LeCoder Workspace

When you open a folder in VS Code with LeCoder installed, it automatically creates a `.lecoder/` directory with the following structure:

```
.lecoder/
├── agents.json          # Agent registry
├── tasks.json           # Task metadata
├── cost-logs.json       # Cost tracking logs
├── projects.json        # Project metadata
├── tmux-sessions.json   # Active tmux sessions
└── share-links.json     # tmate share links
```

### Basic Workflow (Coming in Phase 2+)

1. **Ingest a Paper**: Open Command Palette (⇧⌘P) → "LeCoder: Ingest Research Paper"
2. **Orchestrate Agents**: Create a task and assign agents from the sidebar
3. **Run Experiments**: Execute code on Google Colab with one click
4. **Track Progress**: Monitor agent activity, costs, and outputs in real-time

## 🏗️ Architecture

LeCoder is built on a modular architecture:

```
src/
├── agents/          # Agent registry and management
├── tmux/            # tmux session orchestration
├── research/        # Paper ingestion pipeline
├── storage/         # Local data persistence
├── orchestration/   # Task decomposition and handoff
├── colab/           # LeCoder-cGPU integration
├── ui/              # Webview panels
├── cost/            # Cost tracking
└── safety/          # Safety features
```

For detailed architecture documentation, see [ARCHITECTURE.md](ARCHITECTURE.md).

## 🛠️ Development

For detailed development instructions, see [DEVELOPMENT.md](DEVELOPMENT.md).

### Quick Development Setup

```bash
# Install dependencies
pnpm install

# Run linter
pnpm lint

# Run type checking
pnpm check-types

# Build the extension
pnpm build

# Clean build artifacts
pnpm clean
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📚 Documentation

- [Architecture Overview](ARCHITECTURE.md)
- [Development Guide](DEVELOPMENT.md)
- [Agent Configuration](docs/agents.md)
- [tmux Integration](docs/tmux.md)
- [Research Pipeline](docs/research-pipeline.md)

## 🔗 Related Projects

- [LeCoder-cGPU](https://github.com/aryateja2106/lecoder-cgpu) - Google Colab backend for remote execution
- [nested-learning](https://github.com/aryateja2106/nested-learning) - Research paper dataset and tools
- [LeSearch AI](https://lesearch.ai) - Main project website

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

LeCoder AI is forked from [Kilocode](https://github.com/Kilo-Org/kilocode), an excellent open-source coding agent. We're grateful to the Kilocode team for their foundational work.

## 📞 Contact

- **Website**: [lesearch.ai](https://lesearch.ai)
- **GitHub**: [@aryateja2106](https://github.com/aryateja2106)

---

**Version**: 0.1.0 (Foundation & Rebranding Phase)  
**Status**: Early Development  
**Last Updated**: December 2025
