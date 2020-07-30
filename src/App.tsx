import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksList from "./components/TasksList";
import CreateTaskForm from "./components/CreateTaskForm";
import {Task} from "./task.model";
import {CreateTaskDto} from "./create-task.dto";
import {EditTaskDto} from "./edit-task.dto";

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTaskHandler = (createTaskDto: CreateTaskDto) => {
        setTasks(
            prevTasks =>
                [...prevTasks,
                    {
                        id: Math.random().toString(),
                        title: createTaskDto.title,
                        description: createTaskDto.description,
                        projectId: createTaskDto.projectId,
                        status: 'OPEN'
                    }
                ]
        );
    };

    const editTaskHandler = (editTaskDto: EditTaskDto) => {
        const taskIndex = tasks.findIndex(task => task.id === editTaskDto.id);

        const task = {...tasks[taskIndex]};

        if(editTaskDto.title) {
            task.title = editTaskDto.title;
        }

        if(editTaskDto.description) {
            task.description = editTaskDto.description;
        }

        if(editTaskDto.projectId) {
            task.projectId = editTaskDto.projectId;
        }

        if(editTaskDto.status) {
            task.status = editTaskDto.status;
        }

        const newTasks = [...tasks];
        newTasks[taskIndex] = task;

        setTasks(newTasks);
    }

    const deleteTaskHandler = (taskId: string) => {
        setTasks(prevTasks => {
            return prevTasks.filter(task => task.id !== taskId);
        });
    };

    return (
        <div>
            <h1>Todo app</h1>
            <TasksList items={tasks} onDeleteTask={deleteTaskHandler} onEditTask={editTaskHandler}/>
            <CreateTaskForm onCreateTask={addTaskHandler}/>
        </div>
    );
};

export default App;
