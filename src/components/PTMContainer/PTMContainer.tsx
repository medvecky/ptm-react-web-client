import React, {useState} from "react";
import {Task} from "../../task.model";
import {CreateTaskDto} from "../../create-task.dto";
import {EditTaskDto} from "../../edit-task.dto";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import {updateProjectValues, updateTaskValues} from "./PtmContainerFunctions";
import {TaskStatus} from "../../task.status.enum";
import NavBar from "../NavBar";
import {Project} from "../../project.model";
import {CreateProjectDto} from "../../create-project.dto";
import {EditProjectDto} from "../../edit-project.dto";
import ListsContainer from "../ListsContainer";
import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
import {Redirect, Route, Switch, withRouter} from "react-router";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import EditProjectForm from "../EditProjectForm/EditProjectForm";
import NavBarNoAuth from "../NavBarNoAuth";
import SignInForm from "../SignInForm/SignInForm";


const PTMContainer: React.FC = (props) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectFilter, setProjectFilter] = useState<string>('');
    const [token, setToken] = useState<string>('');

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

    const signInHandler = (login: string, password: string) => {
        if (login === 'admin' && password === 'admin') {
            setToken('xxxx');
        }
    };

    const signOutHandler = () => {
        setToken('');
    };

    const lists = () => (
        <ListsContainer
            tasks={tasks}
            projects={projects}
            projectFilter={projectFilter}
            deleteTaskHandler={deleteTaskHandler}
            editTaskHandler={editTaskHandler}
            deleteProjectHandler={deleteProjectHandler}
            editProjectHandler={editProjectHandler}
            setProjectFilter={setProjectFilter}
        />
    );

    const createTask = () => (
        <CreateTaskForm onCreateTask={addTaskHandler}/>
    );

    const createProject = () => (
        <CreateProjectForm onCreateProject={addProjectHandler} onClearFilter={setProjectFilter}/>
    );

    const editTask = (props: any) => {
        const task = tasks.find(task => task.id === props.match.params.id)
        if (task) {
            return (
                <EditTaskForm task={task} onSubmit={editTaskHandler}/>
            );
        } else {
            return (
                <h4>Task with id: {props.match.params.id} not found</h4>
            );
        }
    };

    const editProject = (props: any) => {
        console.log('editProject', props)
        const project = projects.find(project => project.id === props.match.params.id)
        if (project) {
            return (
                <EditProjectForm project={project} onSubmit={editProjectHandler}/>
            );
        } else {
            return (
                <h4>Project with id: {props.match.params.id} not found</h4>
            );
        }
    };

    const signIn = (props: any) => (
        <SignInForm onSingIn={signInHandler} />
    );

    let routes;

    if (token) {
        routes = (
            <div className='main'>
                <NavBar onSignOut={signOutHandler}/>
                <Switch>
                    <Route path="/" exact component={lists}/>
                    <Route path="/new-task" exact component={createTask}/>
                    <Route path="/new-project" exact component={createProject}/>
                    <Route path="/task/:id" exact component={editTask}/>
                    <Route path="/project/:id" exact component={editProject}/>
                    <Redirect from="/" to="/"/>
                    {/*<Route render={() => <h1>Not found</h1>}/>*/}
                </Switch>
            </div>
        );
    } else {
        routes = (
            <div className='main'>
                <NavBarNoAuth/>
                <Switch>
                    <Route path="/signin" exact component={signIn}/>
                    <Route path="/signup" exact component={signIn}/>
                    <Redirect from="/" to="/signin"/>
                </Switch>
            </div>
        );
    }

    return (
        routes
    );
};

export default withRouter(PTMContainer);