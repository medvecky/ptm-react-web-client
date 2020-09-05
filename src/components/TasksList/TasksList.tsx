import React from 'react';
import TaskForm from "../TaskForm";
import {EditTaskDto} from "../../edit-task.dto";
import {Container, Row, Badge} from 'react-bootstrap';
import {Task} from "../../task.model";
import {filterTasks} from "./TaskListFunction";
import {Project} from "../../project.model";
import {useSelector} from 'react-redux';
import {selectProjectsFilter} from "../../store/projectsSlice";

interface TasksListProps {
    // @ts-ignore
    tasks: Task [];
    projects: Project [];
    onDeleteTask: (taskId: string) => void;
    onChangeTaskStatus: (editTaskDto: EditTaskDto) => void;
    status: string;
}


const TasksList: React.FC<TasksListProps> = props => {

    const project = useSelector(selectProjectsFilter);

    const taskListItems = filterTasks(props.tasks, project, props.status);

    const taskListElements = taskListItems.map(task => {

        const project = props.projects.find(project => project.id === task.projectId);

        const projectName = project?.title || '';

        return (<Row key={task.id}>
            <TaskForm
                task={task}
                onDeleteTask={props.onDeleteTask}
                onChangeTaskStatus={props.onChangeTaskStatus}
                projectName={projectName}
            />
        </Row>)
    });

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