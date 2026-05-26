import { test, describe, after } from 'node:test';
import assert from 'node:assert';
import path from 'path';
import fs from 'fs';
import * as storage from '../src/storage.js';
import * as taskManager from '../src/taskManager.js';

// Define a separate file for testing to avoid corrupting the real tasks.json
const TEST_FILE = path.join(process.cwd(), 'tests', 'test_tasks.json');

// Override the storage path to use the test file
storage.setTasksFile(TEST_FILE);

describe('Task Manager Logic Tests', () => {
  
  // Clean up the test file after all tests are finished
  after(() => {
    if (fs.existsSync(TEST_FILE)) {
      fs.unlinkSync(TEST_FILE);
    }
  });

  test('addTask() should add a new task and assign ID 1', () => {
    const task = taskManager.addTask('Test Task 1');
    assert.strictEqual(task.id, 1);
    assert.strictEqual(task.description, 'Test Task 1');
    assert.strictEqual(task.status, 'todo');
  });

  test('addTask() should increment IDs correctly', () => {
    taskManager.addTask('Test Task 2');
    const tasks = taskManager.listTasks('all');
    assert.strictEqual(tasks.length, 2);
    assert.strictEqual(tasks[1].id, 2);
  });

  test('listTasks() should filter by status', () => {
    // Set up a task as done
    const task = taskManager.addTask('Task to be done');
    taskManager.updateTaskStatus(task.id, 'done');
    
    const doneTasks = taskManager.listTasks('done');
    const todoTasks = taskManager.listTasks('todo');
    
    assert.ok(doneTasks.some(t => t.id === task.id));
    assert.ok(!todoTasks.some(t => t.id === task.id));
  });

  test('updateTask() should change the description', () => {
    const task = taskManager.addTask('Original Text');
    const updated = taskManager.updateTask(task.id, 'Updated Text');
    
    assert.strictEqual(updated.description, 'Updated Text');
    assert.ok(updated.updatedAt !== updated.createdAt);
  });

  test('deleteTask() should remove the task from storage', () => {
    const task = taskManager.addTask('Task to delete');
    const id = task.id;
    
    const success = taskManager.deleteTask(id);
    const tasks = taskManager.listTasks('all');
    
    assert.strictEqual(success, true);
    assert.ok(!tasks.some(t => t.id === id));
  });

  test('updateTaskStatus() should change task status', () => {
    const task = taskManager.addTask('Status Task');
    taskManager.updateTaskStatus(task.id, 'in-progress');
    
    const updatedTask = taskManager.listTasks('all').find(t => t.id === task.id);
    assert.strictEqual(updatedTask.status, 'in-progress');
  });

  test('Error Handling: should return null for non-existent task IDs', () => {
    const result = taskManager.updateTask(999, 'Doesn\'t matter');
    assert.strictEqual(result, null);
    
    const deleteResult = taskManager.deleteTask(999);
    assert.strictEqual(deleteResult, false);
  });
});
