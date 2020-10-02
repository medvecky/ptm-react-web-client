import React, {useRef} from "react";
import './EditTaskProjectForm.css'
import {Button, Card, Form} from "react-bootstrap";
import {Task} from "../../task.model";
import {Project} from "../../project.model";

interface EditTaskProjectProps {
    task: Task;
    onEditTaskProject: (taskId: string, projectId: string) => void;
    onDeleteTaskProject: (taskId: string) => void;
    projects: Project [];
    error: string;
}

const EditTaskProjectForm: React.FC<EditTaskProjectProps> = (props) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const projectInputRef = useRef<HTMLSelectElement>(null);

    const selectProjectFormControl = props.projects.map(project => {

            if (project.id === props.task.projectId) {
                return (
                    <option key={project.id} value={project.id} selected>{project.title}</option>
                );
            } else {
                return (
                    <option key={project.id} value={project.id}>{project.title}</option>
                );
            }
        }
    );

    const editTaskProjectHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if(projectInputRef.current!.value) {
            const projectId = projectInputRef.current!.value;
            props.onEditTaskProject(props.task.id, projectId);
        } else {
            props.onDeleteTaskProject(props.task.id);
        }
    };
    return (
        <Card
            className='EditTaskProjectForm'
            border="info"
            text="info"
        >
            <Form onSubmit={editTaskProjectHandler}>
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
                    <Form.Control as="select" custom ref={projectInputRef}>
                        <option value=''>none</option>
                        {selectProjectFormControl}
                    </Form.Control>
                </Form.Group>
                {props.error &&
                <Form.Group controlId="error">
                    <Card border='danger' text='danger'>
                        <Card.Body>{props.error}</Card.Body>
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

export default EditTaskProjectForm;