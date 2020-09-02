import React, {useRef} from "react";
import './EditTaskForm.css'
import {Button, Card, Form} from "react-bootstrap";
import {Task} from "../../task.model";
import {EditTaskDto} from "../../edit-task.dto";
import {Project} from "../../project.model";

interface EditTaskProps {
    task: Task;
    onSubmit: (editTaskDto: EditTaskDto) => void;
    projects: Project [];
    error: string;
}

const EditTaskForm: React.FC<EditTaskProps> = (props) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const project = props.projects.find(project => project.id === props.task.projectId);

    const projectName = project?.title || '';

    const editTaskHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const editTaskDto: EditTaskDto = {
            id: props.task.id,
            title: titleRef.current!.value,
            description: descriptionRef.current!.value,
            status: props.task.status,
            projectId: props.task.projectId
        };
        props.onSubmit(editTaskDto);
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
                    <Form.Label>{projectName}</Form.Label>
                </Form.Group>
                {props.error &&
                <Form.Group controlId="error">
                    <Card border='danger' text='danger'>
                        <Card.Body>  {props.error} </Card.Body>
                    </Card>
                </Form.Group>
                }
                <Button variant="outline-info" type="submit" size='sm'>
                    Save changes
                </Button>
            </Form>
        </Card>
    );
};

export default EditTaskForm;