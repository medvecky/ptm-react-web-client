import React from 'react';
import Task from "./Task";

interface TasksListProps {
    items: { id: string, text: string }[];
    onDeleteTask: (taskId: string) => void;
    onEditTask: (newText: string, taskId: string) => void;
}

const TasksList: React.FC<TasksListProps> = props => {

    return (
        <div>
            <ul style={{listStyleType: "none"}}>
                {props.items.map(task =>
                    <li key={task.id}>
                        <Task task={task} onDeleteTask={props.onDeleteTask} onEditTask={props.onEditTask}/>
                    </li>)}
            </ul>
        </div>
    );
};

export default TasksList;