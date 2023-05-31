import React from 'react';
import {MantineProvider} from '@mantine/core';
import {Dashboard} from './Dashboard';


/** "KYle was here and git finally worked" */

/**
 * Initialization for version two app please working
 * Color theme: https://colorhunt.co/palette/48383842855b90b77dd2d79f
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
            brandGrey: [
              '#E8E6E6', '#D1CDCD', '#BAB4B4', '#A49B9B',
              '#8D8383', '#766A6A', '#5F5151', '#483838',
            ],
            brandGreenOne: [
              '#E7F0EA', '#D0E1D6', '#B8D1C1', '#A1C2AD',
              '#89B398', '#71A484', '#5A9470', '#42855B',
            ],
            brandGreenTwo: [
              '#F1F6EF', '#E3EDDF', '#D5E4CE', '#C8DBBE',
              '#BAD2AE', '#ACC99E', '#9EC08D', '#90B77D',
            ],
            brandEarth: [
              '#F9FAF3', '#F4F5E7', '#EEF0DB', '#E9EBCF',
              '#E3E6C3', '#DDE1B7', '#D8DCAB', '#D2D79F',
            ],
          },
          fontFamily: 'Montserrat, sans-serif',
          fontSizes: {
            xs: '0.6rem',
            sm: '0.75rem',
            md: '0.9rem',
            lg: '1rem',
            xl: '1.2rem',
          },
          other: {
            fontCursive: 'Courgette',
          },
        }}
      >

        <Dashboard/>

      </MantineProvider>
    );
  }
}

export default App;
