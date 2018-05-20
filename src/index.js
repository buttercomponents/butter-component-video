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

const RouterMenu = ({items, child, ...props}) => {
    const key = location.href.split('/').pop()
    let active = -1
    for (let i in items) {
        const item = items[i]
        if ((item.path && item.path.split('/').pop() === key)
            || (item.id === key)
            || (item.title === key)) {
            active = i
            break;
        }
    }

    const Child = child ? new child({
        items: items[active],
        active,
        ...props
    }): null

    return <div>
        <nav className={style['app-menu']}>
            <ul>
                {items.map((e) => {
                     const title = e.title ? e.title: e
                     const path = e.path ? e.path : e.id ? id : title

                     return (
                         <NavLink key={path} to={path}><li>{title}</li></NavLink>
                     )
                })}
            </ul>
        </nav>
        {Child}
    </div>
}

const TestChild = (props) => (
    <div>
        {JSON.stringify(props)}
    </div>
)

let Test = (props) => (
    <HashRouter>
        <div style={{background: 'black'}}>
            <h1>menu</h1>
            <Menu {...props}/>
            <h1>router menu</h1>
            <h2>without child</h2>
            <RouterMenu {...props}/>
            <h2>with child</h2>
            <RouterMenu {...props} child={TestChild}/>
            <h1>state menu</h1>
            <h2>without child</h2>
            <StateMenu {...props}/>
            <h2>with child</h2>
            <StateMenu {...props} child={TestChild}/>
        </div>
    </HashRouter>
)

export {Test as default, Menu, StateMenu, RouterMenu}
