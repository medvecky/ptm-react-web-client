import React from 'react';
import {Card, Button} from "react-bootstrap";

interface TaskProps {
    task: {
        id: string,
        text: string
    }
}
const Task: React.FC<TaskProps> = props => {
    return (
        <div>
            <Card
                style={{width: '18rem'}}
                border="info"
                text="info"
            >
                <Card.Body>
                    <Card.Title>{props.task.id}</Card.Title>
                    <Card.Text>
                        {props.task.text}
                    </Card.Text>
                    <Button style={{margin: '1%'}} variant="outline-info">Edit </Button>
                    <Button variant="outline-info">Delete</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Task;