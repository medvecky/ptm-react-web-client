import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Task} from "../../task.model";
import {CreateTaskDto} from "../../create-task.dto";
import {EditTaskDto} from "../../edit-task.dto";
import TasksList from "../TasksList";
import CreateTaskForm from "../CreateTaskForm";
import {updateProjectValues, updateTaskValues} from "./PtmContainerFunctions";
import {TaskStatus} from "../../task.status.enum";
import NavBar from "../NavBar";
import {Project} from "../../project.model";
import {CreateProjectDto} from "../../create-project.dto";
import CreateProjectForm from "../CreateProjectForm";
import {EditProjectDto} from "../../edit-project.dto";
import ProjectsList from "../ProjectsList";


const PTMContainer: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectFilter, setProjectFilter] = useState<string>('');

    const addTaskHandler = (createTaskDto: CreateTaskDto) => {
        setTasks(
            prevTasks =>
                [...prevTasks,
                    {
                        id: Math.random().toString(),
                        title: createTaskDto.title,
                        description: createTaskDto.description,
                        projectId: createTaskDto.projectId,
                        status: TaskStatus.OPEN
                    }
                ]
        );
    };

    const addProjectHandler = (createProjectDto: CreateProjectDto) => {
        setProjects(
            prevProjects =>
                [...prevProjects,
                    {
                        id: Math.random().toString(),
                        title: createProjectDto.title,
                        description: createProjectDto.description
                    }
                ]
        );
    };

    const editTaskHandler = (editTaskDto: EditTaskDto) => {
        const taskIndex = tasks.findIndex(task => task.id === editTaskDto.id);

        const task: Task = {...tasks[taskIndex]};
        updateTaskValues(editTaskDto, task);

        const newTasks = [...tasks];
        newTasks[taskIndex] = task;

        setTasks(newTasks);
    }

    const editProjectHandler = (editProjectDto: EditProjectDto) => {
        const projectIndex = projects.findIndex(project => project.id === editProjectDto.id);

        const project: Project = {...projects[projectIndex]};
        updateProjectValues(editProjectDto, project);

        const newProjects = [...projects];
        newProjects[projectIndex] = project;

        setProjects(newProjects);
    }

    const deleteTaskHandler = (taskId: string) => {
        setTasks(prevTasks => {
            return prevTasks.filter(task => task.id !== taskId);
        });
    };

    const deleteProjectHandler = (projectId: string) => {
        setProjects(prevProjects => {
            return prevProjects.filter(project => project.id !== projectId);
        });
    };

    return (
        <div className='main'>
            <NavBar />
            <Container
                style={{
                    margin: '0',
                    maxWidth: '100%'
                }}
            >
                <Row>
                    <Col xs={10} sm={3} lg={3}>
                        <TasksList
                            status='OPEN'
                            items={tasks}
                            onDeleteTask={deleteTaskHandler}
                            onEditTask={editTaskHandler}
                            project={projectFilter}
                        />
                    </Col>
                    <Col xs={10} sm={3} lg={3}>
                        <TasksList
                            status='IN_PROGRESS'
                            items={tasks}
                            onDeleteTask={deleteTaskHandler}
                            onEditTask={editTaskHandler}
                            project={projectFilter}
                        />
                    </Col>
                    <Col xs={10} sm={3} lg={3}>
                        <TasksList
                            status='DONE'
                            items={tasks}
                            onDeleteTask={deleteTaskHandler}
                            onEditTask={editTaskHandler}
                            project={projectFilter}
                        />
                    </Col>
                    <Col xs={10} sm={3} lg={3}>
                        <ProjectsList
                            items={projects}
                            onDeleteProject={deleteProjectHandler}
                            onEditProject={editProjectHandler}
                            onChangeFilter={setProjectFilter}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} sm={3} lg={3}>
                        <CreateTaskForm onCreateTask={addTaskHandler}/>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                    <Col xs={10} sm={3} lg={3}>
                        <CreateProjectForm
                            onCreateProject={addProjectHandler}
                            onClearFilter={setProjectFilter}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PTMContainer;