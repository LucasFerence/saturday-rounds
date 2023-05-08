import {React, useContext} from 'react';
import PropTypes from 'prop-types';
import {
  ActionIcon,
  Card,
  Button,
  Image,
  Group,
  Title,
  createStyles,
} from '@mantine/core';
import {Bookmark} from 'tabler-icons-react';
import {DashboardContext} from '../Dashboard';
import ScheduleCoursePage from './ScheduleCoursePage';

const useStyles = createStyles((theme) => ({

  card: {
    backgroundColor: theme.colors.white,
    border: `0.15rem solid ${theme.colors.brandGrey[3]}`,
  },

  section: {
    borderBottom: `0.15rem solid ${theme.colors.brandGrey[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  label: {
    textTransform: 'uppercase',
  },

  scheduleButton: {
    'backgroundColor': theme.colors.brandGreenTwo[7],
    'flex': 1,
    'textTransform': 'uppercase',
    '&:hover': {
      backgroundColor: theme.colors.brandGreenOne[7],
    },
  },

  bookmarkIcon: {
    backgroundColor: theme.colors.white,
  },

  bookmark: {
    stroke: theme.colors.brandGreenOne[7],
    strokeWidth: 1.25,
  },

}));

CourseCard.propTypes = {
  courseId: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
};

/**
 * Render a card for a specific course
 * @param {*} props
 * @return {div}
 */
function CourseCard(props) {
  const {classes} = useStyles();
  const {setRenderedArea} = useContext(DashboardContext);

  return (
    <Card withBorder className={classes.card} radius="md" p="md">

      <Card.Section>
        <Image src={props.image} alt={props.name} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Title className={classes.label} fz="xl" fw={500}>
          {props.name}
        </Title>
      </Card.Section>

      <Group mt="xs">
        <Button
          onClick={
            () => setRenderedArea(
                <ScheduleCoursePage courseId={props.courseId}/>,
            )
          }
          className={classes.scheduleButton}
          radius="md"
        >
          Schedule
        </Button>
        <ActionIcon
          className={classes.bookmarkIcon}
          variant="default"
          radius="md"
          size={36}
        >
          <Bookmark size="2rem" className={classes.bookmark} stroke={1.5} />
        </ActionIcon>
      </Group>

    </Card>
  );
}

export default CourseCard;
