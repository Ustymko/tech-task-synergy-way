import "./Banks.css"
import { useEffect, useState } from "react";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { baseRequest, getRandomBank, saveBank, deleteBank } from "../../API/api";

function Banks(){
  const [banks, setBanks] = useState([]);
  const [newBanks, setNewBanks] = useState([]);

  const handleAddNewBankButton = () => {
    getRandomBank()
    .then((res) => {
      saveBank({...res.data, users: []})
      .then(() => {
        if(newBanks.length <= 1){
          setNewBanks([newBanks, {...res.data, users: []}])
        } else {
          console.log(newBanks)
          setNewBanks(...newBanks, {...res.data, users: []})
        }
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      if (err.response.status === 429){
        alert("Too many requests to random data api! Wait a little or try reloading the page")
      }
      console.log(err)
    })
  }

  const handleBankDelete = (id) => {
    deleteBank(id)
    .then(() => {
      setBanks(prevBanks => prevBanks.filter(bank => bank.id !== id))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    baseRequest({urlPath: "banks/"})
      .then((res) => {
        setBanks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newBanks]);

  return(
    <div className="banks-screen">
      <Fab onClick={() => handleAddNewBankButton()} color="success" aria-label="add">
        <AddIcon />
      </Fab>
      {banks && banks.map((bank) => (
        <div className="bank-item" key={bank.id}>
          <h2>{bank.bank_name}</h2>
          <p>Swift_bic: {bank.swift_bic}</p>
          <p>Routing number:</p>
          <p>{bank.routing_number}</p>
          <div className="buttons">
            <Fab color="primary" aria-label="edit">
              <EditIcon />
            </Fab>
            <Fab onClick={() => handleBankDelete(bank.id)} color="error" aria-label="delete">
              <DeleteIcon />
            </Fab>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Banks;