import React, {useEffect} from "react";
import {CreateTaskDto} from "../../create-task.dto";
import {EditTaskDto} from "../../edit-task.dto";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import NavBar from "../NavBar";
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
import EditTaskProjectForm from "../EditTaskProjectForm/EditTaskProjectForm";
import {useSelector, useDispatch} from 'react-redux';
import {
    selectSystemError,
    setError,
    clearError,
    setChangedFlag,
    selectSystemIsChanged
} from '../../store/systemSlice';

import {selectTasksTasks, setTasks} from '../../store/tasksSlice';
import {selectProjectsProjects, setProjects} from '../../store/projectsSlice';
import {removeTokenFromStorage, saveTokenToStorage} from "./PTMContainerFunctions";

const axios = instance;

const PTMContainer: React.FC = (props) => {
    const history = useHistory();
    const token = localStorage.getItem('token');
    // @ts-ignore
    const expiresDate = new Date(localStorage.getItem('expirationDate'));
    const changeFlag = useSelector(selectSystemIsChanged);
    const systemError = useSelector(selectSystemError);
    const tasks = useSelector(selectTasksTasks);
    const projects = useSelector(selectProjectsProjects);
    const dispatch = useDispatch();


    useEffect(() => {
        if (token) {
            axios.get('/tasks', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
                .then(function (response) {
                    dispatch(clearError());
                    dispatch(setTasks(response.data));
                })
                .catch(function (error) {
                    dispatch(setError(error.toString()));
                });

            axios.get('/projects', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
                .then(function (response) {
                    dispatch(clearError());
                    dispatch(setProjects(response.data));
                })
                .catch(function (error) {
                    dispatch(setError(error.toString()));
                });
        }
    }, [changeFlag, token, dispatch]);


    const addTaskHandler = (createTaskDto: CreateTaskDto) => {
        if (createTaskDto.projectId) {
            createTaskWithProject(createTaskDto.title, createTaskDto.description, createTaskDto.projectId);
        } else {
            createTask(createTaskDto.title, createTaskDto.description);
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
                dispatch(clearError());
                dispatch(setChangedFlag());
                history.push('/');

            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
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
                dispatch(clearError());
                dispatch(setChangedFlag());
                history.push('/');

            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
            });
    };

    const addProjectHandler = (createProjectDto: CreateProjectDto) => {
        axios.post('/projects', {
            title: createProjectDto.title,
            description: createProjectDto.description
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(function (response) {
                dispatch(clearError());
                dispatch(setChangedFlag());
                history.push('/');
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
            });
    };

    const editTaskHandler = (editTaskDto: EditTaskDto) => {
        axios.patch(
            `/tasks/${editTaskDto.id}`,
            {
                title: editTaskDto.title,
                description: editTaskDto.description
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(function (response) {
                dispatch(clearError());
                dispatch(setChangedFlag());
                history.push('/');
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
            });
    }

    const changeTaskStatusHandler = (editTaskDto: EditTaskDto) => {
        axios.patch(
            `/tasks/${editTaskDto.id}/status`,
            {
                status: editTaskDto.status
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(function (response) {
                dispatch(clearError());
                dispatch(setChangedFlag());
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
            })
    }

    const editTaskProjectHandler = (taskId: string, projectId: string) => {
        axios.put(
            `/tasks/${taskId}/project`,
            {
                projectId: projectId
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(function (response) {
                dispatch(clearError());
                dispatch(setChangedFlag());
                history.push('/');
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
            });
    }

    const deleteTaskProjectHandler = (taskId: string) => {

        axios.delete(
            `/tasks/${taskId}/project`,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(function (response) {
                dispatch(clearError());
                dispatch(setChangedFlag());
                history.push('/');
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
            });
    }

    const editProjectHandler = (editProjectDto: EditProjectDto) => {
        axios.patch(
            `/projects/${editProjectDto.id}`,
            {
                title: editProjectDto.title,
                description: editProjectDto.description
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(function (response) {
                dispatch(clearError());
                dispatch(setChangedFlag());
                history.push('/');
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
            });
    }

    const deleteTaskHandler = (taskId: string) => {
        return axios.delete(`/tasks/${taskId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(function (response) {
                dispatch(clearError());
                dispatch(setChangedFlag());
            })
            .catch(function (error) {
                dispatch(setError(error.toString()));
            });
    };

    const deleteProjectHandler = (projectId: string) => {
        axios.delete(`/tasks/project_from_tasks/${projectId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(function (response) {
                dispatch(clearError());
                dispatch(setChangedFlag());
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
            });

        axios.delete(`/projects/${projectId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(function (response) {
                dispatch(clearError());
                dispatch(setChangedFlag());
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
            });
    };

    const signInHandler = (email: string, password: string) => {
        axios.post('/auth/signin', {
            username: email,
            password: password
        })
            .then(function (response) {
                saveTokenToStorage(response.data.accessToken);
                setTimeout(() => {
                    removeTokenFromStorage();
                    dispatch(setChangedFlag());
                }, 3600 * 1000);
                dispatch(setChangedFlag());
                dispatch(clearError());
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
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
                        saveTokenToStorage(response.data.accessToken);
                        // dispatch(setToken(response.data.accessToken));
                        dispatch(setChangedFlag());
                        dispatch(clearError());
                    })
                    .catch(function (error) {
                        if (error.response.data.message) {
                            dispatch(setError(error.response.data.message.toString()));
                        } else {
                            dispatch(setError(error.toString()));
                        }
                    });
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    dispatch(setError(error.response.data.message.toString()));
                } else {
                    dispatch(setError(error.toString()));
                }
            });
    };

    const signOutHandler = () => {
        // dispatch(clearToken());
        removeTokenFromStorage();
    };

    const lists = () => (
        <ListsContainer
            tasks={tasks}
            projects={projects}
            deleteTaskHandler={deleteTaskHandler}
            changeTaskStatusHandler={changeTaskStatusHandler}
            deleteProjectHandler={deleteProjectHandler}
            editProjectHandler={editProjectHandler}
            error={systemError}
        />
    );

    const createTaskForm = () => (
        <CreateTaskForm onCreateTask={addTaskHandler} error={systemError} projects={projects}/>
    );

    const createProjectForm = () => (
        <CreateProjectForm onCreateProject={addProjectHandler} error={systemError}/>
    );

    const editTaskForm = (props: any) => {
        // @ts-ignore
        const task = tasks.find(task => task.id === props.match.params.id)
        if (task) {
            return (
                <EditTaskForm task={task} projects={projects} onSubmit={editTaskHandler} error={systemError}/>
            );
        } else {
            return (
                <h4>Task with id: {props.match.params.id} not found</h4>
            );
        }
    };

    const editTaskProjectForm = (props: any) => {
        // @ts-ignore
        const task = tasks.find(task => task.id === props.match.params.id)
        if (task) {
            return (
                <EditTaskProjectForm
                    task={task}
                    projects={projects}
                    onEditTaskProject={editTaskProjectHandler}
                    onDeleteTaskProject={deleteTaskProjectHandler}
                    error={systemError
                    }
                />
            );
        } else {
            return (
                <h4>Task with id: {props.match.params.id} not found</h4>
            );
        }
    };

    const editProjectForm = (props: any) => {
        // @ts-ignore
        const project = projects.find(project => project.id === props.match.params.id)
        if (project) {
            return (
                <EditProjectForm project={project} onSubmit={editProjectHandler} error={systemError}/>
            );
        } else {
            return (
                <h4>Project with id: {props.match.params.id} not found</h4>
            );
        }
    };

    const signInForm = (props: any) => (
        <SignInForm onSingIn={signInHandler} error={systemError}/>
    );

    const signUpForm = (props: any) => (
        <SignUpForm onSingUp={signUpHandler} error={systemError}/>
    );

    let routes;

    console.log('Token ',token );

    if (token && expiresDate > new Date()) {
        routes = (
            <div className='main'>
                <NavBar onSignOut={signOutHandler}/>
                <Switch>
                    <Route path="/" exact component={lists}/>
                    <Route path="/new-task" exact component={createTaskForm}/>
                    <Route path="/new-project" exact component={createProjectForm}/>
                    <Route path="/task/:id" exact component={editTaskForm}/>
                    <Route path="/task/:id/project" exact component={editTaskProjectForm}/>
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