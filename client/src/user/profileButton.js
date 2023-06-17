import {React, useContext} from 'react';
import {ArrowBigRightLine} from 'tabler-icons-react';
import * as core from '@mantine/core';
import {useAuth0} from '@auth0/auth0-react';
import UserProfile from './UserProfile';
import {DashboardContext} from '../Dashboard';

/**
 * @param {var} variable
 * @return{capitalized}
 */
function capitalizeFirstLetter(variable) {
  if (typeof variable !== 'string') {
    return variable; // Return the variable as is if it's not a string
  }

  if (variable.length === 0) {
    return variable; // Return an empty string if the variable is empty
  }

  return variable.charAt(0).toUpperCase() + variable.slice(1);
}

/**
 * creates unstyled profile button
 * @return {button}
 */
const UserButton = () => {
  const theme = core.useMantineTheme();
  const {user} = useAuth0();
  const name = capitalizeFirstLetter(user?.nickname);
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
        height: 'fit-content',
        padding: '10px, 0px',
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
          'borderRadius': theme.sm,
          'color':
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            color: theme.white,
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
            size={'50px'}
          />
          <core.Box sx={{flex: 1}}>
            <core.Text size="17px" weight={550}>
              {name}
            </core.Text>
            <core.Text color='theme.grey' size="s" weight={100}>
              {user?.email}
            </core.Text>
          </core.Box>
          {theme.dir === 'ltr' ? (
            <ArrowBigRightLine size={core.rem(22)} />
          ) : (
            <ArrowBigRightLine size={core.rem(22)} />
          )}
        </core.Group>
      </core.UnstyledButton>
    </core.Box>
  );
};

export default UserButton;
