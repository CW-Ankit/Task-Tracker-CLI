import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * DATA LAYER (Persistence)
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Internal variable to hold the path. 
// We don't export it directly to prevent accidental modification.
let TASKS_FILE = path.join(__dirname, '..', 'tasks.json');

/**
 * setTasksFile(newPath)
 * Use Case: Primarily used by test suites to redirect storage to a temporary file.
 * @param {string} newPath - The absolute path to the JSON file.
 */
export function setTasksFile(newPath) {
  TASKS_FILE = newPath;
}

/**
 * load()
 */
export function load() {
  try {
    if (!fs.existsSync(TASKS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Storage Error: Could not load data. The JSON file might be corrupted.', error);
    return [];
  }
}

/**
 * save(data)
 */
export function save(data) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(TASKS_FILE, jsonString, 'utf8');
  } catch (error) {
    console.error('Storage Error: Could not save data to disk.', error);
  }
}
