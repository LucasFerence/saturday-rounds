import {createContext, React, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {
  AppShell,
  Navbar,
  Header,
  Group,
  createStyles,
} from '@mantine/core';
import {AreaLinks} from './AreaLinks';

const useStyles = createStyles((theme) => ({

  shell: {
    padding: 'md',
    backgroundColor: theme.colors.white,
  },

  nav: {
    height: '100vh',
    p: 'xs',
    backgroundColor: theme.colors.white,
  },

  headerContent: {
    height: '100%',
    px: 20,
    backgroundColor: theme.colors.white,
  },

  areaSection: {
    mt: 'xs',
  },
}));

/**
 * Render the dashboard in an AppShell
 * Wrap this in a context provider so all child elements get access to context
 *
 * @param {*} props
 * @return {AppShell}
 */
export function Dashboard(props) {
  return (
    <DashboardContextProvider>
      <DashboardAppShell />
    </DashboardContextProvider>
  );
}

/**
 * Create the base AppShell that holds all dashboard data.
 * This is separated out so that the context can be applied
 *
 * Based on example:
 * https://github.com
 * /mantinedev/mantine/blob
 * /master/src/mantine-demos
 * /src/demos/core/AppShell/AppShell.demo.usage.tsx
 * @return {AppShell}
 */
function DashboardAppShell() {
  const {classes} = useStyles();
  const {renderedArea} = useContext(DashboardContext);

  return (
    <AppShell
      className={classes.shell}
      fixed={false}
      navbar={
        <Navbar className={classes.nav} width={{base: 300}}>
          <Navbar.Section className={classes.areaSection} grow>
            <AreaLinks/>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group className={classes.headerContent} position="apart">
          </Group>
        </Header>
      }
    >
      {renderedArea.length === undefined ? renderedArea : 'Welcome!'}
    </AppShell>
  );
}

export const DashboardContext = createContext();

DashboardContextProvider.propTypes = {
  children: PropTypes.element,
};

/**
 * Create a provider for the dashboard context
 * @param {*} props
 * @return {DashboardContext.Provider}
 */
export function DashboardContextProvider(props) {
  const [renderedArea, setRenderedArea] = useState([]);

  return (
    <DashboardContext.Provider value={{renderedArea, setRenderedArea}}>
      {props.children}
    </DashboardContext.Provider>
  );
}
