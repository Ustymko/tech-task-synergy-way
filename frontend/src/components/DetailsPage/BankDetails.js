import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Details.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { updateBank } from "../../API/banks-api";
import { getAllUsers } from "../../API/users-api";

function BankDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  let bank = location.state.bank;

  const [currentBank, setCurrentBank] = useState(bank);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = users.filter((user) =>
        (user.first_name + user.last_name)
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleSearchBarClick = () => {
    if (searchTerm === "") {
      setFilteredUsers(users);
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setSearchTerm("");
      setFilteredUsers([]);
    }
  };

  const handleUserClick = (user) => {
    if (!currentBank.users.some((u) => u.id === user.id)) {
      setCurrentBank({ ...currentBank, users: [...currentBank.users, user] });
    }
    setSearchTerm("");
    setFilteredUsers([]);
  };

  const handleDeleteUserFromBank = (id) => {
    setCurrentBank({
      ...currentBank,
      users: currentBank.users.filter((user) => user.id !== id),
    });
  };

  const handleBankDataChange = (e) => {
    const { name, value } = e.target;
    setCurrentBank({
      ...currentBank,
      [name]: value,
    });
  };

  const handleUpdateBank = () => {
    setCurrentBank({
      ...currentBank,
      users: currentBank.users.map((user) => user.id),
    });
    setShouldUpdate(true);
  };

  useEffect(() => {
    if (shouldUpdate) {
      updateBank(currentBank.id, currentBank)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getAllUsers()
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }
    // eslint-disable-next-line
  }, [shouldUpdate]);
  return (
    <div className="details-screen">
      <div className="details-screen__top-panel">
        <h1>Edit Bank</h1>
        <Button onClick={handleUpdateBank} variant="success">
          Save changes
        </Button>
      </div>
      <InputGroup className="mb-3">
        <InputGroup.Text>Bank name</InputGroup.Text>
        <Form.Control
          name="bank_name"
          aria-label="name"
          onChange={handleBankDataChange}
          value={currentBank.bank_name}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Swift BIC and routing number</InputGroup.Text>
        <Form.Control
          name="swift_bic"
          aria-label="Swift BIC"
          onChange={handleBankDataChange}
          value={currentBank.swift_bic}
        />
        <Form.Control
          name="routing_number"
          aria-label="Routing number"
          onChange={handleBankDataChange}
          value={currentBank.routing_number}
        />
      </InputGroup>
      <h3>Assign user to a bank</h3>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={handleSearchBarClick}
          ref={searchBarRef}
          placeholder="Search users by name..."
        />
        {filteredUsers.length > 0 && (
          <div ref={dropdownRef} className="autocomplete-dropdown">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="autocomplete-item"
                onClick={() => handleUserClick(user)}
              >
                {user.first_name} {user.last_name} | <b>Email: </b> {user.email}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {currentBank.users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="danger"
                    className="delete-button"
                    onClick={() => handleDeleteUserFromBank(user.id)}
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

export default BankDetails;
