//TODOLIST_DELET_EDIT_TABLE

import { useState } from "react";
const TodoList = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const [editItem, setEditItem] = useState({ id: "", isEdit: false });
  const submitHandler = (e) => {
    e.preventDefault();
    setUsers([
      ...users,
      {
        id: new Date().getTime().toString(),
        name: user.name,
        email: user.email,
        password: user.password,
      },
    ]);
    setUser({ id: "", name: "", email: "", password: "" });
  };
  const deleteHandler = (id) => {
    const filteredItems = users.filter((item) => item.id !== id);
    setUsers(filteredItems);
  };
  const editHandler = (id) => {
    setEditItem({ ...editItem, id: id, isEdit: true });
    const editableUser = users.find((eachUser) => eachUser.id === id);
    console.log("editableUser", editableUser);
    setUser({
      id: editableUser.id,
      name: editableUser.name,
      email: editableUser.email,
      password: editableUser.password,
    });
    // console.log("user_editHandler", user);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const newUsers = users.map((eachUser) => {
      if (eachUser.id === editItem.id) {
        // console.log("true")
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        };
      }
      return eachUser;
    });
    // console.log("newUsers", newUsers); // [{...}, {....}, {....}]
    setUsers(newUsers);
    setEditItem({ ...editItem, id: "", isEdit: false });
    setUser({ id: "", name: "", email: "", password: "" });
  };
  return (
    <center>
      <form onSubmit={submitHandler}>
        <div>
          <label>NAME </label>&nbsp; &nbsp;
          <input
            type="text"
            placeholder="ENTER NAME"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <label>EMAIL </label>&nbsp; &nbsp;
          <input
            type="email"
            placeholder="ENTER EMAIL"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <label>PASSWORD </label>&nbsp; &nbsp;
          <input
            type="password"
            placeholder="ENTER PASSWORD"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        {editItem.isEdit ? (
          <input type="submit" value="Edit" onClick={formSubmitHandler} />
        ) : (
          <input type="submit" value="ADD" />
        )}
      </form>
      <hr />
      <hr />
      <br />
      {users.length === 0 ? (
        <div>
          <p>There is No users</p>
        </div>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PASSWORD</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((eachUser, index) => {
              const { id, name, email, password } = eachUser;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{password}</td>
                  <td>
                    <button onClick={() => editHandler(id)}>Edit</button>
                    &nbsp;
                    <button onClick={() => deleteHandler(id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </center>
  );
};
export default TodoList;
