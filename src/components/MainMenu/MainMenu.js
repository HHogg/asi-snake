import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem';

export default class MainMenu extends Component {
  render() {
    return (
      <Menu style={ { minHeight: 'var(--user-avatar__size)' } }>
        <MenuItem to="/game">
          Play
        </MenuItem>

        <MenuItem to="/about">
          About
        </MenuItem>

        <MenuItem to="/leaderboard">
          Leaderboard
        </MenuItem>
      </Menu>
    );
  }
}
