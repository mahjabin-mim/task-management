import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import type { Task, Subtask } from "../types/task";
import TaskCard from "../components/TaskCard";

export default function LandingPage () {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [subtasks, setSubtasks] = useState<Subtask[]>([]);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

    // useEffect(() => {
    //     fetch("http://localhost:3001/tasks")
    //         .then(res => res.json())
    //         .then(data => setTasks(data));

    //     fetch("http://localhost:3001/subtasks")
    //         .then(res => res.json())
    //         .then(data => setSubtasks(data));
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            const tasksRes = await fetch("http://localhost:3001/tasks");
            const tasksData = await tasksRes.json();
            setTasks(tasksData);

            const subtasksRes = await fetch("http://localhost:3001/subtasks");
            const subtasksData = await subtasksRes.json();
            setSubtasks(subtasksData);
        };

        fetchData();
    }, []);

    const addTask = async (task: Task) => {
        const res = await fetch("http://localhost:3001/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });

        const savedTask = await res.json();

        setTasks((prev) => [...prev, savedTask]);
    };

    const deleteTask = async (taskId: string) => {
        // setTasks((prev) => prev.filter((t) => t.id !== taskId));
        // setSubtasks((prev) => prev.filter((st) => st.taskId !== taskId));

        await fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: "DELETE",
        });

        setTasks(prev => prev.filter(t => t.id !== taskId));
    };

    const addSubtask = async (taskId: string, parentId : string | null, title : string) => {
        const newSubtask : Subtask = {
            id: crypto.randomUUID(),
            taskId,
            parentId,
            title,
        }
        // setSubtasks((prev) => [...prev, newSubtask]);

        const res = await fetch("http://localhost:3001/subtasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSubtask),
        });

        const saved = await res.json();
        setSubtasks(prev => [...prev, saved]);
    }

    // const deleteSubtaskWithChild = (id: string) => {
    //     setSubtasks((prev) => {
    //         let tasksCopy = [...prev];

    //         const dfs = async (currentId: string) => {
    //             const children = tasksCopy.filter((st) => st.parentId === currentId);
    //             for (const child of children) {
    //                 await dfs(child.id);
    //             }

    //             tasksCopy = tasksCopy.filter((st) => st.id !== currentId);
    //         };

    //         dfs(id);
    //         return tasksCopy;
    //     });
    // };

    const deleteSubtaskWithChild = async (id: string) => {
        let subtasksCopy = [...subtasks];

        const dfs = async (currentId: string) => {
            const children = subtasksCopy.filter(st => st.parentId === currentId);
            for (const child of children) {
                await dfs(child.id);
            }

            await fetch(`http://localhost:3001/subtasks/${currentId}`, { method: "DELETE" });

            subtasksCopy = subtasksCopy.filter(st => st.id !== currentId);
        };

        await dfs(id);
        setSubtasks(subtasksCopy);
    };

    const handleSelectTask = (taskId: string, isSelected: boolean) => {
        setSelectedTasks((prev) =>
            isSelected ? [...prev, taskId] : prev.filter(id => id !== taskId)
        );
    };
    
    return (
        <div className="container">
            <h1 className="title">Task Manager</h1>

            {/* <TaskForm onAddTask={(task) => setTasks((prev) => [...prev, task])} /> */}
            <TaskForm onAddTask={addTask} />

            <p className="count">Total Tasks: {tasks.length}</p>

            <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <button
                    className="delete-selected-btn" 
                    onClick={() => {
                        selectedTasks.forEach((taskId) => deleteTask(taskId));
                        setSelectedTasks([]); // clear selection
                    }}
                    >
                    Delete Selected
                </button>
            </div>
            
            <div className="card-grid">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        subtasks={subtasks.filter((st) => st.taskId === task.id)}
                        onDeleteTask={() => deleteTask(task.id)}
                        onAddSubtask={(parentId, title) => addSubtask(task.id, parentId, title)}
                        onDeleteSubtask={deleteSubtaskWithChild}
                        onSelectTask={handleSelectTask}
                        isSelected={selectedTasks.includes(task.id)}
                    />
                ))}
            </div>
        </div>
    )
}