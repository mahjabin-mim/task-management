import { useCallback, useState } from "react"
import type { Task, Priority } from "../types/task";
import { users } from "../data/users"

interface Props {
  onAddTask: (task: Task) => void;
}

export default function TaskFrom ({ onAddTask }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<Priority>("low");
    const [deadline, setDeadline] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            const newTask: Task = {
                id: crypto.randomUUID(),
                title,
                description,
                type,
                deadline,
                assignedTo,
                createdAt: new Date().toISOString(),
            };

            onAddTask(newTask);

            setTitle("");
            setDescription("");
            //setType("");
            setDeadline("");
            setAssignedTo("");
        },

        [title, description, type, deadline, assignedTo, onAddTask] 
    );

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <select
                value={type}
                onChange={(e) => setType(e.target.value as Priority)}
                required
            >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>

            <input
                type="datetime-local"
                placeholder="Date Time"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
            />

            <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
            >
                <option value="" disabled>
                    Select Assigned To
                </option>
                {users.map((user) => (
                    <option key={user} value={user}>
                        {user}
                    </option>
                ))}
            </select>

            <br/>

            <button type="submit" className="add-btn">
                Add Task
            </button>
        </form>
    )
}