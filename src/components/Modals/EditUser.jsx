import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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

let formDefaultValues = {
  id: '',
  avatar: '',
  first_name: '',
  last_name: '',
  email: '',
};

function EditUser() {
  const toggle = useToggle();
  const { users, setUsers } = useUsers();

  const { id: paramsId } = useParams();
  let editUser;
  if (users) {
    editUser = users.find(({ id }) => +paramsId === +id);
    formDefaultValues = {
      id: editUser.id,
      avatar: editUser.avatar,
      email: editUser.email,
      first_name: editUser.first_name,
      last_name: editUser.last_name,
    };
  }

  const [form, setForm] = useState(formDefaultValues);

  const handleChange = ({ target: { name, value } }) => setForm({ ...form, [name]: value });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://reqres.in/api/users/${paramsId}`, {
      method: 'PATCH',
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
        id, avatar, email, first_name: firstName, last_name: lastName,
      }) => {
        const filtered = users.filter(({ id: filterId }) => editUser.id !== filterId);
        setUsers([
          {
            id,
            avatar,
            email,
            first_name: firstName,
            last_name: lastName,
          },
          ...filtered,
        ]);
      });

    toggle();
  };

  return (
    <Modal isOpen toggle={toggle}>
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
        <Button color="warning" type="submit" form="form">
          Edit
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditUser;
