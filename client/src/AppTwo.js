import React from 'react';
import {MantineProvider} from '@mantine/core';
import Dashboard from './views/Dashboard';

/**
 * Initialization for version two app
 */
class App extends React.Component {
  /**
   * Render the entire application
   * @return {MantineProvider}
   */
  render() {
    return (
      <MantineProvider
        theme = {{
          colorScheme: 'light',
          fontSizes: {
            xs: '0.6rem',
            sm: '0.75rem',
            md: '0.9rem',
            lg: '1rem',
            xl: '1.2rem',
          },
        }}
      >

        <Dashboard/>

      </MantineProvider>
    );
  }
}

export default App;
