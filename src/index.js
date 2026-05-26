#!/usr/bin/env node

import * as taskManager from './taskManager.js';

/**
 * INTERFACE LAYER (CLI)
 * --------------------
 * This module is the only part of the app that interacts with the user.
 * Its responsibilities are:
 * 1. Parsing Command Line Arguments.
 * 2. Validating User Input (ensuring required arguments exist).
 * 3. Formatting the results from the Logic Layer into a human-readable format.
 */

/**
 * process.argv is an array containing the command line arguments.
 * Index 0: Node path
 * Index 1: Script path
 * Index 2+: Actual user input (e.g., 'add', 'list')
 * .slice(2) gives us only the user-provided parts.
 */
const args = process.argv.slice(2);

/**
 * The 'command' is the first word provided after 'task-cli'.
 * Example: task-cli add "Buy Milk" -> command is 'add'.
 */
const command = args[0];

/**
 * ROUTER
 * The switch statement directs the user's intent to the appropriate logic function.
 */
switch (command) {
  case 'add':
    /**
     * Use Case: User wants to add a new task.
     * Expected Input: task-cli add "Description"
     */
    const description = args[1];
    if (!description) {
      console.log('Error: Please provide a task description.');
      console.log('Usage: task-cli add "Task description"');
    } else {
      const task = taskManager.addTask(description);
      console.log(`Task added successfully (ID: ${task.id})`);
    }
    break;

  case 'list':
    /**
     * Use Case: User wants to see their tasks.
     * Expected Input: task-cli list [filter]
     * If no filter is provided, we default to 'all'.
     */
    const filter = args[1] || 'all';
    const tasks = taskManager.listTasks(filter);
    
    if (tasks.length === 0) {
      console.log(`No tasks found with status: ${filter}`);
    } else {
      console.log(`--- Task List (${filter}) ---`);
      tasks.forEach(task => {
        // Formatting output for readability: [ID] Description - Status
        console.log(`[${task.id}] ${task.description} - Status: ${task.status}`);
      });
    }
    break;

  case 'update':
    /**
     * Use Case: User wants to edit a task's text.
     * Expected Input: task-cli update <id> "New description"
     */
    const updateId = args[1];
    const newDesc = args[2];
    if (!updateId || !newDesc) {
      console.log('Error: Please provide both task ID and new description.');
      console.log('Usage: task-cli update <id> "New description"');
    } else {
      const updatedTask = taskManager.updateTask(updateId, newDesc);
      if (updatedTask) {
        console.log(`Task ${updateId} updated successfully.`);
      } else {
        console.log(`Error: Task with ID ${updateId} not found.`);
      }
    }
    break;

  case 'delete':
    /**
     * Use Case: User wants to remove a task.
     * Expected Input: task-cli delete <id>
     */
    const deleteId = args[1];
    if (!deleteId) {
      console.log('Error: Please provide a task ID to delete.');
      console.log('Usage: task-cli delete <id>');
    } else {
      const success = taskManager.deleteTask(deleteId);
      if (success) {
        console.log(`Task ${deleteId} deleted successfully.`);
      } else {
        console.log(`Error: Task with ID ${deleteId} not found.`);
      }
    }
    break;

  case 'mark-in-progress':
    /**
     * Use Case: User starts working on a task.
     * Expected Input: task-cli mark-in-progress <id>
     */
    const progressId = args[1];
    if (!progressId) {
      console.log('Error: Please provide a task ID.');
      console.log('Usage: task-cli mark-in-progress <id>');
    } else {
      const taskInProgress = taskManager.updateTaskStatus(progressId, 'in-progress');
      if (taskInProgress) {
        console.log(`Task ${progressId} marked as in-progress.`);
      } else {
        console.log(`Error: Task with ID ${progressId} not found.`);
      }
    }
    break;

  case 'mark-done':
    /**
     * Use Case: User completes a task.
     * Expected Input: task-cli mark-done <id>
     */
    const doneId = args[1];
    if (!doneId) {
      console.log('Error: Please provide a task ID.');
      console.log('Usage: task-cli mark-done <id>');
    } else {
      const taskDone = taskManager.updateTaskStatus(doneId, 'done');
      if (taskDone) {
        console.log(`Task ${doneId} marked as done.`);
      } else {
        console.log(`Error: Task with ID ${doneId} not found.`);
      }
    }
    break;

  default:
    /**
     * Fallback: If the user types a command that doesn't exist, 
     * or provides no command at all, we show the help manual.
     */
    console.log('Usage: task-cli <command> [arguments]');
    console.log('Commands:');
    console.log('  add "description"       - Add a new task');
    console.log('  list [filter]           - List tasks (filters: all, todo, in-progress, done)');
    console.log('  update <id> "desc"      - Update task description');
    console.log('  delete <id>             - Remove a task');
    console.log('  mark-in-progress <id>   - Set task status to in-progress');
    console.log('  mark-done <id>          - Set task status to done');
    break;
}
