import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksList from "./components/TasksList";
import CreateTask from "./components/CreateTask";

const App: React.FC = () => {
    const tasks = [{id: 'Test task', text: 'Create proof of concept'}];

    const addTaskHandler = (text: string) => {
        console.log(text);
    };

    return (
        <div className="App">
            <h1>Todo app</h1>
            <TasksList items={tasks}/>
            <CreateTask onCreateTask={addTaskHandler} />
        </div>
    );
};

export default App;
