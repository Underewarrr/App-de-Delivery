import React, { useState, useEffect, useContext } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { createUser, setToken } from '../services/request';
import authContext from '../store/contexts/auth';
import PrivateHeader from './component/PrivateHeader';

export default function Register() {
  const { setUser } = useContext(authContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
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
      const response = await createUser('/admin/manage', {
        name,
        email,
        password,
        role,
      });

      setToken(response.token);

      setUser({
        name: response.name,
        email: response.email,
        role: response.role,
        token: response.token,
      });
    } catch (error) {
      console.error(error);
      setRegisterIsValid(true);
    }
  };

  const selectOptions = () => (
    <>
      <option value="administrator">Vendedor</option>
      <option value="customer">Cliente</option>
      <option value="seller">Vendedor</option>
    </>
  );

  return (
    <>
      <PrivateHeader />
      <Card>
        <Card.Body>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              value={ name }
              onChange={ ({ target: { value } }) => setName(value) }
              name="name"
              placeholder="Nome e sobrenome"
              data-testid="admin_manage__input-name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
              name="email"
              type="email"
              placeholder="seu-email@site.com.br"
              data-testid="admin_manage__input-email"
            />
          </Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            name="password"
            type="password"
            placeholder="******"
            data-testid="admin_manage__input-password"
          />
          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              as="select"
              value={ role }
              onChange={ ({ target: { value } }) => setRole(value) }
              name="role"
              data-testid="admin_manage__select-role"
            >
              { selectOptions() }
            </Form.Control>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button
              className=""
              variant="dark"
              type="submit"
              disabled={ !formIsValid }
              data-testid="admin_manage__button-register"
              onClick={ (e) => handleSubmit(e) }
            >
              Cadastrar
            </Button>
            { registerIsValid && (
              <Alert
                variant="danger"
                onClose={ () => setRegisterIsValid(false) }
                dismissible
                data-testid="admin_manage__element-invalid-register"
              >
                Usuário já cadastrado!
              </Alert>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
