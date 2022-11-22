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
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import { useUsers } from '../views/users';

function EditButton({ userId }) {
  const { users, setUsers } = useUsers();

  const editUser = users.find(({ id }) => userId === id);

  const [form, setForm] = useState({
    id: editUser.id,
    email: editUser.email,
    avatar: editUser.avatar,
    first_name: editUser.first_name,
    last_name: editUser.last_name,
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prevState) => !prevState);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://reqres.in/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: form.id,
        email: form.email,
        avatar: form.avatar,
        first_name: form.first_name.charAt(0).toUpperCase() + form.first_name.slice(1),
        last_name: form.last_name.charAt(0).toUpperCase() + form.last_name.slice(1),
      }),
    })
      .then((res) => res.json())
      .then(({
        id, email, avatar, first_name: firstName, last_name: lastName,
      }) => {
        const filtered = users.filter(({ id: filteredId }) => id !== filteredId);
        setUsers([
          {
            id,
            email,
            first_name: firstName,
            last_name: lastName,
            avatar,
          },
          ...filtered,
        ]);
      });

    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={toggle} color="warning">
        Edit User
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
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
                    value={form.first_name}
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
                    value={form.last_name}
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
                value={form.email}
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

EditButton.defaultProps = {
  userId: 0,
};

EditButton.propTypes = {
  userId: PropTypes.number,
};

export default EditButton;
