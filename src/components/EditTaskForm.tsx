import React, {useRef} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {Task} from "../task.model";
import {EditTaskDto} from "../edit-task.dto";
import {TaskStatus} from "../task.status.enum";

interface EditTaskProps {
    task: Task;
    onSubmit: (editTaskDto: EditTaskDto) => void;
    changeVisibility: () => void;
}

const EditTaskForm: React.FC<EditTaskProps> = (props) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLSelectElement>(null);
    const projectRef = useRef<HTMLInputElement>(null);
    const editTaskHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const editTaskDto: EditTaskDto = {
            id: props.task.id,
            title: titleRef.current!.value,
            description: descriptionRef.current!.value,
            status: statusRef.current!.value,
            projectId: projectRef.current!.value
        };
        props.onSubmit(editTaskDto);
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
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." ref={statusRef}>
                        <option>Choose...</option>
                        <option>{TaskStatus.OPEN}</option>
                        <option>{TaskStatus.IN_PROGRESS}</option>
                        <option>{TaskStatus.DONE}</option>
                    </Form.Control>
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