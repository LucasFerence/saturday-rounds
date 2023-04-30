import {React} from 'react';
import {Grid} from '@mantine/core';
import CourseCard from './CouseCard';

/**
 * Render the schedule area
 * @param {*} props
 * @return {div}
 */
function ScheduleArea(props) {
  // TODO: Get all the supported courses and render them
  return (
    <Grid>
      <Grid.Col span={3}>
        <CourseCard
          name='Little Bennet'
          image='https://www.mcggolf.com/images/galleries/little-bennett/LB10.jpg'
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <CourseCard
          name='Little Bennet'
          image='https://www.mcggolf.com/images/galleries/little-bennett/LB10.jpg'
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <CourseCard
          name='Little Bennet'
          image='https://www.mcggolf.com/images/galleries/little-bennett/LB10.jpg'
        />
      </Grid.Col>
    </Grid>
  );
}

export default ScheduleArea;
