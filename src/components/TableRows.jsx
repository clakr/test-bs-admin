import React, { useState } from 'react';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import PropTypes from 'prop-types';

function TableRows({
  user: {
    id, avatar, email, first_name: firstName, last_name: lastName,
  },
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prevState) => !prevState);

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
        <Dropdown isOpen={isOpen} toggle={toggle}>
          <DropdownToggle caret className="btn btn-outline-secondary btn-sm" tag="button">
            Actions
          </DropdownToggle>
          <DropdownMenu end className="mt-2">
            <DropdownItem>Edit User</DropdownItem>
            <DropdownItem>Delete User</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

export default TableRows;
