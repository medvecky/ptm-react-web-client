import React, {useRef} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {Task} from "../task.model";

interface EditTaskProps {
    task: Task;
    onSubmit: (newText: string, taskId:string) => void;
    changeVisibility: () => void;
}

const EditTaskForm: React.FC<EditTaskProps> = (props) => {
    const textInputRef = useRef<HTMLInputElement>(null);
    const editTaskHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        props.onSubmit(enteredText, props.task.id);
        props.changeVisibility();
    };
    return (
        <div>
            <Card
                style={{
                    width: '18rem',
                    padding: '1%',
                    margin: '1rem'
                }}
                border="info"
                text="info"
            >
            <Form onSubmit={editTaskHandler}>
                <Form.Group controlId="formDescription">
                    <Form.Label>Task's description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task's description"
                        defaultValue={props.task.text}
                        ref={textInputRef}/>
                </Form.Group>
                <Button variant="outline-info" type="submit">
                    Save changes
                </Button>
            </Form>
            </Card>
        </div>
    );
};

export default EditTaskForm;