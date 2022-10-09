import React, { useEffect, useContext } from 'react'
import StoreContext from './StoreContext'
// import uuidv4 from 'uuid/v4'

const localStorageSaveKey = (merchantSite) => 'cart-app-state-' + merchantSite

const defaultStoreConfig = {
  merchantName: '',
  merchantSite: '',
  merchantEmail: '',
  products: [],
}

const defaultState = {
  ...defaultStoreConfig,
  sessionId: '',
  cartProducts: [],
  cartTotal: 0,
}

const appStateReducer = (state, action) => {

  switch (action.type) {
    case 'setMerchantSite':
      return {
        ...state,
        merchantSite: action.message,
      }
    case 'setSessionID':
      return {
        ...state,
        sessionId: action.message,
        text: 'your session ID is ' + (state.sessionId),
      }
    case 'setAvailableProducts':
      return {
        ...state,
        cartProducts: action.message,
      }
    case 'addProductToCart':
      if (state.cartProducts.find(cartProduct => cartProduct.name === action.message.name)) {
        return { ...state }
      }
      state.cartProducts.push(
        Object.assign({}, action.message, { quantity: 1 }))
      updateCartTotal(state)
      return { ...state }
    case 'removeProductFromCart':
      state.cartProducts = state.cartProducts.splice(
        state.cartProducts.indexOf(action.message), 1) //typo
      updateCartTotal(state)
      return { ...state }
    case 'changeProductQuantity':
      state.cartProducts = state.cartProducts.map((product) => {
        if (product.name === action.message.product.name) {
          return Object.assign({}, product,
            { quantity: action.message.newQuantity })
        }
        return product
      })
      updateCartTotal(state)
      return { ...state }
    case 'updateStoreConfig':
      return initState(defaultState)
    case 'resetCart':
      state.sessionId = ''
      state.cartProducts = []
      saveStateToLocalStorage(state)
      return initState(defaultState)
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }

}

const updateCartTotal = (state) => {
  state.cartTotal = state.cartProducts.reduce(
    (acc, value) => acc + (value['quantity'] || 0) * (value['price'] || 0), 0)
}

const initState = (initialState) => {
  try {
    let storeConfig = storeConfigProp || defaultStoreConfig
    let localState = getLocalStorageState(storeConfig.merchantSite)

    // merge default state with local storage state and then with store config
    let state = {
      ...initialState,
      ...localState,
      ...storeConfig,
    }

    if (!state.sessionId) {
      //state.sessionId = uuidv4() ?? null
    }

    // Store config is the single source of product truth (not localstorage)
    // go through all products and add them to cart products
    // if they already exist in cart products, then update their price and other details
    // by nature of this logic it will also remove the cartProducts that no longer exist
    state.cartProducts = state.products.map((product) => {
      let existingCartProduct = state.cartProducts.find(cartProduct => cartProduct.name === product.name)
      if (existingCartProduct) {
        existingCartProduct.price = product.price
        existingCartProduct.description = product.description  //qr string wasn't sending cartProduct description for mufking buckwheat so added it here, correct?
        return existingCartProduct
      }
      return Object.assign({}, product, { quantity: 0 })
    })

    updateCartTotal(state)

    return state
  } catch (e) {
    console.log(`Failed to initialize state. Error: ${e}`)
    return defaultState
  }
}

const getLocalStorageState = (merchantSite) => {
  let localState = JSON.parse(
    localStorage.getItem(localStorageSaveKey(merchantSite)))
  if (localState != null) {
    console.log('Found local storage state:')
    console.log(localState)
  } else {
    console.log('Local storage state not found.')
  }
  return localState
}

const saveStateToLocalStorage = (state) => {
  try {
    console.log('Saving state to local storage')

    // we only need to save user's sessionId and cartProducts
    let serializedState = JSON.stringify({
      cartProducts: state.cartProducts,
      sessionId: state.sessionId,
    })
    localStorage.setItem(localStorageSaveKey(state.merchantSite),
      serializedState)
  } catch (e) {
    console.log(`Failed to save state to local storage. error: ${e}`)
  }

}

let storeConfigProp = null
const StoreProvider = ({ storeConfig, children }) => {
  storeConfigProp = storeConfig
  const [state, dispatch] = React.useReducer(appStateReducer, defaultState,
    initState) //userReducer returns state + dispatch.

  useEffect(() => {
    dispatch({ type: 'updateStoreConfig' })
  }, [storeConfig])

  useEffect(() => {
    saveStateToLocalStorage(state)
  }, [state])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider