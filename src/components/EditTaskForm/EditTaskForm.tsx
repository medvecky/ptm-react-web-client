import React, {useRef} from "react";
import './EditTaskForm.css'
import {Button, Card, Form} from "react-bootstrap";
import {Task} from "../../task.model";
import {EditTaskDto} from "../../edit-task.dto";
import {useHistory} from "react-router";

interface EditTaskProps {
    task: Task;
    onSubmit: (editTaskDto: EditTaskDto) => void;
}

const EditTaskForm: React.FC<EditTaskProps> = (props) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const projectRef = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const editTaskHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const editTaskDto: EditTaskDto = {
            id: props.task.id,
            title: titleRef.current!.value,
            description: descriptionRef.current!.value,
            status: props.task.status,
            projectId: projectRef.current!.value
        };
        props.onSubmit(editTaskDto);
        history.push('/');
    };
    return (
        <Card
            className='EditTaskForm'
            border="info"
            text="info"
        >
            <Form onSubmit={editTaskHandler}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task's title"
                        defaultValue={props.task.title}
                        ref={titleRef}/>
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task's description"
                        defaultValue={props.task.description}
                        ref={descriptionRef}/>
                </Form.Group>
                <Form.Group controlId="formStatus">
                    <Form.Label>{props.task.status}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formProject">
                    <Form.Label>Project</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task's project"
                        defaultValue={props.task.projectId}
                        ref={projectRef}/>
                </Form.Group>
                <Button variant="outline-info" type="submit" size='sm'>
                    Save changes
                </Button>
            </Form>
        </Card>
    );
};

export default EditTaskForm;