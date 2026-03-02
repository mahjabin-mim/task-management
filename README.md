# Task Manager App
A **React TypeScript** project for managing tasks and subtasks with features like **nested subtasks, delete with DFS, dark/light theme**, and **JSON server persistence**.

# Features
  **1.	Task Management** <br/>
        o	Add, view, and delete tasks. <br/>
        o	Each task has: <br/>
            --	Title <br/>
            --	Description <br/>
            --	Type (Low, Medium, High) <br/>
            --	Assigned To <br/>
            --	Deadline <br/>
            --	Creation Time <br/>
  **2.	Subtask Management** <br/>
        o	Create multiple levels of subtasks (nested). <br/>
        o	Delete a subtask along with all its children using DFS. <br/>
        o	Add subtasks dynamically under any task or subtask. <br/>
  **3.	Bulk Selection** <br/>
        o	Check multiple tasks using checkboxes. <br/>
        o	Delete selected tasks together. <br/>
  **4.	Theme Toggle** <br/>
        o	Switch between dark and light mode. <br/>
        o	Persist theme preference using Zustand with persist middleware. <br/>
  **5.	JSON Server Integration** <br/>
        o	Store tasks and subtasks in a JSON database. <br/>
        o	Fetch tasks/subtasks on load. <br/>
        o	Add and delete tasks/subtasks with server sync. <br/>

# Key Concepts
•	**Lifting State Up**: TaskForm sends task data to LandingPage. <br/>
•	**Recursive Subtasks**: Nested subtasks handled using recursion. <br/>
•	**DFS Deletion**: Delete a subtask and all children. <br/>
•	**Persisted Theme**: Zustand + persist middleware saves dark/light preference. <br/>
•	**Server Sync**: Fetch, add, and delete tasks/subtasks from JSON server. <br/>

# Start JSON Server:
```bash
npx json-server --watch db.json --port 3001
```

# Start React app:
```bash
npm run dev
```

# Project Structure
    src/
    ├── components/
    │   ├── TaskForm.tsx
    │   ├── TaskCard.tsx
    │   └── Subtask.tsx
    ├── pages/
    │   └── LandingPage.tsx
    ├── services/
    │   └── TaskService.ts
    ├── store/
    │   └── themeStore.ts
    ├── types/
    	   └── task.ts


