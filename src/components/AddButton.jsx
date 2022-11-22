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
// eslint-disable-next-line import/no-cycle
import { useUsers } from '../views/users';

function AddButton() {
  const [form, setForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prevState) => !prevState);

  const { users, setUsers } = useUsers();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
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

    setIsOpen(false);
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        + Add User
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create User</ModalHeader>
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
                    onChange={({ target: { name, value } }) => setForm({ ...form, [name]: value })}
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
                    onChange={({ target: { name, value } }) => setForm({ ...form, [name]: value })}
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
                onChange={({ target: { name, value } }) => setForm({ ...form, [name]: value })}
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
    </>
  );
}

export default AddButton;
