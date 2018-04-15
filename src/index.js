import React from 'react';
import PropTypes from 'prop-types';

import {HashRouter, NavLink} from 'react-router-dom';

import style from './style.styl';

let MenuItem = ({title, active, onClick}) => (
    <a className={active ? 'active' : null} aria-current={active} href='#' onClick={onClick}>
        <li>{title}</li>
    </a>
)


class Menu extends React.Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        selected: PropTypes.number
    }

    static defaultProps = {
        active: 0,
    }

    constructor(props) {
        super(props)
        this.state = {
            active: this.props.active,
        }
    }

    setActiveItem = (item) => {
        this.setState({active: item})
    }

    render() {
        const {items} = this.props;
        return(
            <nav className={style['app-menu']}>
                <ul>
                    {items.map((i, k) => (
                        <MenuItem key={k} active={this.state.active === k} {...i} onClick={event => this.setActiveItem(k)} />
                    ))}
                </ul>
                <i className={style['active-marker']}></i>
            </nav>
        )
    }
}

let RouterMenu = ({items}) => (
    <nav className={style['app-menu']}>
        <ul>
            {items.map((e) => (
                <NavLink to={e.path}><li>{e.title}</li></NavLink>
            ))}
        </ul>
    </nav>
)

let Test = (props) => (
    <HashRouter>
        <div style={{background: 'black'}}>
            <Menu {...props}/>
            <br />
            <RouterMenu {...props}/>
        </div>
    </HashRouter>
)

export {Test as default, Menu, RouterMenu}
