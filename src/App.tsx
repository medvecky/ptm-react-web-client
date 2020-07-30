import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksList from "./components/TasksList";
import CreateTask from "./components/CreateTask";
import {Task} from "./task.model";

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTaskHandler = (text: string) => {
        setTasks(prevTasks => [...prevTasks, {id: Math.random().toString(), text: text}]);
    };

    const editTaskHandler = (newText: string, taskId: string) => {
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        const task = {...tasks[taskIndex]};

        task.text = newText;
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
            <CreateTask onCreateTask={addTaskHandler} />
        </div>
    );
};

export default App;
