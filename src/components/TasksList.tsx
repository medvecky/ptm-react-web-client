import React from 'react';
import TaskForm from "./TaskForm";
import {EditTaskDto} from "../edit-task.dto";

interface TasksListProps {
    // @ts-ignore
    items: TaskForm [];
    onDeleteTask: (taskId: string) => void;
    onEditTask: (editTaskDto: EditTaskDto) => void;
}

const TasksList: React.FC<TasksListProps> = props => {

    return (
        <div>
            <ul style={{listStyleType: "none"}}>
                {props.items.map(task =>
                    <li key={task.id}>
                        <TaskForm task={task} onDeleteTask={props.onDeleteTask} onEditTask={props.onEditTask}/>
                    </li>)}
            </ul>
        </div>
    );
};

export default TasksList;