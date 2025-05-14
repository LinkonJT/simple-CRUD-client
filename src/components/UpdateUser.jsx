import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const user = useLoaderData()
// console.log(user)

const handleUpdateUser = e =>{
    e.preventDefault ()
      const name = e.target.name.value;
    const email = e.target.email.value;

    console.log(name, email)
}

    return (
        <div>
             <form onSubmit={handleUpdateUser}>
          <input type="text" name="name" placeholder="Enter name" required defaultValue={user.name} />
          <br />
          <input type="email" name="email" placeholder="Enter email" required defaultValue={user.email}  />
          <br />
          <input type="submit" value="update user" />
        </form>
        </div>
    );
};

export default UpdateUser;