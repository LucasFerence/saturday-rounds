import {React, useState, useEffect} from 'react';
import {Grid} from '@mantine/core';
import {useAuth0} from '@auth0/auth0-react';
import CourseCard from './CouseCard';
import {Details, Predicate} from '../details/details';

/**
 * Render the schedule area
 * @param {*} props
 * @return {div}
 */
function ScheduleArea(props) {
  // Hooks
  const [course, setCourse] = useState();
  const {getAccessTokenSilently} = useAuth0();

  console.log(course);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();

      const api = new Details(token);
      const predicate = new Predicate(
          'course', 'a6c6fa15-1b5d-4392-957d-f9f5587041a7',
      );

      api.withItem(predicate, (item) => {
        setCourse(item);
      });
    };

    fetchData();
  }, [getAccessTokenSilently]);

  // TODO: Get all the supported courses and render them
  return (
    <Grid>
      <Grid.Col span={4}>
        <CourseCard
          courseId='mcgGolf:21181'
          name='Little Bennet'
          image='https://www.mcggolf.com/images/galleries/little-bennett/LB10.jpg'
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <CourseCard
          courseId='mcgGolf:21175'
          name='Rattlewood'
          image='https://golf-pass.brightspotcdn.com/dims4/default/c72db68/2147483647/strip/true/crop/1257x811+91+0/resize/930x600!/quality/90/?url=https%3A%2F%2Fgolf-pass-brightspot.s3.amazonaws.com%2F0b%2Fef%2F042a53b6fd172acfa086e999acff%2F38341.jpg'
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <CourseCard
          courseId='mcgGolf:21180'
          name='Needwood'
          image='https://www.mcggolf.com/images/galleries/needwood/ND18Green.jpg'
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <CourseCard
          courseId='mcgGolf:21183'
          name='Hampshire Greens'
          image='https://golf-pass.brightspotcdn.com/1a/46/cebf87c3e955e43d5236d4cd5db0/58767.jpg'
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <CourseCard
          courseId='mcgGolf:21182'
          name='Laytonsville'
          image='https://www.mcggolf.com/images/galleries/laytonsville/LV15.jpg'
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <CourseCard
          courseId='mcgGolf:21176'
          name='Poolesville'
          image='https://www.mcggolf.com/images/galleries/poolesville/PV15-1-e1553106823612.jpg'
        />
      </Grid.Col>
    </Grid>
  );
}

export default ScheduleArea;
