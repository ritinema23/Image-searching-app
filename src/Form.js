import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';


export class Form extends Component {    

state = {
    text: '',
    amount: 5,
    api_key: '14945587-7d7e732725716c27398c4b9bd',
    images: [],
    open: false,
    currimg: ''
}

handleOpen = img => {
    this.setState({open: true, currimg: img})
}

handleClose = () => {
    this.setState({open: false})
}

onSearch = (e) => {
    this.setState({text: e.target.value}, () => {
        axios.get(`https://pixabay.com/api/?key=${this.state.api_key}&q=${this.state.text}
                    &image_type=photo&per_page=${this.state.amount}`)
            .then((res) => {this.setState({images: res.data.hits});
            })
            .catch(err => console.log(err));
    });
}

onAmountChange = (e) => {
    this.setState({amount: e.target.value})
}

    render() {

        const actions = [
            <Button label="Close" 
                        primary={true} 
                        onClick={this.handleClose} 
            > Close </Button>
        ]

        return (
            <div>
                <TextField className="textfield"
                           label="search for the image" 
                           fullWidth={true}
                           value={this.state.text}
                           onChange={this.onSearch}
                />

                <InputLabel>amount</InputLabel>
                <Select className="select"
                        fullWidth={true}
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                </Select>

                <GridList cols={4}>
                    {this.state.images.map((img) => (
                        <GridListTile>
                            <img src={img.previewURL} alt="image not found" />
                            <GridListTileBar
                                key={img.id}
                                title={img.tags}
                                subtitle={<span>by: {img.user}</span>}
                                actionIcon={
                                    <IconButton color="secondary"
                                                onClick={() => this.handleOpen(img.largeImageURL)}
                                    >
                                        <ZoomInIcon />
                                    </IconButton>
                                }
                            />
                            <Dialog actions={actions}
                                    modal={false}
                                    open={this.state.open}
                                    onRequestClose={this.handleClose}
                            >
                            <img src={this.state.currimg} alt="not found" style={{width: '100%'}}/>    
                            </Dialog>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }
}

export default Form;
