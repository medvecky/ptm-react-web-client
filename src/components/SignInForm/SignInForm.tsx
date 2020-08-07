import React, {useRef} from 'react';
import './SignInForm.css';
import {Form, Button, Card} from 'react-bootstrap';
import {useHistory} from "react-router";
interface SignInProps {
    onSingIn: (login: string, password: string) => void;
}

const SignInForm: React.FC<SignInProps> = props => {
    const loginInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const signInHandler = (event: React.FormEvent) => {
        const login = loginInputRef.current!.value;
        const password = passwordInputRef.current!.value;
        event.preventDefault();
        props.onSingIn(login, password);
        history.push('/');
    };
    return (
            <Card
                className='CreateTask'
                border="info"
                text="info"
            >
                <Form onSubmit={signInHandler}>
                    <Form.Group controlId="formLogin">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" ref={loginInputRef}/>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text"  ref={passwordInputRef}/>
                    </Form.Group>
                    <Button variant="outline-info" type="submit" size='sm'>
                        Sign In
                    </Button>
                </Form>
            </Card>
    );
};

export default SignInForm;