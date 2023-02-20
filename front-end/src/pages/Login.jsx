import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap';

import { requestLogin, setToken } from '../services/request';
import authContext from '../store/contexts/auth';
import './login.css';

const MIN_PASSWORD_LENGTH = 6;

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const checkEmail = (value) => /^[a-z0-9._]+@[a-z]+\.[a-z]+/.test(value);
  const checkPassword = (value) => value.length >= MIN_PASSWORD_LENGTH;

  useEffect(() => {
    const tests = [];
    tests.push(checkEmail(email));
    tests.push(checkPassword(password));
    if (tests.every((value) => value)) {
      setIsSubmitDisabled(false);
    }
  }, [email, password]);

  const login = async (event) => {
    event.preventDefault();

    try {
      const data = await requestLogin(
        '/login',
        { email, password },
      );

      setToken(data.token);

      setUser({
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token,
      });

      if (data.role === 'administrator') {
        navigate('/admin/manage');
      } else if (data.role === 'seller') {
        navigate('/seller/orders');
      } else {
        navigate('/customer/products');
      }
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  return (
    <Card className="flex container p-2">
      <Form.Group>
        <Form.Label>Email : </Form.Label>
        <Form.Control
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
          name="email"
          type="email"
          placeholder="Example@email.com"
          data-testid="common_login__input-email"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password : </Form.Label>
        <Form.Control
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
          name="password"
          type="password"
          placeholder="Password"
          data-testid="common_login__input-password"
        />
      </Form.Group>
      <div className="d-grid gap-2 mt-2">
        <Button
          className="LoginButton"
          variant="success"
          type="submit"
          onClick={ (event) => login(event) }
          data-testid="common_login__button-login"
          disabled={ isSubmitDisabled }
        >
          Login
        </Button>
        <Button
          className="RegisterButton"
          variant="success"
          type="submit"
          data-testid="common_login__button-register"
        >
          <Link
            to="/register"
            className="text-light"
          >
            Ainda não tenho conta
          </Link>
        </Button>
        {(failedTryLogin)
          ? (
            <Alert
              variant="danger"
              onClose={ () => setFailedTryLogin(false) }
              dismissible
              data-testid="common_login__element-invalid-email"
            >
              {`O endereço de e-mail ou a senha não estão corretos.
                Por favor, tente novamente.`}
            </Alert>
          )
          : null}
      </div>
    </Card>
  );
}
