import React from 'react';
import './Glossary.css'
import IntroBar from './intro.png'


const Glossary =()=>{
    return(
        <div>
            <img className = "intro-image" src={ IntroBar } alt="intro" />
        </div>
        ////image here 
        ////search bar 
        ////terms components, big letters, plus each term starting wiht that letter, plus definition
        ///letters nav bar to the side 

    );
}

export default Glossary;