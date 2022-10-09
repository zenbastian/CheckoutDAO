import React, { useContext } from 'react'
import { Row, Col, Button } from 'antd'
import { MinusOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons'
import StoreContext from './StoreContext'

const Product = ({ product }) => {
  const store = useContext(StoreContext)

  const handleQuantityChange = (event) => {
    let newQuantity = Math.max(event.target.value, 0)
    store.dispatch(({
      type: 'changeProductQuantity',
      message: { product: product, newQuantity: newQuantity },
    })) // make negative total change, as decremented.
  }

  const incrementQauntity = (byAmount) => {
    let newQuantity = Math.max(product.quantity + byAmount, 0)
    store.dispatch(({
      type: 'changeProductQuantity',
      message: { product: product, newQuantity: newQuantity },
    })) // make negative total change, as decremented.
  }

  return (
    <>
      <Row>


        <Col flex="auto" className="Product Product--border-bottom">
          <Row align="middle" justify="space-between">

            <Col flex="auto">
              <Row>

                <Col flex="60px"
                     className={`Product--purchased ${product.quantity > 0
                       ? 'show'
                       : 'hide'}`}>
                    <CheckOutlined className="Product--purchased-check"/>
                </Col>

                <Col className="p-1" style={{ alignSelf: 'center' }}>

                  <h3 className="mb-0">{product.name}</h3>
                  <span className="Product--description">{product.description}</span>

                </Col>

              </Row>
            </Col>
            <Col flex="none" className="p-1">

              {product.quantity > 0 ? (
                <div>
                  <span className="Product--price">${product.price}</span>

                  <Button shape="circle"
                          onClick={() => incrementQauntity(-1)}
                          size="small">
                    <MinusOutlined/>
                  </Button>

                  <span className="Product--quantity">{product.quantity}</span>

                  <Button shape="circle"
                          onClick={() => incrementQauntity(1)}
                          size="small">
                    <PlusOutlined/>
                  </Button>
                </div>

              ) : (
                <>
                  <span className="Product--price">${product.price}</span>

                  <Button shape="round"
                          onClick={() => { incrementQauntity(1) }}
                          size="small">
                    <PlusOutlined/>Buy
                  </Button>
                </>
              )}

            </Col>
          </Row>

        </Col>
      </Row>
    </>
  )
}

export default Product
