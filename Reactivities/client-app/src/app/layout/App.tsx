import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Activity } from './models/activity';
import NavBar from './NavBar';
import {v4 as uuid} from 'uuid';
import AcitivtyDashboard from './activites/dashboard/ActivityDashboard';
import agent from '../api/agent';
// import { useStore } from './stores/store';
function App() {

  const [activities,setActivties] = useState<Activity[]>([]);
  // const {activityStore} = useStore();
  const [selectedActivity,setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] = useState<boolean>(false);
  useEffect(()=>{
    agent.Activities.list().then(response => {
      const activities : Activity[] = [];
      response.forEach(activity =>{
        activity.date= activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivties(activities);
    })
  },[]); 
  
  const handleSelectActivity = (id:string) =>{
    setSelectedActivity(activities.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () =>{
    setSelectedActivity(undefined);
  }

  const handleFormOpen = (id?: string) =>{
    id? handleSelectActivity(id):handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = ()=>{
    setEditMode(false);
  }

  const handleCreateOrEditActivity = (activity:Activity) =>{
    activity.id 
    ? setActivties([...activities.filter(x=>x.id!==activity.id),activity])
    : setActivties([...activities,{...activity, id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  const handleDeleteActivity=(id: string) =>{
    setActivties([...activities.filter(x => x.id!==id)]);
  }
  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop:'7em'}}>
        {
          activities && activities.length> 0 && 
          <AcitivtyDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm ={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          />
        }
      </Container>
    </>
  )
}

export default App
