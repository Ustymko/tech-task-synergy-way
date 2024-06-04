import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { baseRequest } from "./API/api";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // baseRequest({urlPath: "users/", method: "GET"})
    // .then((res) => {
    //   setData(res.data)
    //   console.log(res.data)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
    fetch("http://localhost:8000/server/users/")
      .then((res) => {
        return res.json();
        // console.log(res.json());
      })
      .then((data) => {
        console.log(data)
        setData(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      Hello
      {data &&
        data.map((user) => (
          <div key={user.id}>
            <p>{user.first_name}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
