import React from 'react';
import {MantineProvider} from '@mantine/core';

import Clubs from './views/Clubs';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';
import UserProfile from './user/UserProfile';

/**
 * Initialization for app
 */
class App extends React.Component {
  /**
   * Render the entire application
   * @return {MantineProvider}
   */
  render() {
    return (
      <MantineProvider>

        <LoginButton />
        <LogoutButton />
        <UserProfile />

        <Clubs />

      </MantineProvider>
    );
  }
}

export default App;
