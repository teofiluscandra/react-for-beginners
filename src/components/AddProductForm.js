import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class AddProductForm extends Component {
  createProduct(e) {
      e.preventDefault();
      const product = {
          name : this.name.value,
          price : this.price.value,
          status : this.status.value,
          desc : this.desc.value,
          image : this.image.value
      }
      this.props.addProduct(product)
      this.productForm.reset()
  }

  render() {
    return (
      <form ref={(input) => this.productForm = input} className="fish-edit" onSubmit={(e) => this.createProduct(e)}>
        <input ref={(input) => this.name = input} type="text" placeholder="Name" />
        <input ref={(input) => this.price = input} type="text" placeholder="Price" />
        <select ref={(input) => this.status = input}>
            <option value="available">Fresh !</option>
            <option value="unavailable">Sold Out !</option>
        </select>
        <textarea ref={(input) => this.desc = input} placeholder="Desc"></textarea>
        <input ref={(input) => this.image = input} type="text" placeholder="Image" />
        <button type="submit">Add Item</button>
      </form>
    )
  }

  static propTypes = {
      addProduct: PropTypes.func.isRequired
  }
}

export default AddProductForm
