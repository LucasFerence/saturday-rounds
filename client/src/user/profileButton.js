import React from 'react';
import {ArrowBigRightLine} from 'tabler-icons-react';
import * as core from '@mantine/core';
import {useAuth0} from '@auth0/auth0-react';

/**
 * creates profile button
 * @return {button}
 */
const UserButton = () => {
  const theme = core.useMantineTheme();
  const {user} = useAuth0();


  return (
    <core.Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${core.rem(1)} solid ${
          theme.colorScheme === 'dark' ?
            theme.colors.dark[4] :
            theme.colors.gray[2]
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
                theme.colors.dark[6] :
                theme.colors.gray[0],
          },
        }}
      >
        <core.Group>
          <core.Avatar
            src={user?.picture}
            radius="xl"
          />
          <core.Box sx={{flex: 1}}>
            <core.Text size="sm" weight={500}>
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
