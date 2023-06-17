import {React, useContext} from 'react';
import {ArrowBigRightLine} from 'tabler-icons-react';
import * as core from '@mantine/core';
import {useAuth0} from '@auth0/auth0-react';
import UserProfile from './UserProfile';
import {DashboardContext} from '../Dashboard';

/**
 * creates unstyled profile button
 * @return {button}
 */
const UserButton = () => {
  const theme = core.useMantineTheme();
  const {user} = useAuth0();
  const {setRenderedArea} = useContext(DashboardContext);
  const render = () => {
    return <UserProfile />;
  };
  return (
    <core.Box
      onClick={() => {
        setRenderedArea(render);
      }}
      sx={{
        height: '10vh',
        borderTop: `${core.rem(1)} solid ${
          theme.colorScheme === 'dark' ?
            theme.colors.brandGreen[4] :
            theme.colors.brandGrey[2]
        }`,
      }}
    >
      <core.UnstyledButton
        sx={{
          'display': 'block',
          'width': '100%',
          'padding': theme.spacing.xs,
          'borderRadius': theme.radius.sm,
          'color':
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ?
                theme.colors.brandGreenOne[7] :
                theme.colors.brandGreenOne[7],
          },
        }}
      >
        <core.Group>
          <core.Avatar
            src={user?.picture}
            radius="xl"
            size={'3vw'}
          />
          <core.Box sx={{flex: 1}}>
            <core.Text size="md" weight={500}>
              {user?.name}
            </core.Text>
            <core.Text color="dimmed" size="xs">
              {user?.email}
            </core.Text>
          </core.Box>
          {theme.dir === 'ltr' ? (
            <ArrowBigRightLine size={core.rem(18)} />
          ) : (
            <ArrowBigRightLine size={core.rem(18)} />
          )}
        </core.Group>
      </core.UnstyledButton>
    </core.Box>
  );
};

export default UserButton;
