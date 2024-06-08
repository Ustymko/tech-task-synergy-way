import "./Users.css";
import { useState, useEffect } from "react";
import {
  getRandomUser,
  getAllUsers,
  saveUser,
  deleteUser,
} from "../../API/users-api";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const navigate = useNavigate();

  const handleAddNewUserButton = () => {
    getRandomUser()
      .then((res) => {
        saveUser({ ...res.data, banks: [] })
          .then(() => {
            if (newUsers.length <= 1) {
              setNewUsers([newUsers, { ...res.data, banks: [] }]);
            } else {
              setNewUsers(...newUsers, { ...res.data, banks: [] });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        if (err.response.status === 429) {
          alert(
            "Too many requests to random data api! Wait a little or try reloading the page"
          );
        }
        console.log(err);
      });
  };

  const handleUserDelete = (id) => {
    deleteUser(id)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserEditButtonClick = (user) => {
    navigate("/user-details", {
      state: {
        user: user,
      },
    });
  };

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newUsers]);

  return (
    <div className="users-screen">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Modify</th>
              <th>
                <Button variant="success" onClick={handleAddNewUserButton}>
                  Add
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="primary"
                    className="edit-button"
                    style={{ marginRight: "20px" }}
                    onClick={() => handleUserEditButtonClick(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete-button"
                    onClick={() => handleUserDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
