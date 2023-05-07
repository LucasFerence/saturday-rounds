import {React, useContext} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Flex,
  Group,
  Select,
  Title,
  Text,
  createStyles,
  CloseButton,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {DatePickerInput, TimeInput} from '@mantine/dates';
import {CalendarEvent, ClockEdit, ListNumbers} from 'tabler-icons-react';
import {DashboardContext} from './Dashboard';

const useStyles = createStyles((theme) => ({

  pageContainer: {
    marginLeft: '0rem',
    maginTop: '0rem',
  },

  formContainer: {
    marginLeft: '1rem',
    marginTop: '3rem',
  },

  formField: {
    marginBottom: '2rem',
  },
}));

ScheduleCoursePage.propTypes = {
  courseId: PropTypes.string,
};

/**
 * Render a course scheduling page
 * @param {*} props
 * @return {div}
 */
function ScheduleCoursePage(props) {
  const {classes} = useStyles();
  const {setRenderedArea, previousArea} = useContext(DashboardContext);

  return (
    <Container className={classes.pageContainer}>

      <Group>
        <CloseButton
          size="xl"
          onClick={() => setRenderedArea(previousArea)}
        />

        <Title>Course: {props.courseId}</Title>
      </Group>

      <Container className={classes.formContainer}>
        <Flex>
          <ScheduleForm />
        </Flex>
      </Container>

    </Container>
  );
}

/**
 * Render a schedule form
 * @param {*} props
 * @return {div}
 */
function ScheduleForm(props) {
  const {classes} = useStyles();

  // Initialize the form
  const form = useForm({

    initialValues: {
      numPlayers: '4',
      teeTimeDate: undefined,
      minTime: undefined,
      maxTime: undefined,
    },

    validate: {
      teeTimeDate: (value) =>
        (value == undefined ? 'Must select tee time date' : null),
      minTime: (value) =>
        (value == undefined ? 'Must select minimum time' : null),
      maxTime: (value) =>
        (value == undefined ? 'Must select maxium time' : null),
    },
  });

  const today = new Date();

  return (
    <form>

      <Select
        className={classes.formField}
        icon={<ListNumbers color='black'/>}
        label={<Title order={2}>Number of Players</Title>}
        size='lg'
        data={['1', '2', '3', '4']}
        required
        withAsterisk={false}
        styles={(theme) => ({
          item: {
            '&[data-selected]': {
              backgroundColor: theme.colors.brandGreenTwo[7],
            },
            ...theme.fn.hover(
                {
                  backgroundColor: theme.colors.brandGreenTwo[7],
                },
            ),
          },
        })}
        {...form.getInputProps('numPlayers')}
      />

      <DatePickerInput
        className={classes.formField}
        icon={<CalendarEvent color='black'/>}
        placeholder="Pick Date"
        label={<Title order={2}>Tee Time Date</Title>}
        description={<Text fz="md">Date to schedule tee time</Text>}
        required
        minDate={today}
        size='lg'
        allowDeselect
        withAsterisk={false}
        getDayProps={(date) => {
          return {
            sx: (theme) => ({
              '&[data-selected]': {
                backgroundColor: theme.colors.brandGreenTwo[7],
              },
              ...theme.fn.hover(
                  {
                    backgroundColor: theme.colors.brandGreenTwo[7],
                  },
              ),
            }),
          };
        }}
        {...form.getInputProps('teeTimeDate')}
      />

      <TimeInput
        className={classes.formField}
        icon={<ClockEdit color='black'/>}
        label={<Title order={2}>Earliest Time</Title>}
        description={
          <Text fz="md">
            Earliest time in which a tee time can be booked
          </Text>
        }
        format="12"
        size='lg'
        required
        withAsterisk={false}
        {...form.getInputProps('minTime')}
      />

      <TimeInput
        className={classes.formField}
        icon={<ClockEdit color='black'/>}
        label={<Title order={2}>Latest Time</Title>}
        description={
          <Text fz="md">
            Latest time in which a tee time can be booked
          </Text>
        }
        format="12"
        size='lg'
        required
        withAsterisk={false}
        {...form.getInputProps('maxTime')}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default ScheduleCoursePage;
