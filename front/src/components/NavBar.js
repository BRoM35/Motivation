import React, { Component } from 'react';
import './NavBar.css';
import { Drawer } from 'antd';
import {
  Link,
} from "react-router-dom";
import {
  MenuUnfoldOutlined,
} from '@ant-design/icons';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    }
  }

  onDrawerChange = (isShow) => {
    this.setState({
      isShow
    })
  }

  render() {
    const {isShow} = this.state;

    return (
      <div className='navbar'>
        <MenuUnfoldOutlined
          className='navbarMenuButton'
          onClick={() => this.onDrawerChange(true)}/>
        <Drawer
          width={300}
          title="Меню"
          placement="left"
          closable={false}
          onClose={() => this.onDrawerChange(false)}
          visible={isShow}
        >
          <div className='navbarList'>
            <Link onClick={() => this.onDrawerChange(false)} to="/">Мотивация</Link>
            <Link onClick={() => this.onDrawerChange(false)} to="/incidents">Инциденты</Link>
            <Link onClick={() => this.onDrawerChange(false)} to="/release">Релизы</Link>
            <Link onClick={() => this.onDrawerChange(false)} to="/sprints">Спринты</Link>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default NavBar;
