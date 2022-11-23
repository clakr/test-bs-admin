import React, { useEffect, useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Table, Button } from 'reactstrap';
import { UsersContext } from '../../utils/useUsers';
import TableRows from '../../components/TableRows';

function Index() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      await Promise.all([
        fetch('https://reqres.in/api/users?page=1'),
        fetch('https://reqres.in/api/users?page=2'),
      ]).then((responses) => {
        Promise.all(responses.map((res) => res.json())).then((dataJSON) => {
          const responseData = [];

          dataJSON.forEach(({ data }) => {
            responseData.push(data);
          });

          if (isSubscribed) {
            setUsers(responseData.flat());
          }
        });
      });
    };

    fetchData().catch((err) => {
      console.log(err);
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const value = useMemo(() => ({ users, setUsers }), [users]);

  if (users) {
    console.log('users', users);
  }

  return (
    <UsersContext.Provider value={value}>
      <Outlet />
      <Container>
        <div className="mt-3 text-end">
          <Button tag={Link} to="/users/create">
            Add User
          </Button>
        </div>

        {users.length > 0 && (
          <Table className="table-hover mt-3 my-5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => <TableRows user={user} key={user.id} />).slice(0, 10)}
            </tbody>
          </Table>
        )}
      </Container>
    </UsersContext.Provider>
  );
}

export default Index;
