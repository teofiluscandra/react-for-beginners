import React, {Component} from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFish from '../data/sample'
import Product from './Product';
import {base} from '../base'

class App extends Component {
    state = {
        products : {},
        order : {}
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.match.params.storeid}`, JSON.stringify(nextState.order))
    }

    componentWillMount() {
        this.ref = base.syncState(`${this.props.match.params.storeid}/products`,{
            context: this,
            state: 'products'
        })

        const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeid}`)

        if(localStorageRef) {
            this.setState({
                order : JSON.parse(localStorageRef)
            })
        }
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
      }

    addProduct = (product) => {
        //update our state
        const products = {...this.state.products}
        // add our new product
        const timestamp = Date.now()
        products[`product-${timestamp}`] = product
        this.setState({ products })
    }

    loadProducts = () => {
        this.setState({
            products : sampleFish
        })
    }

    addToOrder = (key) => {
        const order = {...this.state.order}
        order[key] = order[key] + 1 || 1
        this.setState({ order })
    }

    updateProduct = (key, updatedProduct) => {
        const products = {...this.state.products}
        products[key] = updatedProduct
        this.setState({ products })
    }

    deleteProduct = (key) => {
        const products = {...this.state.products}
        products[key] = null
        this.setState({ products })
    }

    deleteOrder = (key) => {
        const order = {...this.state.order}
        delete order[key]
        this.setState({ order })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fill me in"/>
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.products)
                                .map(key => <Product key={key} index={key} details={this.state.products[key]} addToOrder={this.addToOrder}/>)
                        }
                    </ul>
                </div>
                <Order 
                    order={this.state.order} 
                    products={this.state.products}
                    removeFromOrder={this.deleteOrder}
                />
                <Inventory 
                    addProduct={this.addProduct} 
                    loadProducts={this.loadProducts} 
                    products={this.state.products}
                    updateProduct={this.updateProduct}
                    deleteProduct={this.deleteProduct}
                    storeId={this.props.match.params.storeid}
                />
            </div>
        )
    }
}

export default App