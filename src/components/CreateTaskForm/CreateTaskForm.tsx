import React, {useRef} from 'react';
import './CreateTask.css';
import {Form, Button, Card} from 'react-bootstrap';
import {CreateTaskDto} from "../../create-task.dto";
interface CreateTaskProps {
    onCreateTask: (createTaskDto: CreateTaskDto) => void;
    error: string;
}

const CreateTaskForm: React.FC<CreateTaskProps> = props => {
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const projectInputRef = useRef<HTMLInputElement>(null);
    const createTaskHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const createTaskDto: CreateTaskDto = {
            title: titleInputRef.current!.value,
            description: descriptionInputRef.current!.value,
            projectId: projectInputRef.current!.value
        };
        props.onCreateTask(createTaskDto);
    };

    const form = (
        <Card
            className='CreateTask'
            border="info"
            text="info"
        >
            <Form onSubmit={createTaskHandler}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter task's title" ref={titleInputRef}/>
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter task's description" ref={descriptionInputRef}/>
                </Form.Group>
                <Form.Group controlId="formProject">
                    <Form.Label>Project</Form.Label>
                    <Form.Control type="text" placeholder="Enter task's project" ref={projectInputRef}/>
                </Form.Group>
                <Button variant="outline-info" type="submit" size='sm'>
                    Create task
                </Button>
            </Form>
        </Card>
    );

    const formWithError = (
        <Card
            className='CreateTask'
            border="info"
            text="info"
        >
            <Form onSubmit={createTaskHandler}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter task's title" ref={titleInputRef}/>
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter task's description" ref={descriptionInputRef}/>
                </Form.Group>
                <Form.Group controlId="formProject">
                    <Form.Label>Project</Form.Label>
                    <Form.Control type="text" placeholder="Enter task's project" ref={projectInputRef}/>
                </Form.Group>
                <Form.Group controlId="error">
                    <Card border='danger' text='danger'>
                        <Card.Body>  {props.error} </Card.Body>
                    </Card>
                </Form.Group>
                <Button variant="outline-info" type="submit" size='sm'>
                    Create task
                </Button>
            </Form>
        </Card>
    );

    let resultForm;

    if(props.error) {
        resultForm = formWithError;
    } else {
        resultForm = form;
    }

    return (
      resultForm
    );
};

export default CreateTaskForm;