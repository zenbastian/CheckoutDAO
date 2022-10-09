import React, { useContext, useState } from 'react'
import Product from './Product'
import { Button, Modal, Popover, Typography, Result } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import './Cart.css'
import StoreContext from './StoreContext'
import QRCode from 'qrcode.react'

const { Text } = Typography

//takes merchantInfo.products

const stateToJson = (state) => {
  let stateStr = JSON.stringify(state)
  return stateStr.replace(/\\/g, '') //remove slashes
}

const Cart = () => {

  const store = useContext(StoreContext)

  const [showQr, setShowQr] = useState(false)
  const [showInfoPopover, setShowInfoPopover] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const hideQr = () => {
    setShowQr(false)
  }

  const afterQrModalClose = () => {
    if (showSuccess) {
      store.dispatch({ type: 'resetCart' })
      setShowSuccess(false)
    }
  }

  return (
    <div className="Cart">
      <div>
        {store.state.cartProducts.map(function (product) {
          return <Product product={product} key={product.name}/>
        })}
      </div>

      {store.state.cartTotal > 0 &&
      <div className="Cart--total">
        <div className="Cart--pay-button p-1" onClick={() => setShowQr(true)}>
          <h2>Pay ${store.state.cartTotal
            ? store.state.cartTotal.toFixed(2)
            : 0}</h2>
        </div>
      </div>
      }

      <Modal
        visible={showQr}
        onOk={hideQr}
        onCancel={hideQr}
        afterClose={afterQrModalClose}
        closable={false}
        title={null}
        footer={null}
        align="center"
        width="300px"
      >
        {showSuccess ? (

          <Result
            status="success"
            title="Order Complete"
            subTitle="Thanks for shopping with Intr!"
            extra={[
              <Button onClick={hideQr}>
                Back
              </Button>
            ]}
          />

        ) : (
          <>
            <div className="mb-1" align="center">
              <QRCode style={{ width: '100%', height: 'auto' }}
                      size={512}
                      value={stateToJson(store.state)}/>
            </div>

            <Button block
                    className="mb-1"
                    type="primary"
                    onClick={() => setShowSuccess(true)}
            >
              I'm done paying!
            </Button>

            <Button block
                    className="mb-1"
                    type="dashed"
                    onClick={hideQr}
            >
              Oops, let me modify my order.
            </Button>

            <div className="text-center">
              <Popover
                content="Open your Intr mobile app and scan the QR code to complete your order."
                visible={showInfoPopover}
                onVisibleChange={(val) => { setShowInfoPopover(val)}}
              >
                <Text type="secondary"
                      onClick={() => setShowInfoPopover(true)}>
                  scan this with your phon to store your data <QuestionCircleOutlined/>
                </Text>
              </Popover>
            </div>
          </>

        )}

      </Modal>

    </div>
  )
}

export default Cart
