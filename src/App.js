import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const product = {
    name: "SuperBrz net 200",
    description: "Paket namenjen korisnicima koji žele stabilan i brz internet za rad, zabavu, i streaming u HD kvalitetu.",
    price: 0.001,
  };

  const web3 = new Web3(window.ethereum);

  async function enableMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      console.log('MetaMask is not installed!');
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error('User denied account access');
    }
  }

  async function sendEther(to, amount) {
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    const value = web3.utils.toWei(amount, 'ether');

    try {
      const response = await web3.eth.sendTransaction({
        from,
        to,
        value
      });
      console.log(response)
      toast.success("Transaction successful: " + response.transactionHash, { autoClose: 3000 });
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 });
    }
  }

  const handleBuy = () => {
    enableMetaMask();
    sendEther('destination-address', product.price)
  };

  return (
    <div className="main-div">
      <div className="center">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Cena:</strong> {product.price} ETH</p>
        <button className="pay-button" onClick={handleBuy}>Kupi odmah</button>
      </div>
      <ToastContainer />
    </div>

  );
}

export default App;
