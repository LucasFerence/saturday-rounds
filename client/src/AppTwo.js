import React from 'react';
import {MantineProvider} from '@mantine/core';
import {Dashboard} from './views/Dashboard';

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
          colors: {
            brandGrey: ['#483838'],
            brandDarkGreen: ['#42855B'],
            brandLightGreen: ['#90B77D'],
            brandLight: ['#D2D79F'],
            brand: ['#FFF8D6', '#F7E1AE', '#A4D0A4', '#617A55'],
          },
          primaryColor: 'brandLightGreen',
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
