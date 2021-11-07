import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TEST_GIFS = [
	'https://media.giphy.com/media/fr0a9Np0PlcJTVevU5/giphy.gif',
	'https://media.giphy.com/media/I9Pt41RvhSjeXOJaAu/giphy.gif',
	'https://media.giphy.com/media/QLlbsC0Pu2iYULBry4/giphy.gif',
	'https://media.giphy.com/media/mqqyyOAT94BLSKl4bE/giphy.gif'
]


const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);
  //Function to check if Phantom wallet is connected
  const checkWalletConnected = async () => {
    try {
      const { solana } = window;
      
      if (solana) {
        if (solana.isPhantom) {
          console.log("Connected to Phantom Wallet");
          //Connect to user wallet
          const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
          );
        //Store user wallet public key to be used
        setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("No Solana wallet found! Please download a Wallet Extension!");
        window.location.href = "https://phantom.app/";
      }
    } catch (error) {
      console.error(error);
    }
  };
  //Function to connect to wallet
  const connectWallet = async () => {
    const { solana } = window;
  if (solana) {
    const response = await solana.connect();
    console.log('Connected with Public Key:', response.publicKey.toString());
    setWalletAddress(response.publicKey.toString());
    }
  };
  //Log inputValue 
  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
    } else {
      console.log('Empty input. Try again.');
    }
  };
  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button"
      onClick={connectWallet}>Connect to Wallet</button>
  );
  const renderConnectedContainer = () => (
    <div className="connected-container">
      {/* Input for gifs */}
      <input type="text" placeholder="Enter gif link!" value={inputValue} onChange={onInputChange}/>
      <button className="cta-button submit-gif-button" onClick={sendGif}>Submit</button>
      <div className="gif-grid">
        {gifList.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  //Call check wallet function
  useEffect(() => {
    window.addEventListener('load', async (event) => {
      await checkWalletConnected();
    });
  }, []);
  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      
      // Call Solana program here.
  
      // Set state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 Fared's Solana App</p>
          <p className="sub-text">
            Building a metaverse with Solana ✨
          </p>
          {/* Wallet not connected, render connect button */}
          {!walletAddress && renderNotConnectedContainer()}
          {/* Wallet connected */}
          {walletAddress && renderConnectedContainer()}
          
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
