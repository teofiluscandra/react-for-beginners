import React, { Component } from 'react'
import {formatPrice} from '../helpers'
import PropTypes from 'prop-types'

export class Order extends Component {

  renderOrder = (key) => {
    const product = this.props.products[key]
    const count = this.props.order[key]
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if(!product || product.status === 'unavailable') {
      return <li key={key}>Sorry, {product ? product.name : 'Product'} is no longer available! {removeButton}</li>
    }

    return (
      <li key={key}>
        <span>{count} lbs {product.name} {removeButton}</span>
        <span className="price">{formatPrice(count * product.price)}</span>
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const product = this.props.products[key]
      const count = this.props.order[key]
      const isAvailable = product && product.status === 'available'
      if(isAvailable) {
        return prevTotal + (count * product.price || 0)
      }
      return prevTotal
    }, 0)
    return (
        <div>
          <h2>Your Order</h2>
          <ul className="order">
            {orderIds.map(this.renderOrder)}
            <li className="total">
              <strong>Total :</strong>
              {formatPrice(total)}
            </li>
          </ul>
        </div>
    )
  }

  static propTypes = {
    products: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
  }
}


export default Order
