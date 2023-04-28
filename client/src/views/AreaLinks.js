import {React, useState} from 'react';
import PropTypes from 'prop-types';
import {ThemeIcon, UnstyledButton, Group, Text} from '@mantine/core';
import {Golf, Settings2} from 'tabler-icons-react';

AreaLink.propTypes = {
  icon: PropTypes.element,
  color: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.bool,
  render: PropTypes.func,
  renderCallback: PropTypes.func,
};

/**
 * Renders a link to an area with the provided properties
 * @param {*} props
 * @return {UnstyledButton}
 */
function AreaLink(props) {
  return (
    <UnstyledButton
      onClick={() => props.renderCallback(props.render)}
      sx={(theme) => ({
        'display': 'block',
        'width': '100%',
        'padding': theme.spacing.xs,
        'borderRadius': theme.radius.sm,
        'color': theme.colorScheme === 'dark' ?
          theme.colors.dark[0] :
          theme.black,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ?
              theme.colors.dark[6] :
              theme.colors.gray[2],
        },
        'backgroundColor': props.selected != false ?
          theme.colors.gray[2] :
          theme.colors.white,
      })}
    >
      <Group>
        <ThemeIcon color={props.color} variant="light">
          {props.icon}
        </ThemeIcon>

        <Text size='xl'>
          {props.label}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

const data = [
  {
    icon: <Golf size="3rem"/>, color: 'green', label: 'Schedule',
    render: () => {
      return <div>Schedule Area</div>;
    },
  },
  {
    icon: <Settings2 size="3rem"/>, color: 'red', label: 'Management',
    render: () => {
      return <div>Management Area</div>;
    },
  },
];

AreaLinks.propTypes = {
  renderCallback: PropTypes.func,
};

/**
 * Export and return all of the links with the data
 * @param {*} props
 * @return {div}
 */
export function AreaLinks(props) {
  const [selectedKey, setSelectedKey] = useState([]);
  const links = data.map((link) => {
    // Define the key for the link
    const linkKey = link.label;

    return <AreaLink
      {...link}
      key={linkKey}
      selected={selectedKey === linkKey}
      renderCallback={(render) => {
        setSelectedKey(linkKey);
        props.renderCallback(render);
      }}
    />;
  });
  return <div>{links}</div>;
};
