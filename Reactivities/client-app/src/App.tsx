import { useEffect, useState } from 'react'
import axios from 'axios';
import { Header, List, ListItem } from 'semantic-ui-react';
function App() {

  const [activities,setActivties] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/activities')
          .then(response =>{
            setActivties(response.data);
          });
  },[]);  
  return (
    <div>
      <Header as='h2' icon='users' content='Reactivties'/>
      <List>
        {activities.map((acitivity:any) =>(
          <ListItem key={acitivity.id}>
            {acitivity.title}
          </ListItem>

        ))}
      </List>
    </div>
  )
}

export default App
