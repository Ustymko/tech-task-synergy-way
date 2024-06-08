import "./Banks.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getRandomBank,
  saveBank,
  deleteBank,
  getAllBanks,
} from "../../API/banks-api";
import { useNavigate } from "react-router-dom";

function Banks() {
  const [banks, setBanks] = useState([]);
  const [newBanks, setNewBanks] = useState([]);
  const navigate = useNavigate();

  const handleAddNewBankButton = () => {
    getRandomBank()
      .then((res) => {
        saveBank({ ...res.data, users: [] })
          .then(() => {
            if (newBanks.length <= 1) {
              setNewBanks([newBanks, { ...res.data, users: [] }]);
            } else {
              console.log(newBanks);
              setNewBanks(...newBanks, { ...res.data, users: [] });
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

  const handleBankDelete = (id) => {
    deleteBank(id)
      .then(() => {
        setBanks((prevBanks) => prevBanks.filter((bank) => bank.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBankEditButtonClick = (bank) => {
    navigate("/bank-details", {
      state: {
        bank: bank,
      },
    });
  };

  useEffect(() => {
    getAllBanks()
      .then((res) => {
        setBanks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newBanks]);

  return (
    <div className="banks-screen">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Swift_bic</th>
              <th>Modify</th>
              <th>
                <Button variant="success" onClick={handleAddNewBankButton}>
                  Add
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {banks.map((bank) => (
              <tr key={bank.id}>
                <td>{bank.bank_name}</td>
                <td>{bank.swift_bic}</td>
                <td>
                  <Button
                    variant="primary"
                    className="edit-button"
                    style={{ marginRight: "20px" }}
                    onClick={() => handleBankEditButtonClick(bank)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete-button"
                    onClick={() => handleBankDelete(bank.id)}
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

export default Banks;
