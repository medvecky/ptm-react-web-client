import React from 'react';
import {Container, Row, Badge, Button} from 'react-bootstrap';
import {EditProjectDto} from "../edit-project.dto";
import ProjectForm from "./ProjectForm";
import {Project} from "../project.model";
import {useDispatch} from 'react-redux';
import {setProjectsFilter} from '../store/projectsSlice'

interface ProjectsListProps {
    // @ts-ignore
    items: Project [];
    onDeleteProject: (projectId: string) => void;
    onEditProject: (editProjectDto: EditProjectDto) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = props => {

    const dispatch = useDispatch();

    return (
        <Container
            style={{
                margin: '0',
                maxWidth: '100%'
            }}
        >
            <Row>
                <h4><Badge variant="info">PROJECTS</Badge></h4>
            </Row>
            <Row>
                <Row>
                    <Button
                        style={{margin: '1px'}}
                        variant="outline-info"
                        size='sm'
                        onClick={() => dispatch(setProjectsFilter(''))}
                    >
                        Clear Filter
                    </Button>
                    <Button
                        style={{margin: '1px'}}
                        variant="outline-info"
                        size='sm'
                        onClick={() => dispatch(setProjectsFilter('-'))}
                    >
                        Tasks without project
                    </Button>
                </Row>
            </Row>
            {props.items
                .map(project =>
                    <Row key={project.id}>
                        <ProjectForm
                            project={project}
                            onDeleteProject={props.onDeleteProject}
                            onEditProject={props.onEditProject}
                        />
                    </Row>)}
        </Container>
    );
};

export default ProjectsList;