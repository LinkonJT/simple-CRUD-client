// Removed unused React import

import { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  console.log(initialUsers);
  const [users, setUsers] = useState(initialUsers);

  /**#########********Handlers Start*********############## */

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    const newUser = { name, email };
    console.log(newUser);

    //create user in the DB (database)
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          // Ensure the property name matches the server response
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);

          alert("user added successfully");
          e.target.reset();
        }
      });
  };

  const handleUserDelete = (id) => {
    console.log("delete this user:", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
          console.log("after delete", data);
        }
      });
  };

  /**#########*********handlers END********############## */

  return (
    <div>
      {/* add user */}
      <div>
        <h4>users: {users.length}</h4>
        <form onSubmit={handleAddUser}>
          <input type="text" name="name" placeholder="Enter name" required />
          <br />
          <input type="email" name="email" placeholder="Enter email" required />
          <br />
          <input type="submit" value="add user" />
        </form>
      </div>

      {/* view users */}

      {users.map((user) => (
        <p key={user._id}>
          {user.name}: {user.email}{" "}
          <Link to={`/users/${user._id}`}> Details </Link>
          <Link to={`/update/${user._id}`}> Edit </Link>
          <button onClick={() => handleUserDelete(user._id)}>X</button>
        </p>
      ))}
    </div>
  );
};

export default Users;
