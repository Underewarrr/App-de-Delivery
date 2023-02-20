import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { createUser, setToken } from '../services/request';
import authContext from '../store/contexts/auth';

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(authContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerIsValid, setRegisterIsValid] = useState(false);
  const MIN_PASSWORD_LENGTH = 6;
  const MIN_NAME_LENGTH = 12;

  const checkName = (value) => value.length >= MIN_NAME_LENGTH;
  const checkEmail = (value) => /^[a-z0-9._]+@[a-z]+\.[a-z]+/.test(value);
  const checkPassword = (value) => value.length >= MIN_PASSWORD_LENGTH;

  useEffect(() => {
    const tests = [];
    tests.push(checkName(name));
    tests.push(checkEmail(email));
    tests.push(checkPassword(password));
    if (tests.every((value) => value)) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [name, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser('/register', {
        name,
        email,
        password,
      });

      setToken(response.token);

      setUser({
        name: response.name,
        email: response.email,
        role: response.role,
        token: response.token,
      });

      navigate(`/${response.role}/products`);
    } catch (error) {
      console.error(error);
      setRegisterIsValid(true);
    }
  };

  return (
    <Card>
      <h1>
        Cadastro
      </h1>
      <Card.Body>
        <Form.Group>
          <Form.Label>Nome completo: </Form.Label>
          <Form.Control
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
            name="name"
            placeholder=" Nome completo"
            data-testid="common_register__input-name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email : </Form.Label>
          <Form.Control
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            name="email"
            type="email"
            placeholder=" Example@email.com"
            data-testid="common_register__input-email"
          />
        </Form.Group>
        <Form.Label>Password : </Form.Label>
        <Form.Control
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
          name="password"
          type="password"
          placeholder=" Password"
          data-testid="common_register__input-password"
        />
        <div className="d-grid gap-2">
          <Button
            className=""
            variant="dark"
            type="submit"
            disabled={ !formIsValid }
            data-testid="common_register__button-register"
            onClick={ (e) => handleSubmit(e) }
          >
            Register
          </Button>
          { registerIsValid && (
            <Alert
              variant="danger"
              onClose={ () => setRegisterIsValid(false) }
              dismissible
              data-testid="common_register__element-invalid_register"
            >
              Usuário já cadastrado!
            </Alert>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
