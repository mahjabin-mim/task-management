import type { Task, Subtask } from "../types/task";
import SubTask from "./SubTask";

interface Props {
  task: Task;
  subtasks: Subtask[];
  onDeleteTask: () => void;
  onAddSubtask: (parentId: string | null, subTaskTitle: string) => void;
  onDeleteSubtask: (id: string) => void;
  onSelectTask: (taskId: string, isSelected: boolean) => void; 
  isSelected: boolean;
}

export default function TaskCard ({ 
    task,
    subtasks,
    onDeleteTask,
    onAddSubtask,
    onDeleteSubtask, 
    isSelected,
    onSelectTask
}: Props) {
    const recursion = (parentId: string | null) => {
        return subtasks
        .filter((st) => st.parentId === parentId)
        .map((st) => (
            <div key={st.id} style={{ marginLeft: parentId ? 20 : 0 }}>
                <p>
                    {st.title}{" "}
                    <button onClick={() => onDeleteSubtask(st.id)} className="delete-btn-small">
                        x
                    </button>
                </p>
                
                <SubTask onAdd={(title) => onAddSubtask(st.id, title)} />
                {recursion(st.id)}
            </div>

        ))
    }

    return (
        <div className="card">
            <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => onSelectTask(task.id, e.target.checked)}
                style={{ marginBottom: 10 }}
            />

            <h3>{task.title}</h3>
            <p className="task-desc">{task.description}</p>
            <span className={`task-type ${task.type.toLowerCase()}`}>{task.type}</span>
            <p className="task-assigned">Assigned To:<strong>{task.assignedTo}</strong></p>
            <p className="date-time">Added: {new Date(task.createdAt).toLocaleString()}</p>
            <p className="date-time">Deadline: {new Date(task.deadline).toLocaleString()}</p>

            <SubTask onAdd={(subTaskTitle) => onAddSubtask(null, subTaskTitle)} />
            {recursion(null)}

            <button onClick={onDeleteTask} className="delete-btn" style={{ marginTop: 10 }}>
                Delete Task
            </button>
        </div>
    );
}