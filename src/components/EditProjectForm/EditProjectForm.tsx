import React, {useRef} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {Project} from "../../project.model";
import {EditProjectDto} from "../../edit-project.dto";
import './EditProjectForm.css';

interface EditProjectProps {
    project: Project;
    onSubmit: (editProjectDto: EditProjectDto) => void;
    error: string;
}

const EditProjectForm: React.FC<EditProjectProps> = (props) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const editProjectHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const editProjectDto: EditProjectDto = {
            id: props.project.id,
            title: titleRef.current!.value,
            description: descriptionRef.current!.value
        };
        props.onSubmit(editProjectDto);
    };
    return (
        <Card
            className='EditProjectForm'
            border="info"
            text="info"
        >
            <Form onSubmit={editProjectHandler}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter projects's title"
                        defaultValue={props.project.title}
                        ref={titleRef}/>
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter project's description"
                        defaultValue={props.project.description}
                        ref={descriptionRef}/>
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

export default EditProjectForm;