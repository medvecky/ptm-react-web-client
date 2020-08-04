import React from 'react';
import TaskForm from "./TaskForm";
import {EditTaskDto} from "../edit-task.dto";
import {Container, Row, Badge} from 'react-bootstrap';
import {Task} from "../task.model";

interface TasksListProps {
    // @ts-ignore
    items: Task [];
    onDeleteTask: (taskId: string) => void;
    onEditTask: (editTaskDto: EditTaskDto) => void;
    status: string;
    project: string;
}

const TasksList: React.FC<TasksListProps> = props => {

    let taskListItems;

    if (props.project) {
        taskListItems = (
            props.items
                .filter(task => task.status === props.status)
                .filter(task => task.projectId === props.project)
                .map(task =>
                    <Row>
                        <TaskForm task={task} onDeleteTask={props.onDeleteTask} onEditTask={props.onEditTask}/>
                    </Row>)
        );

    } else {
        taskListItems = (
            props.items
                .filter(task => task.status === props.status)
                .map(task =>
                    <Row>
                        <TaskForm task={task} onDeleteTask={props.onDeleteTask} onEditTask={props.onEditTask}/>
                    </Row>)
        );
    }

    return (
        <Container
            style={{
                margin: '0',
                maxWidth: '100%'
            }}
        >
            <Row>
                <h4><Badge variant="info">{props.status}</Badge></h4>
            </Row>
            {taskListItems}
        </Container>
    );
};

export default TasksList;