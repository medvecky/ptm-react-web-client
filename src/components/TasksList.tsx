import React from 'react';
import Task from "./Task";

interface TasksListProps {
    items: {id: string, text: string}[];
}

const TasksList: React.FC<TasksListProps> = props => {

    return (
        <ul style={{listStyleType: "none"}}>
            { props.items.map(task =>
                <li key={task.id}>
                    <Task task={task}/>
                </li>)}
        </ul>
    );
};

export default TasksList;