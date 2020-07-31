import React, {useState} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Task} from "../../task.model";
import {CreateTaskDto} from "../../create-task.dto";
import {EditTaskDto} from "../../edit-task.dto";
import TasksList from "../TasksList";
import CreateTaskForm from "../CreateTaskForm";
import {updateTaskValues} from "./PtmContainerFunctions";


const PTMContainer: React.FC = () => {
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

        const task: Task = {...tasks[taskIndex]};
        updateTaskValues(editTaskDto, task);

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
        <div className='main'>
            <Container>
                <Row>
                    <h3>Todo app</h3>
                </Row>
                <Row>
                    <Col xs={10} sm={4} lg={4}>
                        <TasksList
                            filter='OPEN'
                            items={tasks}
                            onDeleteTask={deleteTaskHandler}
                            onEditTask={editTaskHandler}
                        />
                    </Col>
                    <Col xs={10} sm={4} lg={4}>
                        <TasksList
                            filter='IN_PROGRESS'
                            items={tasks}
                            onDeleteTask={deleteTaskHandler}
                            onEditTask={editTaskHandler}
                        />
                    </Col>
                    <Col xs={10} sm={4} lg={4}>
                        <TasksList
                            filter='DONE'
                            items={tasks}
                            onDeleteTask={deleteTaskHandler}
                            onEditTask={editTaskHandler}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} sm={4} lg={4}>
                        <CreateTaskForm onCreateTask={addTaskHandler}/>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PTMContainer;