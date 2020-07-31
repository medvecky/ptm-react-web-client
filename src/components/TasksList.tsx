import React from 'react';
import TaskForm from "./TaskForm";
import {EditTaskDto} from "../edit-task.dto";
import { Container, Row } from 'react-bootstrap';
import {Task} from "../task.model";

interface TasksListProps {
    // @ts-ignore
    items: Task [];
    onDeleteTask: (taskId: string) => void;
    onEditTask: (editTaskDto: EditTaskDto) => void;
    filter: string
}

const TasksList: React.FC<TasksListProps> = props => {

    return (
        <Container>
            <Row>
                {props.filter}
            </Row>
                {props.items
                    .filter(task => task.status === props.filter)
                    .map(task =>
                    <Row>
                        <TaskForm task={task} onDeleteTask={props.onDeleteTask} onEditTask={props.onEditTask}/>
                    </Row>)}
        </Container>
    );
};

export default TasksList;