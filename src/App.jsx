import { Contract, ethers, providers } from "ethers";
import { useState } from "react";
import {contract_address,abi} from "./constant"

import "./App.css";
function App() {
  const [acc,setAcc]=useState("");
  const [isConnected,setIsConnected]=useState(false);
  const [inputvalue,setinputValue]=useState(null)
  const [array,setArray]=useState([])
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("form subbmitted");
    const provider = new ethers.providers.Web3Provider(window.ethereum)

const signer=provider.getSigner(); 
const contract=new Contract(contract_address,abi,signer);
await contract.addTodo(inputvalue);

  };

 
  const connectwalletHandler = async () => {
    if (window.ethereum) {
      console.log("Detected");
      try {
        window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((response) =>{ setAcc(response[0])
          setIsConnected(true);
          }); 
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Not Detected");
    }
  };

  return (
    <div className="App">
      <h1>Web3 ToDo List</h1>
      <h2>Start adding some todo to see some magic happen!!</h2>
      <form onSubmit={submitHandler}>
        <label>Add TODOS : </label>
        <input type="text"  value={inputvalue} onChange={e => setinputValue(e.target.value)} />
        <button style={{background:'lightblue', border:'none', padding:'3px 10px', margin:'0 5px'}}>Submit</button>
      </form>

      <button
        onClick={connectwalletHandler}
        style={{ position: "absolute", top: 0, right: 100 ,background:'lightblue', border:'none', padding:'3px 10px', margin:'0 5px' }}
      >
        {isConnected?"Wallet Connected":"Connect Wallet"}
      </button>
      <h3>Wallet Address : {acc}</h3>

    </div>
  );
}

export default App;
