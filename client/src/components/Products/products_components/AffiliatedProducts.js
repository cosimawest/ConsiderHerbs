import Async from 'react-async';
import Axios from 'axios';
import React, {useState} from 'react';
import config from '../../../config.js';

const loadProductInfo = () => {
    return Axios.post(
        config.address + '/api/Products/GetAll'
    )
    .then(res => {
        console.log(res)
        return res.data;
    })
    .catch(err => {
        console.error(err);
        return err;
    });
}

const AffiliatedProducts = (props) => {
    return (
            <div id="grid-container">
                <Async promiseFn={loadProductInfo}>
                    {({data, err, isLoading}) => {
                        if (isLoading) return "Loading...";
                            if (err) return `Oops, something went wrong: ${err.message}`
                            if (data && Array.isArray(data)) {
                                return (
                                    data.filter(entry => (
                                        (entry.name.toLowerCase().includes(props.typed.toLowerCase()) || 
                                        entry.description.toLowerCase().includes(props.typed.toLowerCase())) &&
                                        entry.type.includes("Affiliate")))
                                    .map((productEntry) => {
                                        return (
                                                <div id="grid-item"> 
                                                    <div className="outer">
                                                        <div className="inner">
                                                            <img src={productEntry.image}/>
                                                        </div>
                                                    </div> 
                                                    {props.userLevel === 3 ? 
                                                    <form>
                                                        <button type='button' onClick={() => props.editFn(productEntry)}>Edit</button>
                                                        <button type='submit' onClick={(event) => {
                                                            Axios.delete(
                                                                config.address + '/api/Product/' + productEntry.name
                                                            )
                                                            .then((res) => {
                                                                window.location.reload();
                                                            })
                                                            .catch((err) => {
                                                                console.error(err);
                                                            })
                                                        }}>
                                                        Delete
                                                        </button>
                                                    </form> :
                                                    null}
                                                    
                                                    <a id="name" href={productEntry.link} target="_blank">{productEntry.name}</a>
                                                    <div id="description"> {productEntry.description} </div>
                                                    {productEntry.price ? 
                                                        <div id="price"> ${productEntry.price} </div> :
                                                        null
                                                    }
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

export default AffiliatedProducts;
