import React, {useState} from 'react';
import {Card, Button} from "react-bootstrap";
import {Project} from "../project.model";
import EditProjectForm from "./EditProjectForm";
import {EditProjectDto} from "../edit-project.dto";

interface ProjectProps {
    project: Project;
    onDeleteProject: (projectId: string) => void;
    onEditProject: (editProjectDto: EditProjectDto) => void;
    onChangeFilter: (filter: string) => void;
}

const ProjectForm: React.FC<ProjectProps> = props => {
    const [isEditable, setEditable] = useState<boolean>(false);
    let displayForm = null;
    const onEdit = () => {
        setEditable(!isEditable);
    };

    if (isEditable) {
        displayForm = (
            <EditProjectForm
                project={props.project}
                onSubmit={props.onEditProject}
                changeVisibility={onEdit}>
            </EditProjectForm>);

    } else {
        displayForm = (
            <Card
                border="info"
                text="info"
            >
                <Card.Body>
                    <Card.Title
                        onClick={() => props.onChangeFilter(props.project.title)}
                    >
                        {props.project.title}
                    </Card.Title>
                    <Card.Text>
                        {props.project.description}
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
                        onClick={props.onDeleteProject.bind(null, props.project.id)}
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

export default ProjectForm;