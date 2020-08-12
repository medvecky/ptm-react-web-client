import React, {useRef} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {Task} from "../task.model";
import {EditTaskDto} from "../edit-task.dto";
import {TaskStatus} from "../task.status.enum";

interface EditTaskStatusProps {
    task: Task;
    onSubmit: (editTaskDto: EditTaskDto) => void;
    changeVisibility: () => void;
    projectName: string;
}

const EditTaskStatusForm: React.FC<EditTaskStatusProps> = (props) => {
    const statusRef = useRef<HTMLSelectElement>(null);
    const editTaskHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const editTaskDto: EditTaskDto = {
            id: props.task.id,
            title: props.task.title,
            description: props.task.description,
            status: statusRef.current!.value,
            projectId: props.task.projectId
        };
        props.onSubmit(editTaskDto);
        props.changeVisibility();
    };
    return (
        <Card
            style={{
                width: '100%',
                margin: '1%',
                padding: '2%'
            }}
            border="info"
            text="info"
        >
            <Form onSubmit={editTaskHandler}>
                <Form.Group>
                    <Form.Label>{props.task.title}</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>{props.task.description}</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>{props.projectName}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formStatus">
                    <Form.Control as="select" defaultValue={props.task.status} ref={statusRef}>
                        <option>{TaskStatus.OPEN}</option>
                        <option>{TaskStatus.IN_PROGRESS}</option>
                        <option>{TaskStatus.DONE}</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="outline-info" type="submit" size='sm'>
                    Save changes
                </Button>
            </Form>
        </Card>
    );
};

export default EditTaskStatusForm;