import React, {useState} from 'react';
import {Card, Button} from "react-bootstrap";
import {EditTaskDto} from "../edit-task.dto";
import {Task} from "../task.model";
import {Link} from "react-router-dom";
import EditTaskStatusForm from "./EditTaskStatusForm";

interface TaskProps {
    task: Task;
    onDeleteTask: (taskId: string) => void;
    onEditTask: (editTaskDto: EditTaskDto) => void;
}

const TaskForm: React.FC<TaskProps> = props => {
    const [isEditable, setEditable] = useState<boolean>(false);
    let displayForm = null;
    const onEdit = () => {
        setEditable(!isEditable);
    };

    if (isEditable) {
        displayForm = (<EditTaskStatusForm task={props.task} onSubmit={props.onEditTask} changeVisibility={onEdit}/>);

    } else {
        displayForm = (
            <Card
                border="info"
                text="info"
            >
                <Card.Body>
                    <Card.Title
                        as={Link}
                        to={'/task/' + props.task.id}
                        key={props.task.id}
                        style={{
                            color: "lightseagreen"
                        }}
                    >
                        {props.task.title}
                    </Card.Title>
                    <Card.Text>
                        {props.task.description}
                    </Card.Text>
                    <Card.Text>
                        {props.task.projectId}
                    </Card.Text>
                    <Card.Text>
                        {props.task.status}
                    </Card.Text>
                    <Button
                        style={{margin: '1%'}}
                        variant="outline-info"
                        onClick={() => onEdit()}
                        size='sm'
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outline-info"
                        onClick={props.onDeleteTask.bind(null, props.task.id)}
                        size='sm'
                    >
                        Delete
                    </Button>
                </Card.Body>
            </Card>
        );
    }
    return (
        <div style={{
            width: '100%',
            margin: '1%'
        }}>
            {displayForm}
        </div>
    );
};

export default TaskForm;