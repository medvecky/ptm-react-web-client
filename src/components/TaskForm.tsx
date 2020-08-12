import React, {useState} from 'react';
import {Card, Button} from "react-bootstrap";
import {EditTaskDto} from "../edit-task.dto";
import {Task} from "../task.model";
import {Link} from "react-router-dom";
import EditTaskStatusForm from "./EditTaskStatusForm";

interface TaskProps {
    task: Task;
    onDeleteTask: (taskId: string) => void;
    onChangeTaskStatus: (editTaskDto: EditTaskDto) => void;
    projectName: string;
}

const TaskForm: React.FC<TaskProps> = props => {
    const [isEditable, setEditable] = useState<boolean>(false);
    let displayForm = null;
    const onEdit = () => {
        setEditable(!isEditable);
    };

    if (isEditable) {
        displayForm = (
            <EditTaskStatusForm
                task={props.task}
                onSubmit={props.onChangeTaskStatus}
                changeVisibility={onEdit}
                projectName={props.projectName}
            />);

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
                        {props.projectName}
                    </Card.Text>
                    <Card.Text>
                        {props.task.status}
                    </Card.Text>
                    { props.task.beginDate &&
                    <Card.Text>
                        Begin: {props.task.beginDate}
                    </Card.Text>
                    }
                    { props.task.endDate &&
                    <Card.Text>
                        End: {props.task.endDate}
                    </Card.Text>
                    }
                    <Button
                        style={{margin: '1%'}}
                        variant="outline-info"
                        onClick={() => onEdit()}
                        size='sm'
                    >
                        Change Status
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