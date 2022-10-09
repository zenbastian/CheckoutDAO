import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './intr-app/App'
import * as serviceWorker from './serviceWorker'
import { merchantInfoAsObj, merchantInfoAsURI } from './intr-app/testURLData'
import StoreProvider from './intr-app/StoreProvider'



const getStoreConfiguration = () => {
  // uncomment to use test data
  // return merchantInfoAsObj
  // Or use http://localhost:3000/?s=%7B%22merchantName%22%3A%22Nielsen's%20Sweets%20and%20Organic%20Treats%22%2C%22merchantSite%22%3A%22http%3A%2F%2Flocalhost%3A3000%2F%22%2C%22merchantEmail%22%3A%22pay%40amazon.ca%22%2C%22products%22%3A%5B%7B%22name%22%3A%22Organic%20Buckwheat%20Honey%22%2C%22price%22%3A11.99%2C%22description%22%3A%22Product%20of%20Vancouver%20Island.%20100g.%20Glass%20container.%22%7D%2C%7B%22name%22%3A%22Fresh%20Unpasteurized%20Buttermilk%20-%201.5L%22%2C%22price%22%3A6.5%2C%22description%22%3A%22Raw.%205%25%20fat.%22%7D%2C%7B%22name%22%3A%22Fair%20Trade%2099%25%20Chocolate%22%2C%22price%22%3A3.99%2C%22description%22%3A%22%22%7D%2C%7B%22name%22%3A%22Rare%20Cactus%20Seeds%22%2C%22price%22%3A21%2C%22description%22%3A%22Origin%3A%20Raramuri%20tribe%22%7D%5D%7D
  // Or use http://localhost:3000/?s=%7B%22merchantName%22%3A%22Nielsen's%20Sweets%20and%20Organic%20Treats%22%2C%22merchantSite%22%3A%22http%3A%2F%2Flocalhost%3A3000%2F%22%2C%22merchantEmail%22%3A%22pay%40amazon.ca%22%2C%22products%22%3A%5B%7B%22name%22%3A%22Organic%20Buckwheat%20Honey%22%2C%22price%22%3A11.99%2C%22description%22%3A%22Product%20of%20Vancouver%20Island.%20100g.%20Glass%20container.%22%7D%2C%7B%22name%22%3A%22Fresh%20Unpasteurized%20Buttermilk%20-%201.5L%22%2C%22price%22%3A6.5%2C%22description%22%3A%22Raw.%205%25%20fat.%22%7D%2C%7B%22name%22%3A%22Fair%20Trade%2099%25%20Chocolate%22%2C%22price%22%3A3.99%2C%22description%22%3A%22%22%7D%2C%7B%22name%22%3A%22Rare%20Cactus%20Seeds%22%2C%22price%22%3A21%2C%22description%22%3A%22Origin%3A%20Raramuri%20tribe%22%7D%5D%7D
  console.log(merchantInfoAsURI)
  const urlParams = new URLSearchParams(window.location.search);
  const merchantSite = (window.location !== window.parent.location) ? document.referrer : document.location.href

  if (urlParams.has('s')) {
    const storeConfigJsonString = urlParams.get('s') // no need to decode here, urlParams.get('s') does it for us
    const storeConfig = JSON.parse(storeConfigJsonString);
    storeConfig.merchantSite = merchantSite
    return storeConfig
  }

  return { merchantSite: merchantSite }
}

function AppWithStore () {
  const [storeConfig, setStoreConfig] = React.useState(getStoreConfiguration())

  return (
    <StoreProvider storeConfig={storeConfig}>
      <App/>
    </StoreProvider>
  )
}

ReactDOM.render(<AppWithStore/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
