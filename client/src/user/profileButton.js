/* eslint-disable valid-jsdoc */
import {React, useContext, useEffect, useState} from 'react';
import {ArrowBigRightLine} from 'tabler-icons-react';
import {Box, UnstyledButton, Group, Avatar, Text,
  useMantineTheme, rem} from '@mantine/core';
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

/** \
 * @param {*} key;
 * @return {boolean}
 */

/**
 * creates unstyled profile button
 * @return {button}
 */
const UserButton = () => {
  const {setRenderedArea, renderedArea} = useContext(DashboardContext);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    console.log(renderedArea);
    if (renderedArea.type?.name === 'UserProfile') {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [renderedArea]);
  const rendered = () => {
    return <UserProfile />;
  };
  const theme = useMantineTheme();
  const {user} = useAuth0();
  const name = capitalizeFirstLetter(user?.nickname);
  return (
    <Box
      className='userButton'
      onClick={() => setRenderedArea(rendered)}
      sx={(theme) => ({
        backgroundColor: selected != false ?
          theme.colors.brandGreenOne[7] :
          theme.colors.brandEarth[0],
        color: selected != false ?
          theme.colors.brandEarth[0] :
          theme.black,
      })}
    >
      <UnstyledButton
        sx={{
          'display': 'block',
          'width': '100%',
          'padding': theme.spacing.xs,
          'borderRadius': theme.sm,
          '&:hover': {
            color: theme.white,
            backgroundColor:
              theme.colorScheme === 'dark' ?
                theme.colors.brandGreenOne[7] :
                theme.colors.brandGreenOne[7],
          },
        }}
      >
        <Group>
          <Avatar
            src={user?.picture}
            radius="xl"
            size={'lg'}
          />
          <Box sx={{flex: 1}}>
            <Text size="xlg" weight={570}>
              {name}
            </Text>
            <Text color='theme.grey' size="s" weight={50}>
              {user?.email}
            </Text>
          </Box>
          {theme.dir === 'ltr' ? (
            <ArrowBigRightLine size={rem(25)} />
          ) : (
            <ArrowBigRightLine size={rem(25)} />
          )}
        </Group>
      </UnstyledButton>
    </Box>
  );
};

export default UserButton;
