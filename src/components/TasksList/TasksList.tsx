import React from 'react';
import TaskForm from "../TaskForm";
import {EditTaskDto} from "../../edit-task.dto";
import {Container, Row, Badge} from 'react-bootstrap';
import {Task} from "../../task.model";
import {filterTasks} from "./TaskListFunction";
interface TasksListProps {
    // @ts-ignore
    items: Task [];
    onDeleteTask: (taskId: string) => void;
    onEditTask: (editTaskDto: EditTaskDto) => void;
    status: string;
    project: string;
}



const TasksList: React.FC<TasksListProps> = props => {

    const taskListItems = filterTasks(props.items, props.project, props.status);

    const taskListElements = taskListItems.map(task =>
        <Row>
            <TaskForm task={task} onDeleteTask={props.onDeleteTask} onEditTask={props.onEditTask}/>
        </Row>);

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
            {taskListElements}
        </Container>
    );
};

export default TasksList;