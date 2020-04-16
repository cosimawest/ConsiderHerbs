import Async from 'react-async';
import Axios from 'axios';
import React, {useState} from 'react';
import config from '../../../config.js';

const loadProductInfo = () => {
    return Axios.get(
        config.address + '/api/Products/'
    )
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
        return err;
    });
}

const ConsiderProducts = (props) => {
    return (
            <div>
                <Async promiseFn={loadProductInfo}>
                    {({data, err, isLoading}) => {
                        if (isLoading) return "Loading...";
                            if (err) return `Oops, something went wrong: ${err.message}`
                            if (data && Array.isArray(data)) {
                                return (
                                    data.filter(entry => (
                                        entry.name.toLowerCase().includes(props.typed.toLowerCase()) || 
                                        entry.description.toLowerCase().includes(props.typed.toLowerCase()) ||
                                        entry.type.includes("ConsiderHerbs")))
                                    .map((productEntry) => {
                                    return (
                                            <div id="grid-item"> 
                                                <div id="product-image">&nbsp;</div>
                                                <div id="name"> {productEntry.name} </div>
                                                <div id="description"> {productEntry.description} </div>
                                                <div id="price"> ${productEntry.price} </div>
                                            </div>
                                    );
                                })
                            );
                        }
                    }}
                </Async>
            </div>
    );
}

export default ConsiderProducts;