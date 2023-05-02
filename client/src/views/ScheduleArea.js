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
      <Grid.Col span={4}>
        <CourseCard
          name='Little Bennet'
          image='https://www.mcggolf.com/images/galleries/little-bennett/LB10.jpg'
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <CourseCard
          name='Rattlewood'
          image='https://golf-pass.brightspotcdn.com/dims4/default/c72db68/2147483647/strip/true/crop/1257x811+91+0/resize/930x600!/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2F0b%2Fef%2F042a53b6fd172acfa086e999acff%2F38341.jpg'
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <CourseCard
          name='Needwood'
          image='https://www.mcggolf.com/images/galleries/needwood/ND18Green.jpg'
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <CourseCard
          name='Hampshire Greens'
          image='https://golf-pass.brightspotcdn.com/1a/46/cebf87c3e955e43d5236d4cd5db0/58767.jpg'
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <CourseCard
          name='Laytonsville'
          image='https://www.mcggolf.com/images/galleries/laytonsville/LV15.jpg'
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <CourseCard
          name='Poolesville'
          image='https://www.mcggolf.com/images/galleries/poolesville/PV15-1-e1553106823612.jpg'
        />
      </Grid.Col>
    </Grid>
  );
}

export default ScheduleArea;
