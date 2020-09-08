import React, {useRef} from 'react';
import './SignInForm.css';
import {Form, Button, Card} from 'react-bootstrap';

interface SignInProps {
    onSignIn: (email: string, password: string) => void;
    error: string;
}

const SignInForm: React.FC<SignInProps> = props => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const signInHandler = (event: React.FormEvent) => {
        const email = emailInputRef.current!.value;
        const password = passwordInputRef.current!.value;
        event.preventDefault();
        props.onSignIn(email, password);
    };

    return (
        <Card
            className='CreateTask'
            border="info"
            text="info"
        >
            <Form onSubmit={signInHandler}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef}/>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" required ref={passwordInputRef}  />
                </Form.Group>
                { props.error &&
                    <Form.Group controlId="error">
                        <Card border='danger' text='danger'>
                            <Card.Body>{props.error}</Card.Body>
                        </Card>
                    </Form.Group>
                }
                <Button variant="outline-info" type="submit" size='sm'>
                    Sign In
                </Button>
            </Form>
        </Card>
    );
};

export default SignInForm;