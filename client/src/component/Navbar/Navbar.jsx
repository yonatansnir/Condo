import React from 'react';
import './Navbar.css';

const Navbar = (props)=>{
    return(
        <ul>
            <li><a href='#'>{props.woman}</a></li>
            <li><a href='#'>{props.men}</a></li>
            <li><a href='#'>{props.boys}</a></li>
            <li><a href='#'>{props.girls}</a></li>
            <li><a href='#'>{props.lingerie}</a></li>
            <li><a href='#'>{props.home}</a></li>
            <li><a href='#'>{props.furniture}</a></li>
            <li><a href='#'>{props.beauty}</a></li>
            <li><a href='#'>{props.brands}</a></li>
        </ul>
    )

}

export default Navbar;