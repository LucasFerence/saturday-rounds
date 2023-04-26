import {
  AppShell,
  Navbar,
  Header,
  Group} from '@mantine/core';
import {React, useState} from 'react';
import {AreaLinks} from './AreaLinks';

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
  const [renderedArea, setRenderedArea] = useState([]);
  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={
        <Navbar width={{base: 300}} height='100vh' p="xs">
          <Navbar.Section grow mt="xs">
            <AreaLinks renderCallback={(val) => setRenderedArea(val)}/>
          </Navbar.Section>
          <Navbar.Section>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group sx={{height: '100%'}} px={20} position="apart">
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ?
              theme.colors.dark[8] :
              theme.colors.gray[0],
          height: '100vh',
        },
      })}
    >
      {renderedArea.length === undefined ? renderedArea : 'Welcome!'}
    </AppShell>
  );
}

export default Dashboard;
