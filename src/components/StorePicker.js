import React, {Component} from 'react'
import {getFunName} from '../helpers'

class StorePicker extends Component {

    goToStore(e) {
        e.preventDefault()
        this.props.history.push(`/store/${this.storeInput.value}`)
    }
    render() {
        return (
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Please Enter the store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }}></input>
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

export default StorePicker