import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Details.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getAllBanks } from "../../API/banks-api";
import { updateUser } from "../../API/users-api";

function UserDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  let user = location.state.user;

  const [currentUser, setCurrentUser] = useState(user);
  const [banks, setBanks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = banks.filter((bank) =>
        bank.bank_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBanks(filtered);
    } else {
      setFilteredBanks(banks);
    }
  };

  const handleSearchBarClick = () => {
    if (searchTerm === "") {
      setFilteredBanks(banks);
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
      setFilteredBanks([]);
    }
  };

  const handleBankClick = (bank) => {
    if (!currentUser.banks.some((b) => b.id === bank.id)) {
      setCurrentUser({ ...currentUser, banks: [...currentUser.banks, bank] });
    }
    setSearchTerm("");
    setFilteredBanks([]);
  };

  const handleDeleteBankFromUser = (id) => {
    setCurrentUser({
      ...currentUser,
      banks: currentUser.banks.filter((bank) => bank.id !== id),
    });
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  const handleUpdateUser = () => {
    setCurrentUser({
      ...currentUser,
      banks: currentUser.banks.map((bank) => bank.id),
    });
    setShouldUpdate(true);
  };

  useEffect(() => {
    if (shouldUpdate) {
      updateUser(currentUser.id, currentUser)
        .then(() => {
          navigate("/users");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getAllBanks()
        .then((res) => {
          setBanks(res.data);
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
        <h1>Edit User</h1>
        <Button onClick={handleUpdateUser} variant="success">
          Save changes
        </Button>
      </div>
      <InputGroup className="mb-3">
        <InputGroup.Text>First and last name</InputGroup.Text>
        <Form.Control
          name="first_name"
          aria-label="First name"
          onChange={handleUserDataChange}
          value={currentUser.first_name}
        />
        <Form.Control
          name="last_name"
          aria-label="Last name"
          onChange={handleUserDataChange}
          value={currentUser.last_name}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Username and password</InputGroup.Text>
        <Form.Control
          name="username"
          aria-label="Username"
          onChange={handleUserDataChange}
          value={currentUser.username}
        />
        <Form.Control
          name="password"
          aria-label="Password"
          onChange={handleUserDataChange}
          value={currentUser.password}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Email</InputGroup.Text>
        <Form.Control
          name="email"
          aria-label="Email"
          onChange={handleUserDataChange}
          type="email"
          value={currentUser.email}
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
          placeholder="Search bank by name..."
        />
        {filteredBanks.length > 0 && (
          <div ref={dropdownRef} className="autocomplete-dropdown">
            {filteredBanks.map((bank) => (
              <div
                key={bank.id}
                className="autocomplete-item"
                onClick={() => handleBankClick(bank)}
              >
                {bank.bank_name} | <b>Swift_bic:</b> {bank.swift_bic}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Swift_bic</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {currentUser.banks.map((bank) => (
              <tr key={bank.id}>
                <td>{bank.bank_name}</td>
                <td>{bank.swift_bic}</td>
                <td>
                  <Button
                    variant="danger"
                    className="delete-button"
                    onClick={() => handleDeleteBankFromUser(bank.id)}
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

export default UserDetails;
