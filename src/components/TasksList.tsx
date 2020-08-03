import React from 'react';
import TaskForm from "./TaskForm";
import {EditTaskDto} from "../edit-task.dto";
import { Container, Row, Badge } from 'react-bootstrap';
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
        <Container
            style={{
                margin: '0',
                maxWidth: '100%'
            }}
        >
            <Row>
                <h4><Badge variant="info">{props.filter}</Badge></h4>
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