import React, {useRef} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {Project} from "../project.model";
import {EditProjectDto} from "../edit-project.dto";

interface EditProjectProps {
    project: Project;
    onSubmit: (editProjectDto: EditProjectDto) => void;
    changeVisibility: () => void;
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
        props.changeVisibility();
    };
    return (
        <Card
            style={{
                width: '100%',
                margin: '1%',
                padding: '1%'
            }}
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
                <Button variant="outline-info" type="submit" size='sm'>
                    Save changes
                </Button>
            </Form>
        </Card>
    );
};

export default EditProjectForm;