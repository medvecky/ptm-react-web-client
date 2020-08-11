import React, {useRef, useState} from 'react';
import './SignUpForm.css';
import {Form, Button, Card} from 'react-bootstrap';

interface SignUpProps {
    onSingUp: (email: string, password: string) => void;
    error: string;
}

const SignUpForm: React.FC<SignUpProps> = props => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>('');
    const signUpHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const email = emailInputRef.current!.value;
        const password = passwordInputRef.current!.value;
        const confirmPassword = confirmPasswordInputRef.current!.value;
        if (password === confirmPassword) {
            setError('');
            props.onSingUp(email, password);
        } else {
            setError('Password not match');
        }
    };

    return (
        <Card
            className='CreateTask'
            border="info"
            text="info"
        >
            <Form onSubmit={signUpHandler}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={emailInputRef}/>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" ref={passwordInputRef}/>
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="confirm password" ref={confirmPasswordInputRef}/>
                </Form.Group>
                { (error || props.error) &&
                    <Form.Group controlId="error">
                        <Card border='danger' text='danger'>
                            <Card.Body>  {error || props.error} </Card.Body>
                        </Card>
                    </Form.Group>
                }
                <Button variant="outline-info" type="submit" size='sm'>
                    Sign Up
                </Button>
            </Form>
        </Card>
    );
};

export default SignUpForm;