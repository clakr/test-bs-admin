import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { Container, Table, Button } from 'reactstrap';
// eslint-disable-next-line import/no-cycle
import AddButton from '../../components/AddButton';
import TableRows from '../../components/TableRows';

const UsersContext = createContext();

export const useUsers = () => useContext(UsersContext);

function Index() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const res = await fetch('https://reqres.in/api/users');
      const { data } = await res.json();

      if (isSubscribed) {
        setUsers(data);
      }
    };

    fetchData().catch((err) => {
      console.log(err);
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('https://reqres.in/api/users?page=2&delay=1');
      const { data } = await res.json();

      setIsLoading(false);
      setUsers([...users, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const rowLength = users ? Object.keys(users[0]).length + 1 : 0;

  const value = useMemo(() => ({ users, setUsers }), [users, setUsers]);

  return (
    <UsersContext.Provider value={value}>
      <Container>
        <div className="mt-3 text-right">
          <AddButton />
        </div>

        <Table className="table-hover mt-3 my-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {users && users.map((user) => <TableRows user={user} key={user.id} />).slice(0, 10)}
          </tbody>

          <tfoot>
            {isLoading && <tr colSpan={rowLength}>loading...</tr>}
            <tr>
              <td colSpan={rowLength} className="text-center">
                <Button onClick={handleLoadMore}>Load More</Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Container>
    </UsersContext.Provider>
  );
}

export default Index;
