import React from 'react';
import { ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import EditButton from './EditButton';
// eslint-disable-next-line import/no-cycle
import DeleteButton from './DeleteButton';

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
          <EditButton userId={id} />
          <DeleteButton userId={id} />
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
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

export default TableRows;
