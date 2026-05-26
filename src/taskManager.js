import * as storage from './storage.js';

/**
 * LOGIC LAYER (Task Management)
 * -----------------------------
 * This module acts as the "brain" of the application. It doesn't care how 
 * the data is stored or how the user interacts with it; it only cares 
 * about the rules of managing tasks.
 */

/**
 * addTask(description)
 * Use Case: Creating a new task.
 * Functionality: 
 * - Loads existing tasks to calculate the next unique ID.
 * - Creates a task object with default status 'todo' and timestamps.
 * - Persists the new list via the storage layer.
 * @param {string} description - The text describing the task.
 * @returns {Object} The newly created task object.
 */
export function addTask(description) {
  const tasks = storage.load();
  
  // ID Generation: Find the ID of the last item and add 1. If list is empty, start at 1.
  const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  
  const newTask = {
    id,
    description,
    status: 'todo',
    createdAt: new Date().toISOString(), // Standard ISO format for dates
    updatedAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  storage.save(tasks);
  return newTask;
}

/**
 * listTasks(filter)
 * Use Case: Displaying tasks to the user, potentially filtered.
 * Functionality:
 * - Fetches all tasks.
 * - If a filter (todo, in-progress, done) is provided, it filters the array.
 * @param {string} filter - The status to filter by ('all', 'todo', 'in-progress', 'done').
 * @returns {Array} A filtered or complete list of tasks.
 */
export function listTasks(filter = 'all') {
  const tasks = storage.load();
  
  if (filter === 'all') {
    return tasks;
  }
  
  return tasks.filter(task => task.status === filter);
}

/**
 * updateTask(id, newDescription)
 * Use Case: Changing the text of an existing task.
 * Functionality:
 * - Finds the specific task by ID.
 * - Note: 'id' is parsed to Integer because CLI arguments come as strings.
 * - Updates the description and the 'updatedAt' timestamp.
 * @param {string|number} id - The unique ID of the task.
 * @param {string} newDescription - The updated text.
 * @returns {Object|null} The updated task or null if not found.
 */
export function updateTask(id, newDescription) {
  const tasks = storage.load();
  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) return null;

  task.description = newDescription;
  task.updatedAt = new Date().toISOString();
  
  storage.save(tasks);
  return task;
}

/**
 * deleteTask(id)
 * Use Case: Removing a task from the list permanently.
 * Functionality:
 * - Uses .filter() to create a new array excluding the task with the matching ID.
 * - Compares array lengths to determine if a task was actually removed.
 * @param {string|number} id - The unique ID of the task to delete.
 * @returns {boolean} True if deleted, false if the task didn't exist.
 */
export function deleteTask(id) {
  const tasks = storage.load();
  const initialLength = tasks.length;
  
  const filteredTasks = tasks.filter(t => t.id !== parseInt(id));
  
  if (filteredTasks.length === initialLength) return false; 

  storage.save(filteredTasks);
  return true;
}

/**
 * updateTaskStatus(id, status)
 * Use Case: Moving a task from 'todo' -> 'in-progress' -> 'done'.
 * Functionality:
 * - Locates the task and updates its status property.
 * - Updates the 'updatedAt' timestamp to track when the status changed.
 * @param {string|number} id - The unique ID of the task.
 * @param {string} status - The new status ('todo', 'in-progress', 'done').
 * @returns {Object|null} The updated task or null if not found.
 */
export function updateTaskStatus(id, status) {
  const tasks = storage.load();
  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) return null;

  task.status = status;
  task.updatedAt = new Date().toISOString();
  
  storage.save(tasks);
  return task;
}
