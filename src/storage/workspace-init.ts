/**
 * LeCoder Workspace Initialization
 * 
 * This module handles the initialization of the .lecoder/ directory structure
 * for local data storage in the user's workspace.
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

interface LeCoderDataFile {
	version: string;
	data: unknown[];
}

const LECODER_DIR_NAME = '.lecoder';
const LECODER_VERSION = '0.1.0';

const DATA_FILES = [
	'agents.json',
	'tasks.json',
	'cost-logs.json',
	'projects.json',
	'tmux-sessions.json',
	'share-links.json'
];

/**
 * Initialize the .lecoder/ directory structure in the workspace root
 * @param workspaceRoot - Absolute path to the workspace root directory
 */
export async function initializeLeCoderWorkspace(workspaceRoot: string): Promise<void> {
	try {
		const lecoderDir = path.join(workspaceRoot, LECODER_DIR_NAME);
		
		// Create .lecoder directory if it doesn't exist
		await fs.mkdir(lecoderDir, { recursive: true });
		
		// Initialize each data file
		for (const file of DATA_FILES) {
			const filePath = path.join(lecoderDir, file);
			
			// Check if file already exists
			try {
				await fs.access(filePath);
				// File exists, skip initialization
				continue;
			} catch {
				// File doesn't exist, create it
				const initialData: LeCoderDataFile = {
					version: LECODER_VERSION,
					data: []
				};
				
				await fs.writeFile(
					filePath,
					JSON.stringify(initialData, null, 2),
					'utf-8'
				);
			}
		}
		
		console.log(`[LeCoder] Workspace initialized at: ${lecoderDir}`);
	} catch (error) {
		console.error('[LeCoder] Failed to initialize workspace:', error);
		throw error;
	}
}

/**
 * Check if a workspace has been initialized with LeCoder
 * @param workspaceRoot - Absolute path to the workspace root directory
 * @returns True if the .lecoder/ directory exists
 */
export async function isLeCoderWorkspaceInitialized(workspaceRoot: string): Promise<boolean> {
	try {
		const lecoderDir = path.join(workspaceRoot, LECODER_DIR_NAME);
		await fs.access(lecoderDir);
		return true;
	} catch {
		return false;
	}
}

/**
 * Get the path to the .lecoder/ directory
 * @param workspaceRoot - Absolute path to the workspace root directory
 * @returns Absolute path to the .lecoder/ directory
 */
export function getLeCoderDirectory(workspaceRoot: string): string {
	return path.join(workspaceRoot, LECODER_DIR_NAME);
}

/**
 * Get the path to a specific data file in .lecoder/
 * @param workspaceRoot - Absolute path to the workspace root directory
 * @param fileName - Name of the data file (e.g., 'agents.json')
 * @returns Absolute path to the data file
 */
export function getLeCoderDataFile(workspaceRoot: string, fileName: string): string {
	return path.join(workspaceRoot, LECODER_DIR_NAME, fileName);
}
