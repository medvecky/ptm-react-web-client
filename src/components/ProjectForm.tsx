import React from 'react';
import {Card, Button} from "react-bootstrap";
import {Project} from "../project.model";
import {EditProjectDto} from "../edit-project.dto";
import {Link} from "react-router-dom";

interface ProjectProps {
    project: Project;
    onDeleteProject: (projectId: string) => void;
    onEditProject: (editProjectDto: EditProjectDto) => void;
    onChangeFilter: (filter: string) => void;
}

const ProjectForm: React.FC<ProjectProps> = props => {
    return (
        <Card
            border="info"
            text="info"
        >
            <Card.Body>
                <Card.Title
                    onClick={() => props.onChangeFilter(props.project.id)}
                >
                    {props.project.title}
                </Card.Title>
                <Card.Text>
                    {props.project.description}
                </Card.Text>
                <Button
                    as={Link}
                    to={'/project/' + props.project.id}
                    key = {props.project.id}
                    variant="outline-info"
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
};

export default ProjectForm;