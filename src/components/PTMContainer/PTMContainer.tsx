import React, {useState} from "react";
import {Task} from "../../task.model";
import {CreateTaskDto} from "../../create-task.dto";
import {EditTaskDto} from "../../edit-task.dto";
import CreateTaskForm from "../CreateTaskForm";
import {updateProjectValues, updateTaskValues} from "./PtmContainerFunctions";
import {TaskStatus} from "../../task.status.enum";
import NavBar from "../NavBar";
import {Project} from "../../project.model";
import {CreateProjectDto} from "../../create-project.dto";
import {EditProjectDto} from "../../edit-project.dto";
import ListsContainer from "../ListsContainer";
import CreateProjectForm from "../CreateProjectForm";
import {Route, withRouter} from "react-router";


const PTMContainer: React.FC = (props) => {
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
        <CreateProjectForm onCreateProject={addProjectHandler} onClearFilter={setProjectFilter} />
    );

    const editTask = (props: any) => {
        console.log('editTask', props)
        return (
            <h1>Edit task</h1>
        );
    };


    console.log('PTMContainer',props);
    return (
        <div className='main'>
            <NavBar/>
            <Route path="/" exact component={lists}/>
            <Route path="/new-task" exact component={createTask}/>
            <Route path="/new-project" exact component={createProject}/>
            <Route path="/task/:id" exact component={editTask} />
        </div>
    );
};

export default withRouter(PTMContainer);