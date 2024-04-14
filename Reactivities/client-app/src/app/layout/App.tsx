import { useEffect, useState } from 'react'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from './models/activity';
import NavBar from './NavBar';
import AcitivtyDashboard from './activites/dashboard/ActivityDashboard';
function App() {

  const [activities,setActivties] = useState<Activity[]>([]);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities')
          .then(response =>{
            setActivties(response.data);
          });
  },[]);  
  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        {
          activities && activities.length> 0 && 
          <AcitivtyDashboard activities={activities}/>
        }
      </Container>
    </>
  )
}

export default App
