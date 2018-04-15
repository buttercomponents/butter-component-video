import React from 'react';
import PropTypes from 'prop-types';

import style from './style.styl';

let MenuItem = ({title, active, onClick}) => (
    <a href='#'>
        <li className={active ? style.active : null} onClick={onClick}>{title}</li>
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
    <ul>
        {items.map((e) => (
            <NavLink to={e.path}>{e.title}</NavLink>
        ))}
    </ul>
)

export {Menu as default, RouterMenu}
