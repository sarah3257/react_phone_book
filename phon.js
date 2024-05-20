import React, { useState } from "react";
import ReactDOM from "react-dom";

function PhoneBookForm(props) {
    const initContact = {
      id: null,
      userFirstname: "Coder",
      userLastname: "Byte",
      userPhone: "8885559999",
    };
  
    const [userState, setUserState] = useState(initContact);
  
    const handleUserChange = (e) => {
      setUserState({
        ...userState,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!userState.userFirstname || !userState.userLastname || !userState.userPhone) return;
      props.addUser(userState);
      setUserState(initContact);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>First name:</label>
        <br />
        <input type="text" value={userState.userFirstname} onChange={handleUserChange} />
        <br />
        <label>Last name:</label>
        <br />
        <input   type="text" value={userState.userLastname} onChange={handleUserChange} />
        <br />
        <label>Phone:</label>
        <br />
        <input   type="text" value={userState.userPhone} onChange={handleUserChange} />
        <br />
        <input  type="submit" value="Add User" />
      </form>
    );
  }
  
  function InformationTable(props) {
    const sortedContacts = props.users.sort((a, b) => a.userLastname.localeCompare(b.userLastname));
  
    const display =
      sortedContacts.length > 0 ? (
        sortedContacts.map((user, index) => (
          <tr key={index}>
            <td >{user.userFirstname}</td>
            <td >{user.userLastname}</td>
            <td >{user.userPhone}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>&nbsp;</td>
        </tr>
      );
  
    return (
      <table className="informationTable">
        <thead>
          <tr>
            <th >First name</th>
            <th >Last name</th>
            <th >Phone</th>
          </tr>
        </thead>
        <tbody>{display}</tbody>
      </table>
    );
  }


export default function Application(props) {
  const usersObj = [];

  const [users, setUsers] = useState(usersObj);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  return (
    <section>
      <PhoneBookForm addUser={addUser} />
      <InformationTable users={users} />
    </section>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));