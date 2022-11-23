import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import useToggle from '../../utils/useToggle';
import { useUsers } from '../../utils/useUsers';

function AddUser() {
  const toggle = useToggle();
  const { users, setUsers } = useUsers();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const handleChange = ({ target: { name, value } }) => setForm({ ...form, [name]: value });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        first_name: form.first_name.charAt(0).toUpperCase() + form.first_name.slice(1),
        last_name: form.last_name.charAt(0).toUpperCase() + form.last_name.slice(1),
      }),
    })
      .then((res) => res.json())
      .then(({
        id, email, first_name: firstName, last_name: lastName,
      }) => {
        setUsers([
          {
            id,
            email,
            first_name: firstName,
            last_name: lastName,
          },
          ...users,
        ]);
      });

    toggle();
  };

  return (
    <Modal isOpen toggle={toggle}>
      <ModalHeader toggle={toggle}>Add User</ModalHeader>
      <ModalBody>
        <Form id="form" onSubmit={handleSubmit}>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <Label for="first_name">First Name</Label>
                <Input
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  type="text"
                  required
                  value={form.first_name}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="last_name">Last Name</Label>
                <Input
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  type="text"
                  required
                  value={form.last_name}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              name="email"
              id="email"
              placeholder="Email Address"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit" form="form">
          Submit
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddUser;
