import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import TasksList from "./TasksList/TasksList";
import ProjectsList from "./ProjectsList";
import {Task} from "../task.model";
import {EditTaskDto} from "../edit-task.dto";
import {Project} from "../project.model";
import {EditProjectDto} from "../edit-project.dto";

type ListsContainerProps = {
    tasks: Task [];
    projects: Project [];
    deleteTaskHandler: (taskId: string) => void;
    changeTaskStatusHandler: (editTaskDto: EditTaskDto) => void;
    projectFilter: string;
    deleteProjectHandler: (projectId: string) => void;
    setProjectFilter: (project: string) => void;
    editProjectHandler: (editProjectDto: EditProjectDto) => void;
    error: string;
}

const ListsContainer: React.FC<ListsContainerProps> = (props) => {
    return (
        <Container
            style={{
                margin: '0',
                maxWidth: '100%'
            }}
        >
            {props.error &&
                <Row>
                    <Card border='danger' text='danger'>
                        <Card.Body>  {props.error} </Card.Body>
                    </Card>
                </Row>
            }
            <Row>
                <Col xs={10} sm={3} lg={3}>
                    <TasksList
                        status='OPEN'
                        items={props.tasks}
                        onDeleteTask={props.deleteTaskHandler}
                        onChangeTaskStatus={props.changeTaskStatusHandler}
                        project={props.projectFilter}
                    />
                </Col>
                <Col xs={10} sm={3} lg={3}>
                    <TasksList
                        status='IN_PROGRESS'
                        items={props.tasks}
                        onDeleteTask={props.deleteTaskHandler}
                        onChangeTaskStatus={props.changeTaskStatusHandler}
                        project={props.projectFilter}
                    />
                </Col>
                <Col xs={10} sm={3} lg={3}>
                    <TasksList
                        status='DONE'
                        items={props.tasks}
                        onDeleteTask={props.deleteTaskHandler}
                        onChangeTaskStatus={props.changeTaskStatusHandler}
                        project={props.projectFilter}
                    />
                </Col>
                <Col xs={10} sm={3} lg={3}>
                    <ProjectsList
                        items={props.projects}
                        onDeleteProject={props.deleteProjectHandler}
                        onEditProject={props.editProjectHandler}
                        onChangeFilter={props.setProjectFilter}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ListsContainer;