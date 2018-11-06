import React, { Component } from 'react'
import AddProductForm from './AddProductForm'
import PropTypes from 'prop-types'
import {app} from '../base'
import firebase from 'firebase/app';
import 'firebase/auth'
export class Inventory extends Component {
  state = {
    uid: null,
    owner: null
  }

  logout = () => {
    app.auth().signOut().then((result) => {
      this.setState({
        uid : null
      })
    })
  }

  handleChange = (e, key) => {
    const product = this.props.products[key]

    // take a copy of that fish and update it with new data
    const updatedProduct = {
      ...product,
      [e.target.name]: [e.target.value]
    }
    
    this.props.updateProduct(key, updatedProduct)
  }

  authHandler = (authData) => {
    // grab the store info
    const storeRef = app.database().ref(this.props.storeId)
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {}

      // claim it to our own if there is no owner already
      if(!data.owner) {
        storeRef.child('owner').set(authData.user.uid)
        this.setState({
          owner : authData.user.uid
        })
      } else {
        this.setState({
          owner : data.owner
        })
      }
    })
    this.setState({
      uid : authData.user.uid
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({user})
      } else {
        // No user is signed in.
      }
    });
  }

  authenticate = () => {
    var provider = new firebase.auth.GithubAuthProvider();
    app.auth().signInWithPopup(provider).then((authData) => {
      this.authHandler(authData)
    }).catch((err) => {
      console.log(err)
    })
  }

  renderLogin = () => {
    return (
      <nav className="login">
        <p>Sign in to manage your store repository</p>
        <button className="github" onClick={() => this.authenticate()}>Login with Github</button>
      </nav>
    )
  }

  renderInventory = (key) => {
    const product = this.props.products[key]
    return(
      <div className="fish-edit" key={key}>
        <form className="fish-edit">
          <input name="name" onChange={(e) => this.handleChange(e,key)} value={product.name} type="text" placeholder="Name" />
          <input name="price" onChange={(e) => this.handleChange(e,key)} value={product.price} type="text" placeholder="Price" />
          <select name="status" onChange={(e) => this.handleChange(e,key)} value={product.status}>
              <option value="available">Fresh !</option>
              <option value="unavailable">Sold Out !</option>
          </select>
          <textarea name="desc" onChange={(e) => this.handleChange(e,key)} value={product.desc} placeholder="Desc"></textarea>
          <input name="image" onChange={(e) => this.handleChange(e,key)} value={product.image} type="text" placeholder="Image" />
          <button 
            onClick={
              (e)=> {
                e.preventDefault()
                this.props.deleteProduct(key)
              }
              }>
            Remove Product
          </button>
        </form>
      </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>

    // check if they are not login
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // check if they are the owner of the current store
    if(this.state.uid !== this.state.owner) {
      return(
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
        <div>
          <p>Inventory</p>
          {logout}
          {Object.keys(this.props.products).map(this.renderInventory)}
          <AddProductForm addProduct={this.props.addProduct}/>
          <button onClick={this.props.loadProducts}>Load Samples</button>
        </div>
    )
  }

  static propTypes = {
      products: PropTypes.object.isRequired,
      updateProduct: PropTypes.func.isRequired,
      deleteProduct: PropTypes.func.isRequired,
      addProduct: PropTypes.func.isRequired,
      loadProducts: PropTypes.func.isRequired,
      storeId: PropTypes.string.isRequired
  }
}

export default Inventory
