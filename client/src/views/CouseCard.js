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
    backgroundColor: theme.colorScheme === 'dark' ?
      theme.colors.dark[7] :
      theme.white,
  },

  section: {
    borderBottom: `1rem solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  bookmark: {
    fill: theme.colors.green[8],
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
    <Card withBorder radius="md" p="md">

      <Card.Section>
        <Image src={props.image} alt={props.name} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Text fz="lg" fw={500}>
          {props.name}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{flex: 1}}>
          Schedule Tee Time
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <Bookmark size="2rem" className={classes.bookmark} stroke={1.5} />
        </ActionIcon>
      </Group>

    </Card>
  );
}

export default CourseCard;
