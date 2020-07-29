import React, {useRef} from 'react';
import {Form, Button, Card} from 'react-bootstrap';

interface CreateTaskProps {
    onCreateTask: (taskText: string) => void;
}

const CreateTask: React.FC<CreateTaskProps> = props => {
    const textInputRef = useRef<HTMLInputElement>(null);
    const createTaskHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        props.onCreateTask(enteredText);
    };
    return (
        <div>
            <Card
                style={{
                    width: '18rem',
                    padding: '1%',
                    margin: '2rem'
                }}
                border="info"
                text="info"
            >
                <Form onSubmit={createTaskHandler}>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Task's description</Form.Label>
                        <Form.Control type="text" placeholder="Enter task's description" ref={textInputRef}/>
                    </Form.Group>
                    <Button variant="outline-info" type="submit">
                        Create task
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default CreateTask;