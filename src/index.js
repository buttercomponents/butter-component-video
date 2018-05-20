import React from 'react';
import PropTypes from 'prop-types';

import {HashRouter, NavLink} from 'react-router-dom';

import style from './style.styl';

const MenuItem = ({title, active, onClick}) => (
    <a className={active ? 'active' : null} aria-current={active}  onClick={onClick}>
        <li>{title}</li>
    </a>
)

const Identity = (a) => (a)

const Menu = ({items, active, action = Identity }) => (
    <nav className={style['app-menu']}>
        <ul>
            {items.map((i, k) => (
                <MenuItem key={k} active={active === k} {...i} onClick={event => action(k)} />
            ))}
        </ul>
        <i className={style['active-marker']}></i>
    </nav>
)

class StateMenu extends React.Component {

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
        this.setState(state => ({active: item}))
    }

    render() {
        const {items, child, ...props} = this.props;
        const {active} = this.state

        const Child = child ? new child({
            items: items[active],
            ...props
        }): null

        return (<div>
            <Menu {...props}
                  active={active} items={items}
                  action={this.setActiveItem.bind(this)} />
            {Child}
        </div>
        )

    }
}

let RouterMenu = ({items, location}) => (
    <nav className={style['app-menu']}>
        <ul>
            {items.map((e) => {
                 const title = e.title ? e.title: e
                 const path = e.path ? e.path : title;

                 return (
                     <NavLink key={title} to={path}><li>{title}</li></NavLink>
                 )
            })}
        </ul>
    </nav>)

let Test = (props) => (
    <HashRouter>
        <div style={{background: 'black'}}>
            <h1>menu</h1>
            <Menu {...props}/>
            <h1>router menu</h1>
            <RouterMenu {...props}/>
            <h1>state menu</h1>
            <StateMenu {...props}/>
        </div>
    </HashRouter>
)

export {Test as default, Menu, StateMenu, RouterMenu}
