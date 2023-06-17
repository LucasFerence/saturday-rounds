import {
  React,
  createContext,
  useState,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import {
  AppShell,
  Navbar,
  Header,
  Group,
  createStyles,
  Title,
} from '@mantine/core';
import usePrevious from './hooks/usePrevious';
import {AreaLinks} from './area/AreaLinks';
import UserButton from './user/profileButton.js';

const useStyles = createStyles((theme) => ({

  shell: {
    padding: 'md',
    backgroundColor: theme.colors.brandEarth[0],
  },

  nav: {
    backgroundColor: theme.colors.brandEarth[0],
  },

  headerContent: {
    fontfamily: 'Libre Franklin',
    paddingLeft: '15px',
    color: 'white',
    height: '100%',
    px: 20,
    backgroundColor: theme.colors.brandGrey[7],
    borderBottom: 0,
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
        <Navbar className={classes.nav} width={{base: 340}}>
          <Navbar.Section className={classes.areaSection} grow>
            <AreaLinks/>
          </Navbar.Section>
          <Navbar.Section>
            <UserButton/>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={75}>
          <Group className={classes.headerContent} position="apart">
            <Title size="h1">Saturday Rounds</Title>
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
  const previousArea = usePrevious(renderedArea);

  return (
    <DashboardContext.Provider value={
      {renderedArea, setRenderedArea, previousArea}
    }>
      {props.children}
    </DashboardContext.Provider>
  );
}
