import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import {
  number, oneOfType, shape, string,
} from 'prop-types';
import { Link } from 'react-router-dom';

function TableRows({
  user: {
    id, avatar, email, first_name: firstName, last_name: lastName,
  },
}) {
  return (
    <tr>
      <td>{id}</td>
      <td>
        <img src={avatar ?? 'logo192.png'} alt={`${firstName}'s Avatar`} className="img-fluid" />
      </td>
      <td>{email}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>
        <ButtonGroup>
          <Button tag={Link} to={`/users/${id}/edit`} color="warning">
            Edit User
          </Button>
          <Button tag={Link} to={`/users/${id}/delete`} color="danger">
            Delete User
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}

TableRows.defaultProps = {
  user: {
    id: 0,
    avatar: '',
    email: '',
    first_name: '',
    last_name: '',
  },
};

TableRows.propTypes = {
  user: shape({
    id: oneOfType([number, string]),
    avatar: string,
    email: string,
    first_name: string,
    last_name: string,
  }),
};

export default TableRows;
