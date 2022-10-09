import React, { useContext, useEffect } from 'react'
import Cart from './Cart'
import 'antd/dist/antd.css'
import './App.css'
import StoreContext from './StoreContext'
import { Col, Row, Empty, Button } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { ethers, utils } from 'ethers';
import {address, abi, } from './CheckoutHub.json'
import ercabi from './erc20.json'
// 
console.log(abi)
console.log(address)
// import { Web3Auth } from "@web3auth/web3auth";
// import detectEthereumProvider from '@metamask/detect-provider';

// const clientId = "YOUR_WEB3AUTH_CLIENT_ID"; // get from https://dashboard.web3auth.io
function App () {

  const store = useContext(StoreContext)

  console.log('store.state from App Component:')
  console.log(store)

  useEffect(() => {
    const init = async () => {
    
      console.log('window.ethereum');
      console.log(window.ethereum);
      if (window.ethereum) {
      try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // }
      // This function detects most providers injected at window.ethereum
      // const provider = await detectEthereumProvider();
      //let chainId = '0x89' //polygon
      let chainId = '0x13881' //mumbai
      // chainId = web3.utils.toHex(chainId);
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }],
      });
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      //const currencyAddress = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" // polygon
      const currencyAddress = "0xe11A86849d99F524cAC3E7A0Ec1241828e332C62" // mumbai

      const contractInstance = new ethers.Contract(address, abi, signer)
      const ercInstance = new ethers.Contract(currencyAddress, ercabi, signer)


      console.log('contractInstance:')
      console.log(contractInstance)

      let price = utils.parseEther('0.01')
  
      let tx = await ercInstance.approve(address, price)

      let tx2 = await contractInstance.checkout('0x0aa5ec627C8Ab686704dCe70457DBb6161572212', 12341, Math.floor(Date.now() / 1000) ,  Math.floor(Date.now() / 1000) + 2 , price, currencyAddress)
    }
    catch(e) {
      console.log('error', e)
    }
      // let params = [
      //   {
      //     from: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
      //     to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
      //     gas: '0x76c0', // 30400
      //     gasPrice: '0x9184e72a000', // 10000000000000
      //     value: '0x9184e72a', // 2441406250
      //     data:
      //       '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
      //   },
      // ];
      ///ADD ETHERS APPROVE & SEND FROM GERMANY! PP 
      // if (window.ethereum) {
      //   console.log('window.ethereum success')
      //   console.log(window.ethereum)


      //  const contract = new ethers.Contract(address, abi, provider); 
        // const unsignedTx = await contract.populateTransaction.approve(spender, amount);

      
      //   let tx = await window.ethereum
      //   .request({
      //     method: 'eth_sendTransaction',
      //     params,
      //   })
      //   .then((result) => {
      //     console.log('result')
      //     console.log(result)
      //     // The result varies by RPC method.
      //     // For example, this method will return a transaction hash hexadecimal string on success.
      //   })
      //   .catch((error) => {
      //     console.log('error', error)
      //     // If the request fails, the Promise will reject with an error.
      //   });
      //   console.log('tx:')
      //   console.log(tx)
      //   // From now on, this should always be true:
      //   console.log(window.ethereum.isConnected())

      // } else {
      //   console.log('Please install MetaMask!');
      // }
      // try {

      // const web3auth = new Web3Auth({
      //   clientId,
      //   chainConfig: {
      //     chainNamespace: CHAIN_NAMESPACES.EIP155,
      //     chainId: "0x1",
      //     rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
      //   },
      // });

      // await web3auth.initModal();
      // await web3auth.connect();
    // };
    }
  }
    init();
  }, []);



  return (
    <div className="App">
      <div className="App--header">

        <Row justify="space-between" align="middle">
          <Col flex={1} className="p-1">
            <h3 className="title">
              <ShoppingCartOutlined style={{ fontSize: '24px', verticalAlign: 'top', marginRight: '6px' }} /> {store.state.merchantName}
            </h3>
          </Col>
          <Col flex="none" className="logo">
            <a href="https://checkoutDAO.eth" target="_blank">checkoutDAO.eth</a>
          </Col>


        </Row>

      </div>

      {store.state.cartProducts.length > 0 ? (
        <Cart/>
      ) : (
        <Empty className="p-2"
               description="No products are setup for this store yet"
        />
      )}
    </div>
  )
}

export default App