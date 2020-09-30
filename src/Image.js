import React, { Component } from 'react'
//import Grid from '@material-ui/core/Grid';

class Image extends Component {
    render() {
        return (
            <div>
                <img src={this.props.imageURL} alt="image not found"/>
            </div>
        )
    }
}

export default Image;
