import React, {useState} from "react";
import {Task} from "../../task.model";
import {CreateTaskDto} from "../../create-task.dto";
import {EditTaskDto} from "../../edit-task.dto";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import {updateProjectValues, updateTaskValues} from "./PtmContainerFunctions";
import NavBar from "../NavBar";
import {Project} from "../../project.model";
import {CreateProjectDto} from "../../create-project.dto";
import {EditProjectDto} from "../../edit-project.dto";
import ListsContainer from "../ListsContainer";
import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
import {Redirect, Route, Switch, useHistory, withRouter} from "react-router";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import EditProjectForm from "../EditProjectForm/EditProjectForm";
import NavBarNoAuth from "../NavBarNoAuth";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import instance from '../../axios.config';

const axios = instance;

const PTMContainer: React.FC = (props) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectFilter, setProjectFilter] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [error, setError] = useState<string>('');
    const history = useHistory();

    const addTaskHandler = (createTaskDto: CreateTaskDto) => {
        if(createTaskDto.projectId) {
            createTask(createTaskDto.title, createTaskDto.description);
        } else {
            createTaskWithProject(createTaskDto.title, createTaskDto.description, createTaskDto.projectId);
        }
    };


    const createTask = (title: string, description: string) => {
        axios.post('/tasks', {
            title: title,
            description: description
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(function (response) {
                setError('');
                setTasks(
                    prevTasks =>
                        [...prevTasks,
                           response.data
                        ]
                );
                history.push('/');

            })
            .catch(function (error) {
                setError(error.response.data);
            });

    };

    const createTaskWithProject = (title: string, description: string, projectId: string) => {
        axios.post('/tasks', {
            title: title,
            description: description,
            projectId: projectId
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(function (response) {
                setError('');
                setTasks(
                    prevTasks =>
                        [...prevTasks,
                            response.data
                        ]
                );
                history.push('/');

            })
            .catch(function (error) {
                setError(error.response.data.message.toString());
            });
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

    const signInHandler = (email: string, password: string) => {
        axios.post('/auth/signin', {
            username: email,
            password: password
        })
            .then(function (response) {
                setToken(response.data.accessToken);
                setError('');
            })
            .catch(function (error) {
                setError(error.response.data.message.toString());
            });
    };

    const signUpHandler = (email: string, password: string) => {
        axios.post('/auth/signup', {
            username: email,
            password: password
        })
            .then(function (response) {
                axios.post('/auth/signin', {
                    username: email,
                    password: password
                })
                    .then(function (response) {
                        setToken(response.data.accessToken);
                        setError('');
                    })
                    .catch(function (error) {
                        setError(error.response.data.message.toString());
                    });
            })
            .catch(function (error) {
                setError(error.response.data.message.toString());
            });
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

    const createTaskForm = () => (
        <CreateTaskForm onCreateTask={addTaskHandler} error={error}/>
    );

    const createProjectForm = () => (
        <CreateProjectForm onCreateProject={addProjectHandler} onClearFilter={setProjectFilter}/>
    );

    const editTaskForm = (props: any) => {
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

    const editProjectForm = (props: any) => {
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

    const signInForm = (props: any) => (
        <SignInForm onSingIn={signInHandler} error={error}/>
    );

    const signUpForm = (props: any) => (
        <SignUpForm onSingUp={signUpHandler} error={error}/>
    );

    let routes;

    if (token) {
        routes = (
            <div className='main'>
                <NavBar onSignOut={signOutHandler}/>
                <Switch>
                    <Route path="/" exact component={lists}/>
                    <Route path="/new-task" exact component={createTaskForm}/>
                    <Route path="/new-project" exact component={createProjectForm}/>
                    <Route path="/task/:id" exact component={editTaskForm}/>
                    <Route path="/project/:id" exact component={editProjectForm}/>
                    <Redirect from="/" to="/"/>
                </Switch>
            </div>
        );
    } else {
        routes = (
            <div className='main'>
                <NavBarNoAuth/>
                <Switch>
                    <Route path="/signin" exact component={signInForm}/>
                    <Route path="/signup" exact component={signUpForm}/>
                    <Redirect from="/" to='/signin'/>
                </Switch>
            </div>
        );
    }

    return (
        routes
    );
};

export default withRouter(PTMContainer);