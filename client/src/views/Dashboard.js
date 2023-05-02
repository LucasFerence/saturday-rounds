import {React, useState} from 'react';
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
 *
 * Based on example:
 * https://github.com
 * /mantinedev/mantine/blob
 * /master/src/mantine-demos
 * /src/demos/core/AppShell/AppShell.demo.usage.tsx
 * @param {*} props
 * @return {AppShell}
 */
function Dashboard(props) {
  const {classes} = useStyles();

  const [renderedArea, setRenderedArea] = useState([]);

  return (
    <AppShell
      className={classes.shell}
      fixed={false}
      navbar={
        <Navbar className={classes.nav} width={{base: 300}}>
          <Navbar.Section className={classes.areaSection} grow>
            <AreaLinks renderCallback={(val) => setRenderedArea(val)}/>
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

export default Dashboard;
