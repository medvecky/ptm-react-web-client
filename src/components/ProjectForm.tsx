import React from 'react';
import {Card, Button} from "react-bootstrap";
import {Project} from "../project.model";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setProjectsFilter} from '../store/projectsSlice'

interface ProjectProps {
    project: Project;
    onDeleteProject: (projectId: string) => void;
}

const ProjectForm: React.FC<ProjectProps> = props => {
    const dispatch = useDispatch();
    return (
        <Card
            border="info"
            text="info"
        >
            <Card.Body>
                <Card.Title
                    onClick={() => dispatch(setProjectsFilter(props.project.id))}
                >
                    {props.project.title}
                </Card.Title>
                <Card.Text>
                    {props.project.description}
                </Card.Text>
                <Button
                    as={Link}
                    to={'/project/' + props.project.id}
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