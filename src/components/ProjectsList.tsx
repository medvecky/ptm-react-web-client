import React from 'react';
import {Container, Row, Badge} from 'react-bootstrap';
import {EditProjectDto} from "../edit-project.dto";
import ProjectForm from "./ProjectForm";
import {Project} from "../project.model";

interface ProjectsListProps {
    // @ts-ignore
    items: Project [];
    onDeleteProject: (projectId: string) => void;
    onEditProject: (editProjectDto: EditProjectDto) => void;
    onChangeFilter: (filter: string) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = props => {

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
                {props.items
                    .map(project =>
                    <Row>
                        <ProjectForm
                            project={project}
                            onDeleteProject={props.onDeleteProject}
                            onEditProject={props.onEditProject}
                            onChangeFilter={props.onChangeFilter}
                        />
                    </Row>)}
        </Container>
    );
};

export default ProjectsList;