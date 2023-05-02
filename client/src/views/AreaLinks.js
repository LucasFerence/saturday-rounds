import {React, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {
  ThemeIcon,
  UnstyledButton,
  Group,
  Text,
  createStyles,
} from '@mantine/core';
import {Golf, Settings2} from 'tabler-icons-react';
import ScheduleArea from './ScheduleArea';
import {DashboardContext} from './Dashboard';

const useStyles = createStyles((theme) => ({

  areaButton: {
    'display': 'block',
    'width': '100%',
    'padding': theme.spacing.xs,
    '&:hover': {
      backgroundColor: theme.colors.brand[2],
    },
  },
}));

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
  const {classes} = useStyles();

  return (
    <UnstyledButton
      onClick={() => props.renderCallback(props.render)}
      className={classes.areaButton}
      sx={(theme) => ({
        backgroundColor: props.selected != false ?
          theme.colors.brand[2] :
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
      return <ScheduleArea />;
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
  const {setRenderedArea} = useContext(DashboardContext);

  const links = data.map((link) => {
    // Define the key for the link
    const linkKey = link.label;

    return <AreaLink
      {...link}
      key={linkKey}
      selected={selectedKey === linkKey}
      renderCallback={(render) => {
        setSelectedKey(linkKey);
        setRenderedArea(render);
      }}
    />;
  });
  return <div>{links}</div>;
};
