# Task Tracker CLI 📝

A professional, lightweight command-line interface (CLI) application built with Node.js to help you track your daily tasks. This project demonstrates clean software architecture, ES Modules, and persistent data storage using JSON.
Project Idea from Roadmap.sh [task tracker](https://roadmap.sh/projects/task-tracker).

## 🚀 Getting Started

### Installation

**Quick Install (Recommended)**:
Install globally via npm to use the `task` command anywhere on your system:
```bash
npm install -g @notankit/task-tracker-cli
```

**Install from Source**:
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Task-Tracker-CLI
   ```

2. **Link the command globally**:
   This step allows you to run `task` from any folder in your terminal.
   ```bash
   npm link
   ```

---

## 📖 Detailed Command Reference

### 1. Adding Tasks
Create a new task to your to-do list. Every new task starts with the status `todo`.

- **Command**: `add`
- **Usage**: `task add "Your task description"`
- **Example**: 
  ```bash
  task add "Finish the Node.js project documentation"
  ```
- **Behavior**: Generates a unique ID and adds `createdAt` and `updatedAt` timestamps.

### 2. Listing Tasks
View your tasks. You can see everything or filter by a specific state.

- **Command**: `list`
- **Usage**: `task list [filter]`
- **Filters**: 
  - `all` (default): Shows every task.
  - `todo`: Shows tasks not yet started.
  - `in-progress`: Shows tasks currently being worked on.
  - `done`: Shows completed tasks.
- **Example**:
  ```bash
  task list in-progress
  ```

### 3. Updating Tasks
Modify the description of a task if your requirements change.

- **Command**: `update`
- **Usage**: `task update <id> "New description"`
- **Example**:
  ```bash
  task update 1 "Finish the Node.js project documentation and add examples"
  ```
- **Behavior**: Updates the text and refreshes the `updatedAt` timestamp.

### 4. Managing Status
Move tasks through your workflow lifecycle.

#### Mark as In-Progress
- **Command**: `mark-in-progress`
- **Usage**: `task mark-in-progress <id>`
- **Example**: `task mark-in-progress 1`

#### Mark as Done
- **Command**: `mark-done`
- **Usage**: `task mark-done <id>`
- **Example**: `task mark-done 1`

### 5. Deleting Tasks
Remove a task from your list permanently.

- **Command**: `delete`
- **Usage**: `task delete <id>`
- **Example**: `task delete 1`

---

## 🛠️ Technical Architecture

This project follows the **Separation of Concerns** principle, splitting the app into three distinct layers:

### 1. Interface Layer (`src/index.js`)
The "Entry Point." It handles:
- Command-line argument parsing via `process.argv`.
- Input validation (checking for missing IDs or descriptions).
- Formatting data for the console.

### 2. Logic Layer (`src/taskManager.js`)
The "Brain." It handles:
- Business rules (e.g., how to generate a unique ID).
- Data filtering logic.
- Coordinating between the user's request and the storage.

### 3. Storage Layer (`src/storage.js`)
The "Persistence." It handles:
- Reading and writing the `tasks.json` file.
- JSON serialization and deserialization.
- Ensuring the data file is created if it doesn't exist.

## 📊 Task Data Structure

Each task is stored as an object in `tasks.json` with the following properties:

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | Number | Unique identifier for the task. |
| `description` | String | The text description of the task. |
| `status` | String | Current state: `todo`, `in-progress`, or `done`. |
| `createdAt` | ISO Date | When the task was first created. |
| `updatedAt` | ISO Date | When the task was last modified. |

## 📝 License
ISC
