import React, {useRef} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import {CreateProjectDto} from "../create-project.dto";
interface CreateProjectProps {
    onCreateProject: (createProjectDto: CreateProjectDto) => void;
    onClearFilter: (filter: string) => void;
}

const CreateProjectForm: React.FC<CreateProjectProps> = props => {
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const createProjectHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const createProjectDto: CreateProjectDto = {

            title: titleInputRef.current!.value,
            description: descriptionInputRef.current!.value,
        };
        props.onCreateProject(createProjectDto);
    };
    return (
            <Card
                style={{
                    padding: '2%',
                    width: '100%'
                }}
                border="info"
                text="info"
            >
                <Form onSubmit={createProjectHandler}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter project's title" ref={titleInputRef}/>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter projects's description" ref={descriptionInputRef}/>
                    </Form.Group>
                    <Button variant="outline-info" type="submit" size='sm'>
                        Create Project
                    </Button>
                    <Button
                        style = {{margin: '1px'}}
                        variant="outline-info"
                        size='sm'
                        onClick={() => props.onClearFilter('')}
                    >
                        Clear filter
                    </Button>
                </Form>
            </Card>
    );
};

export default CreateProjectForm;