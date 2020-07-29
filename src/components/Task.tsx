import React, {useState} from 'react';
import {Card, Button} from "react-bootstrap";
import EditTaskForm from "./EditTaskForm";

interface TaskProps {
    task: {
        id: string,
        text: string
    };
    onDeleteTask: (taskId: string) => void;
    onEditTask: (newText: string, taskId: string) => void;
}

const Task: React.FC<TaskProps> = props => {
    const [isEditable,  setEditable] = useState<boolean>(false);
    let editForm = null;
    const onEdit = () => {
        setEditable(!isEditable);
    };

    if(isEditable) {
         editForm = (<EditTaskForm task={props.task} onSubmit={props.onEditTask} changeVisibility={onEdit}/>);

     }

    return (
        <div>
            <Card
                style={{
                    width: '18rem',
                    margin: '1rem'
                }}
                border="info"
                text="info"
            >
                <Card.Body>
                    <Card.Title>{props.task.id}</Card.Title>
                    <Card.Text>
                        {props.task.text}
                    </Card.Text>
                    <Button style={{margin: '1%'}} variant="outline-info" onClick={() =>onEdit()}>Edit </Button>
                    <Button
                        variant="outline-info"
                        onClick={props.onDeleteTask.bind(null, props.task.id)}
                    >
                        Delete
                    </Button>
                </Card.Body>
            </Card>
            {editForm}
        </div>
    );
};

export default Task;