import React, { useState } from 'react';
import {
  Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import { useUsers } from '../views/users';
import DescriptionItem from './DescriptionItem';

function DeleteButton({ userId }) {
  const { users, setUsers } = useUsers();

  const deleteUser = users.find(({ id }) => userId === id);

  const {
    avatar, email, first_name: firstName, last_name: lastName,
  } = deleteUser;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prevState) => !prevState);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://reqres.in/api/users/${userId}`, {
      method: 'DELETE',
    }).then(() => {
      const filtered = users.filter(({ id: filteredId }) => deleteUser.id !== filteredId);

      setUsers([...filtered]);
    });

    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={toggle} color="danger">
        Delete User
      </Button>
      <Modal isOpen={isOpen} toggle={toggle} size="md">
        <ModalHeader toggle={toggle}>Delete User</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit} id="form">
            <h5 className="mb-4">Are you sure you want to delete this user?</h5>
            <p className="fw-bold">User Details: </p>
            <Row>
              <Col sm={3}>
                <img
                  src={`${avatar ?? 'logo192.png'}`}
                  className="img-fluid img-thumbnail"
                  alt={`${firstName}'s Avatar`}
                />
              </Col>
              <Col sm={9} tag="dl" className="row d-flex a">
                <DescriptionItem term="First Name" details={firstName} />
                <DescriptionItem term="Last Name" details={lastName} />
                <DescriptionItem term="Email" details={email} />
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" type="submit" form="form">
            Delete
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

DeleteButton.defaultProps = {
  userId: 0,
};

DeleteButton.propTypes = {
  userId: PropTypes.number,
};

export default DeleteButton;
