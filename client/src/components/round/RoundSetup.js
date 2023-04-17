import React, { useState , useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'https://8000-jmc818386-golfapp-5cplpf2dlek.ws-us94.gitpod.io/api/'

function RoundSetup() {
    const [courses, setCourses] = useState ([])

    useEffect(() => {
        const getCourses = async () => {
            let config = {
                url:'/courses/',
                baseURL: BASE_URL,
                method: 'get',
            }
            let response = await axios.request(config);
            setCourses(response.data);
        }

        getCourses();
    }, [])

  return (

    <div>
        <div>
            {courses.map((c) => <h3>{c.name}</h3>)}
        </div>
    </div>
    

  )
}

export default RoundSetup