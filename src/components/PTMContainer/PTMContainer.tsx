import React, {useEffect, useState} from "react";
import {Task} from "../../task.model";
import {CreateTaskDto} from "../../create-task.dto";
import {EditTaskDto} from "../../edit-task.dto";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
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
import EditTaskProjectForm from "../EditTaskProjectForm/EditTaskProjectForm";

const axios = instance;

const PTMContainer: React.FC = (props) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectFilter, setProjectFilter] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [changeFlag, setChangeFlag] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        if (token) {
            axios.get('/tasks', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
                .then(function (response) {
                    setError('');
                    setTasks(response.data);
                })
                .catch(function (error) {
                    setError(error.toString());
                });

            axios.get('/projects', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
                .then(function (response) {
                    setError('');
                    setProjects(response.data);
                })
                .catch(function (error) {
                    setError(error.toString());
                });
        }
    }, [changeFlag, token]);


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
                setError('');
                setTasks(
                    prevTasks =>
                        [...prevTasks,
                            response.data
                        ]
                );
                setChangeFlag(prevState => !prevState);
                history.push('/');

            })
            .catch(function (error) {
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
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
                setError('');
                setChangeFlag(prevState => !prevState);
                history.push('/');

            })
            .catch(function (error) {
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
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
                setError('');
                setChangeFlag(prevState => !prevState);
                history.push('/');
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
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
                setError('');
                setChangeFlag(prevState => !prevState);
                history.push('/');
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
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
                setError('');
                setChangeFlag(prevState => !prevState);
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
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
                setError('');
                setChangeFlag(prevState => !prevState);
                history.push('/');
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
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
                setError('');
                setChangeFlag(prevState => !prevState);
                history.push('/');
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
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
                setError('');
                setChangeFlag(prevState => !prevState);
                history.push('/');
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
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
                setError('');
                setChangeFlag(prevState => !prevState);
            })
            .catch(function (error) {
                setError(error.toString());
            });
    };

    const deleteProjectHandler = (projectId: string) => {
        axios.delete(`/tasks/project_from_tasks/${projectId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(function (response) {
                setError('');
                setChangeFlag(prevState => !prevState);
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
                }
            });

        axios.delete(`/projects/${projectId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(function (response) {
                setError('');
                setChangeFlag(prevState => !prevState);
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
                }
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
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
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
                        setToken(response.data.accessToken);
                        setError('');
                    })
                    .catch(function (error) {
                        if (error.response.data.message) {
                            setError(error.response.data.message.toString());
                        } else {
                            setError(error.toString());
                        }
                    });
            })
            .catch(function (error) {
                if (error.response.data.message) {
                    setError(error.response.data.message.toString());
                } else {
                    setError(error.toString());
                }
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
            changeTaskStatusHandler={changeTaskStatusHandler}
            deleteProjectHandler={deleteProjectHandler}
            editProjectHandler={editProjectHandler}
            setProjectFilter={setProjectFilter}
            error={error}
        />
    );

    const createTaskForm = () => (
        <CreateTaskForm onCreateTask={addTaskHandler} error={error} projects={projects}/>
    );

    const createProjectForm = () => (
        <CreateProjectForm onCreateProject={addProjectHandler} onClearFilter={setProjectFilter} error={error}/>
    );

    const editTaskForm = (props: any) => {
        const task = tasks.find(task => task.id === props.match.params.id)
        if (task) {
            return (
                <EditTaskForm task={task} projects={projects} onSubmit={editTaskHandler} error={error}/>
            );
        } else {
            return (
                <h4>Task with id: {props.match.params.id} not found</h4>
            );
        }
    };

    const editTaskProjectForm = (props: any) => {
        const task = tasks.find(task => task.id === props.match.params.id)
        if (task) {
            return (
                <EditTaskProjectForm
                    task={task}
                    projects={projects}
                    onEditTaskProject={editTaskProjectHandler}
                    onDeleteTaskProject={deleteTaskProjectHandler}
                    error={error}
                />
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
                <EditProjectForm project={project} onSubmit={editProjectHandler} error={error}/>
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