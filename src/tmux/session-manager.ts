import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface TmuxWindow {
  name: string;
  agentType?: string;
  command?: string;
}

export interface TmuxSession {
  sessionName: string;
  projectName: string;
  createdAt: string;
  windows: TmuxWindow[];
}

export class TmuxSessionManager {
  /**
   * Creates a new tmux session with the naming convention lecoder-{projectName}
   */
  async createSession(projectName: string, workspaceRoot: string): Promise<string> {
    const sessionName = `lecoder-${projectName}`;

    try {
      // Check if session already exists
      const { stdout: existingSessions } = await execAsync('tmux list-sessions -F "#{session_name}"');
      if (existingSessions.includes(sessionName)) {
        throw new Error(`Session ${sessionName} already exists`);
      }

      // Create new detached session
      await execAsync(`tmux new-session -d -s "${sessionName}" -c "${workspaceRoot}"`);

      return sessionName;
    } catch (error: any) {
      if (error.message.includes('command not found') || error.message.includes('tmux: not found')) {
        throw new Error('tmux is not installed. Please install tmux to use this feature.');
      }
      throw error;
    }
  }

  /**
   * Creates a new window in an existing tmux session
   */
  async createWindow(
    sessionName: string,
    windowName: string,
    command?: string,
    workingDir?: string
  ): Promise<void> {
    try {
      let createCommand = `tmux new-window -t "${sessionName}" -n "${windowName}"`;

      if (workingDir) {
        createCommand += ` -c "${workingDir}"`;
      }

      await execAsync(createCommand);

      // If command provided, execute it in the new window
      if (command) {
        await this.sendKeys(sessionName, windowName, command);
      }
    } catch (error: any) {
      throw new Error(`Failed to create window ${windowName}: ${error.message}`);
    }
  }

  /**
   * Sends keys (commands) to a specific window in a session
   */
  async sendKeys(sessionName: string, windowName: string, keys: string): Promise<void> {
    try {
      // C-m sends Enter key
      await execAsync(`tmux send-keys -t "${sessionName}:${windowName}" "${keys}" C-m`);
    } catch (error: any) {
      throw new Error(`Failed to send keys to ${sessionName}:${windowName}: ${error.message}`);
    }
  }

  /**
   * Lists all active LeCoder tmux sessions
   */
  async listSessions(): Promise<string[]> {
    try {
      const { stdout } = await execAsync('tmux list-sessions -F "#{session_name}"');
      const allSessions = stdout.trim().split('\n').filter(s => s);

      // Filter only LeCoder sessions
      return allSessions.filter(name => name.startsWith('lecoder-'));
    } catch (error: any) {
      // If no sessions exist, tmux returns error
      if (error.message.includes('no server running')) {
        return [];
      }
      throw error;
    }
  }

  /**
   * Gets detailed information about a specific session
   */
  async getSessionInfo(sessionName: string): Promise<TmuxWindow[]> {
    try {
      const { stdout } = await execAsync(
        `tmux list-windows -t "${sessionName}" -F "#{window_name}"`
      );

      const windowNames = stdout.trim().split('\n').filter(n => n);
      return windowNames.map(name => ({ name }));
    } catch (error: any) {
      throw new Error(`Failed to get session info for ${sessionName}: ${error.message}`);
    }
  }

  /**
   * Attaches to an existing tmux session (returns command for terminal execution)
   */
  getAttachCommand(sessionName: string): string {
    return `tmux attach-session -t "${sessionName}"`;
  }

  /**
   * Kills a tmux session and cleans up metadata
   */
  async killSession(sessionName: string): Promise<void> {
    try {
      await execAsync(`tmux kill-session -t "${sessionName}"`);
    } catch (error: any) {
      if (!error.message.includes('no server running') && !error.message.includes("can't find session")) {
        throw new Error(`Failed to kill session ${sessionName}: ${error.message}`);
      }
      // Session doesn't exist, consider it successful
    }
  }

  /**
   * Kills all LeCoder tmux sessions
   */
  async killAllLeCoderSessions(): Promise<void> {
    const sessions = await this.listSessions();

    for (const sessionName of sessions) {
      await this.killSession(sessionName);
    }
  }

  /**
   * Checks if a specific session exists
   */
  async sessionExists(sessionName: string): Promise<boolean> {
    try {
      await execAsync(`tmux has-session -t "${sessionName}"`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sets working directory for a window
   */
  async setWorkingDirectory(sessionName: string, windowName: string, directory: string): Promise<void> {
    await this.sendKeys(sessionName, windowName, `cd "${directory}"`);
  }

  /**
   * Renames a window
   */
  async renameWindow(sessionName: string, oldName: string, newName: string): Promise<void> {
    try {
      await execAsync(`tmux rename-window -t "${sessionName}:${oldName}" "${newName}"`);
    } catch (error: any) {
      throw new Error(`Failed to rename window: ${error.message}`);
    }
  }

  /**
   * Gets the current pane content for a window
   */
  async getPaneContent(sessionName: string, windowName: string): Promise<string> {
    try {
      const { stdout } = await execAsync(
        `tmux capture-pane -t "${sessionName}:${windowName}" -p`
      );
      return stdout;
    } catch (error: any) {
      throw new Error(`Failed to capture pane content: ${error.message}`);
    }
  }

  /**
   * Clears the pane content for a window
   */
  async clearPane(sessionName: string, windowName: string): Promise<void> {
    await this.sendKeys(sessionName, windowName, 'clear');
  }
}
