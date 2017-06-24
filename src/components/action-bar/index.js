import React, { Component } from 'react';
import { translate } from 'react-i18next';
import style from './style.styl';


let button = (props) => (
    <li>
        <i data-toggle="tooltip" data-placement="left" title={props.title} className="material-icons">{props.icon}</i>
    </li>
)

let ActionBar = ({...props}) => (
    <div id="action-bar" className={style['action-bar']}>
        <div className={style['buttons']}>
        </div>
    </div>
)

export default translate(['action-bar'], {wait: true, withRef: true})(ActionBar);
