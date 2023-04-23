import {React, useState, useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import PropTypes from 'prop-types';

import axios from 'axios';

import {Button} from '@mantine/core';
import Course from './Course';

ClubCourses.propTypes = {
  clubId: PropTypes.string,
};

/**
 * Render the Courses for a given club
 * @param {*} props
 * @return {div}
 */
function ClubCourses(props) {
  const [club, setClub] = useState([]);
  const [courses, setCourses] = useState([]);

  const {getAccessTokenSilently} = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.get(`courses/${props.clubId}`, config)
          .then((res) => {
            setClub(res.data);
            setCourses(res.data?.courses);
          });
    };

    fetchData();
  }, [props.clubId, getAccessTokenSilently]);

  const [currCourse, setCurrCourse] = useState();

  return (
    <div>
      {
        courses.map((course) =>
          <Button key={course.id} onClick={() => setCurrCourse(course.id)}>
            {course.name}
          </Button>,
        )
      }

      {currCourse != null && <Course selectedCourse={currCourse} {... club}/>}
    </div>
  );
}

export default ClubCourses;
