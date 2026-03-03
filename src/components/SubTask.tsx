import { useState } from "react"

interface Props {
  onAdd: (subTaskTitle: string) => void;
}

export default function SubTask ({ onAdd }: Props) {
    const [subTaskTitle, setSubTaskTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(subTaskTitle);
        setSubTaskTitle("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="subtask-card"
                placeholder="Subtask title"
                value={subTaskTitle}
                onChange={(e) => setSubTaskTitle(e.target.value)}
                required
            >
            </input>

            <button type="submit" className="add-sub-btn">
                Add
            </button>
        </form>
    )
}