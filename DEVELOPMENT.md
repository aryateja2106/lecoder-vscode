# LeCoder AI Development Guide

Welcome to the LeCoder AI development guide! This document will help you set up your development environment and understand how to work with the codebase. Whether you're fixing bugs, adding features, or just exploring the code, this guide will get you started.

## About LeCoder AI

LeCoder AI is an agentic research coding assistant forked from [Kilocode](https://github.com/Kilo-Org/kilocode). While we've rebranded and are building research-focused features (paper ingestion, multi-agent orchestration, Google Colab integration), much of the underlying architecture, monorepo structure, and tooling is inherited from Kilocode. This guide reflects the LeCoder-specific workflow while acknowledging our Kilocode foundation.

## Prerequisites

Before you begin, choose one of the following development environment options:

### Option 1: Native Development (Recommended for MacOS/Linux/Windows Subsystem for Linux)

1. **Git** - For version control
2. **Git LFS** - For large file storage (https://git-lfs.com/) - Required for handling GIF, MP4, and other binary assets
3. **Node.js** (version [v20.19.2](https://github.com/aryateja2106/lecoder-vscode/blob/main/.nvmrc) recommended)
4. **pnpm** - Package manager (https://pnpm.io/)
5. **Visual Studio Code** - Our recommended IDE for development

### Option 2: Devcontainer (Recommended for Windows)

1. **Git** - For version control
2. **Git LFS** - For large file storage (https://git-lfs.com/) - Required for handling GIF, MP4, and other binary assets
3. **Docker Desktop** - For running the development container
4. **Visual Studio Code** - Our recommended IDE for development
5. **Dev Containers extension** - VSCode extension for container development

> **Note for Windows Contributors**: If you're having issues with WSL or want a standardized development environment, we recommend using the devcontainer option. It provides the exact same environment as our Nix flake configuration but works seamlessly on Windows without WSL.

### Option 3: Nix Flake (Recommended for NixOS/Nix users)

1. **Git** - For version control
2. **Git LFS** - For large file storage (https://git-lfs.com/) - Required for handling GIF, MP4, and other binary assets
3. **Nix** - The Nix package manager with flakes enabled
4. **direnv** - For automatic environment loading
5. **Visual Studio Code** - Our recommended IDE for development

## Getting Started

### Installation

#### Native Development Setup

1. **Fork and Clone the Repository**:

    - **Fork the Repository**:
        - Visit the [LeCoder AI GitHub repository](https://github.com/aryateja2106/lecoder-vscode)
        - Click the "Fork" button in the top-right corner to create your own copy.
    - **Clone Your Fork**:
        ```bash
        git clone https://github.com/[YOUR-USERNAME]/lecoder-vscode.git
        cd lecoder-vscode
        ```
        Replace `[YOUR-USERNAME]` with your actual GitHub username.

2. **Setup Git LFS**:

    ```bash
    git lfs install
    git lfs pull
    ```

    This ensures all large files (GIFs, MP4s, etc.) are properly downloaded.

3. **Install dependencies**:

    ```bash
    pnpm install
    ```

    This command will install dependencies for the main extension, webview UI, and e2e tests.

4. **Install VSCode Extensions**:
    - **Required**: [ESBuild Problem Matchers](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers) - Helps display build errors correctly.

While not strictly necessary for running the extension, these extensions are recommended for development:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Integrates ESLint into VS Code.
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Integrates Prettier into VS Code.

The full list of recommended extensions is [here](https://github.com/aryateja2106/lecoder-vscode/blob/main/.vscode/extensions.json)

#### Devcontainer Setup (Recommended for Windows)

1. **Prerequisites**:

    - Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
    - Install [Visual Studio Code](https://code.visualstudio.com/)
    - Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. **Fork and Clone the Repository** (same as above)

3. **Open in Devcontainer**:

    - Open the project in VSCode
    - When prompted, click "Reopen in Container" or use Command Palette: `Dev Containers: Reopen in Container`
    - Wait for the container to build and setup to complete (this may take a few minutes on first run)

4. **Start Development**:
    - All dependencies are automatically installed
    - All recommended VSCode extensions are pre-installed
    - Press F5 to start debugging the extension

#### Nix Flake Setup (Recommended for NixOS/Nix users)

1. **Prerequisites**:

    - Install [Nix](https://nixos.org/download.html) with flakes enabled
    - Install [direnv](https://direnv.net/) for automatic environment loading
    - Install [Visual Studio Code](https://code.visualstudio.com/)
    - (Optional) Install the [mkhl.direnv](https://marketplace.visualstudio.com/items?itemName=mkhl.direnv) VSCode extension for better direnv integration

2. **Fork and Clone the Repository** (same as above)

3. **Setup Development Environment**:

    ```bash
    cd lecoder-vscode
    direnv allow
    ```

    The project includes a [`.envrc`](.envrc) file that automatically loads the Nix flake environment when you enter the directory. This provides:

    - Node.js 20 (matching the version in `.nvmrc`)
    - pnpm (via corepack)
    - All other necessary development dependencies

4. **Install Project Dependencies**:

    ```bash
    pnpm install
    ```

5. **Install VSCode Extensions** (same as native development setup above)

6. **Start Development**:
    - Press F5 to start debugging the extension
    - The environment is automatically activated when you enter the project directory
    - No need to manually run `nix develop` - direnv handles this automatically

### Project Structure

The project is organized into several key directories:

- **`src/`** - Core extension code
    - **`core/`** - Core functionality and tools (from Kilocode)
    - **`services/`** - Service implementations (from Kilocode)
    - **`agents/`** - Agent registry and management (LeCoder - Phase 2)
    - **`tmux/`** - tmux session orchestration (LeCoder - Phase 2)
    - **`research/`** - Paper ingestion pipeline (LeCoder - Phase 3)
    - **`storage/`** - Local data persistence (LeCoder - Phase 1)
    - **`orchestration/`** - Task coordination (LeCoder - Phase 4)
    - **`colab/`** - Google Colab integration (LeCoder - Phase 6)
    - **`ui/`** - LeCoder-specific UI panels (Phase 7)
    - **`cost/`** - Cost tracking (LeCoder - Phase 9)
    - **`safety/`** - Safety features (LeCoder - Phase 10)
- **`webview-ui/`** - Frontend UI code
- **`e2e/`** - End-to-end tests
- **`scripts/`** - Utility scripts
- **`assets/`** - Static assets like images and icons
- **`.lecoder/`** - Local workspace data (created automatically, gitignored)

## Development Workflow

### Running the Extension

To run the extension in development mode:

1. Press `F5` (or select **Run** → **Start Debugging**) in VSCode
2. This will open a new VSCode window with LeCoder AI loaded

### Hot Reloading

- **Webview UI changes**: Changes to the webview UI will appear immediately without restarting
- **Core extension changes**: Changes to the core extension code will automatically reload the ext host

In development mode (NODE_ENV="development"), changing the core code will trigger a `workbench.action.reloadWindow` command, so it is no longer necessary to manually start/stop the debugger and tasks.

> **Important**: In production builds, when making changes to the core extension, you need to:
>
> 1. Stop the debugging process
> 2. Kill any npm tasks running in the background (see screenshot below)
> 3. Start debugging again

<img width="600" alt="Stopping background tasks" src="https://github.com/user-attachments/assets/466fb76e-664d-4066-a3f2-0df4d57dd9a4" />

### Building the Extension

To build a production-ready `.vsix` file:

```bash
pnpm build
```

This will:

1. Build the webview UI
2. Compile TypeScript
3. Bundle the extension
4. Create a `.vsix` file in the `bin/` directory

**LeCoder-Specific Note**: The build produces a `lecoder-vscode-*.vsix` file (not `kilo-code-*.vsix`). The extension name and branding reflect LeCoder AI throughout.

### Installing the Built Extension

To install your built extension:

```bash
code --install-extension "$(ls -1v bin/lecoder-vscode-*.vsix | tail -n1)"
```

**Note**: The filename pattern is `lecoder-vscode-*.vsix` for LeCoder AI builds.

## Testing

LeCoder AI uses several types of tests to ensure quality (inherited from Kilocode):

### Unit Tests

Run unit tests with:

```bash
pnpm test
```

This runs both extension and webview tests.

### End-to-End Tests

For more details on E2E tests, see [apps/vscode-e2e](apps/vscode-e2e/).

## Linting and Type Checking

Ensure your code meets our quality standards:

```bash
pnpm lint          # Run ESLint
pnpm check-types   # Run TypeScript type checking
```

## Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) to manage Git hooks, which automate certain checks before commits and pushes. The hooks are located in the `.husky/` directory.

### Pre-commit Hook

Before a commit is finalized, the `.husky/pre-commit` hook runs:

1.  **Branch Check**: Prevents committing directly to the `main` branch.
2.  **Type Generation**: Runs `pnpm --filter lecoder-vscode generate-types` (or inherited Kilocode command).
3.  **Type File Check**: Ensures that any changes made to type definition files are staged.
4.  **Linting**: Runs `lint-staged` to lint and format staged files.

### Pre-push Hook

Before changes are pushed to the remote repository, the `.husky/pre-push` hook runs:

1.  **Branch Check**: Prevents pushing directly to the `main` branch.
2.  **Compilation**: Runs `pnpm run check-types` to ensure typing is correct.
3.  **Changeset Check**: Checks if a changeset file exists in `.changeset/` and reminds you to create one using `npm run changeset` if necessary.

These hooks help maintain code quality and consistency. If you encounter issues with commits or pushes, check the output from these hooks for error messages.

## Troubleshooting

### Common Issues

1. **Extension not loading**: Check the VSCode Developer Tools (Help > Toggle Developer Tools) for errors
2. **Webview not updating**: Try reloading the window (Developer: Reload Window)
3. **Build errors**: Make sure all dependencies are installed with `pnpm install`
4. **Ripgrep missing**: We bundle `@vscode/ripgrep`, but if that binary is missing the extension will fall back to `rg` on your `PATH` (commonly `/opt/homebrew/bin/rg` on macOS) or the path set in `RIPGREP_PATH`.

### Debugging Tips

- Use `console.log()` statements in your code for debugging
- Check the Output panel in VSCode (View > Output) and select "LeCoder AI" from the dropdown
- For webview issues, use the browser developer tools in the webview (right-click > "Inspect Element")

### Testing with LeCoder-cGPU Backend

**Note**: LeCoder's Google Colab backend (LeCoder-cGPU) integration is planned for Phase 6. For now, the extension operates without a dedicated backend. Future documentation will cover testing against the LeCoder-cGPU backend once implemented.

## Contributing

We welcome contributions to LeCoder AI! Here's how you can help:

1. **Report an issue** using [GitHub Issues](https://github.com/aryateja2106/lecoder-vscode/issues)
2. **Find an issue** and submit a Pull Request with your fix
3. **Write tests** to improve code coverage
4. **Improve documentation** - Update README, ARCHITECTURE.md, or phase-specific docs
5. **Suggest a new feature** - Open a GitHub issue with the "enhancement" label
6. **Implement research features** - Help build the paper ingestion pipeline, agent orchestration, or Colab integration

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Community

Your contributions are welcome! For questions or ideas:
- **GitHub Issues**: https://github.com/aryateja2106/lecoder-vscode/issues
- **Email**: contact@lesearch.ai
- **Website**: https://lesearch.ai

We look forward to your contributions and feedback!

## Acknowledgments

LeCoder AI is built on the foundation of [Kilocode](https://github.com/Kilo-Org/kilocode). We're grateful to the Kilocode team for their excellent work on the base extension architecture.
