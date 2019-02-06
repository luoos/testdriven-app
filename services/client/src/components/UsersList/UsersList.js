import React from 'react';

const UsersList = (props) => {
  return (
    <>
      <h1 className="title is-1">All Users</h1>
      <hr/><br/>
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
            {
              props.users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{String(user.active)}</td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </>
  );
}

export default UsersList;