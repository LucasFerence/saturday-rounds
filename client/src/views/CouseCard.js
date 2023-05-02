import {React} from 'react';
import PropTypes from 'prop-types';
import {
  ActionIcon,
  Card,
  Button,
  Image,
  Group,
  Text,
  createStyles,
} from '@mantine/core';
import {Bookmark} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({

  card: {
    backgroundColor: theme.colors.white,
    border: `0.15rem solid ${theme.colors.gray[3]}`,
  },

  section: {
    borderBottom: `0.15rem solid ${theme.colors.gray[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  label: {
    textTransform: 'uppercase',
  },

  scheduleButton: {
    'backgroundColor': theme.colors.brand[3],
    'flex': 1,
    '&:hover': {
      backgroundColor: theme.colors.brand[2],
    },
  },

  bookmarkIcon: {
    backgroundColor: theme.colors.white,
  },

  bookmark: {
    stroke: theme.colors.brand[3],
    strokeWidth: 1.25,
  },

}));

CourseCard.propTypes = {
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

  return (
    <Card withBorder className={classes.card} radius="md" p="md">

      <Card.Section>
        <Image src={props.image} alt={props.name} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Text className={classes.label} fz="lg" fw={500}>
          {props.name}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button className={classes.scheduleButton} radius="md">
          Schedule Tee Time
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