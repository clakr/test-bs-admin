import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row,
} from 'reactstrap';
import useToggle from '../../utils/useToggle';
import { useUsers } from '../../utils/useUsers';
import DescriptionItem from '../DescriptionItem';

function DeleteUser() {
  const toggle = useToggle();
  const { users, setUsers } = useUsers();

  const { id: paramsId } = useParams();
  let deleteUser;
  if (users) {
    deleteUser = users.find(({ id }) => +paramsId === +id);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://reqres.in/api/users/${paramsId}`, {
      method: 'DELETE',
    }).then(() => {
      const filtered = users.filter(({ id: filteredId }) => deleteUser.id !== filteredId);

      setUsers([...filtered]);
    });

    toggle();
  };

  return (
    <Modal isOpen toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit User</ModalHeader>
      {deleteUser && (
        <ModalBody>
          <Form onSubmit={handleSubmit} id="form">
            <h5 className="mb-4">Are you sure you want to delete this user?</h5>
            <p className="fw-bold">User Details: </p>
            <Row>
              <Col sm={3}>
                <img
                  src={`${deleteUser.avatar ?? '/logo192.png'}`}
                  className="img-fluid img-thumbnail"
                  alt={`${deleteUser.first_name}'s Avatar`}
                />
              </Col>
              <Col sm={9} tag="dl" className="row d-flex a">
                <DescriptionItem term="ID" details={deleteUser.id} />
                <DescriptionItem
                  term="Name"
                  details={`${deleteUser.first_name} ${deleteUser.last_name}`}
                />
                <DescriptionItem term="Email" details={deleteUser.email} />
              </Col>
            </Row>
          </Form>
        </ModalBody>
      )}
      <ModalFooter>
        <Button color="danger" type="submit" form="form">
          Delete
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteUser;
