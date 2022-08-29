import { React, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import { Button } from '@mantine/core';
import ClubCourses from './ClubCourses';

function Clubs(props) {

    const [clubs, setClubs] = useState([]);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {

        const fetchData = async () => {
            const token = await getAccessTokenSilently();

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            axios.get('clubs', config)
                .then(res => {
                    setClubs(res.data)
                })
        }

        fetchData()

    }, [getAccessTokenSilently]);

    const [currClub, setCurrClub] = useState();

    return (
        <div>
            {
                clubs.map(club =>
                    <Button key={club.id} onClick={() => setCurrClub(club.id)}>
                        {club.name}
                    </Button>
                )
            }
            
            {currClub != null && <ClubCourses clubId={currClub}/>}
        </div>
    )
}

export default Clubs