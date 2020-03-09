import Async from 'react-async';
import Axios from 'axios'
import React from 'react';

const loadTermInfo = () => {
    return Axios.get("http://localhost:5000/api/glossary")//Needs to be domain of the server
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            console.error(err);
            return err;
        });
}

const TermInfo = () => {
    let firstLetter = '';
    let id = '';

    return(
        <div>
            <Async promiseFn={loadTermInfo}>
                {({data, err, isLoading}) => {
                    if (isLoading) return "Loading...";
                    if (err) return `Oops, something went wrong: ${err.message}`
                    if (data) {
                        return (
                            data.map((glossaryEntry) => {
                                if (glossaryEntry.title.charAt(0) >= '0' && glossaryEntry.title.charAt(0) <= '9')
                                {
                                    if (firstLetter ===  '')
                                    {
                                        firstLetter = '#';
                                        id = firstLetter;
                                    }
                                }
                                else if (firstLetter !== glossaryEntry.title.charAt(0).toUpperCase())
                                {
                                    firstLetter = glossaryEntry.title.charAt(0).toUpperCase();
                                    id = firstLetter;
                                }
                                else
                                {
                                    id = '';
                                }
        
                                return(
                                    <div className="term-container" id={id}>
                                        <div className="large-letter">
                                            {id}
                                        </div>
                                        <div>
                                            <h1>{glossaryEntry.title}</h1>
                                            <table>
                                                <tr>
                                                    <th>Definition</th>
                                                    <td>{glossaryEntry.definition}</td>
                                                </tr>
                                                <tr>
                                                    <th>Usage</th>
                                                    <td>{glossaryEntry.usage}</td>
                                                </tr>
                                            </table>
                                        </div>
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

export default TermInfo;