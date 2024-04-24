import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import {v4 as uuid} from 'uuid';
import AcitivtyDashboard from '../activites/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
const  App = () =>{

  const [activities,setActivties] = useState<Activity[]>([]);
  const {activityStore} = useStore();
  const[submitting,setSubmitting] = useState<boolean>(false);
  useEffect(()=>{
    activityStore.loadActivities();
  },[activityStore]); 
  
 


  const handleCreateOrEditActivity = (activity:Activity) =>{
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setActivties([...activities.filter(x=>x.id!==activity.id),activity]);
        setSubmitting(false);
      });
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivties([...activities,activity]);
        setSubmitting(false);
      });
    }
  }

  const handleDeleteActivity=(id: string) =>{
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivties([...activities.filter(x => x.id !==id)]);
      setSubmitting(false);
    })
    setActivties([...activities.filter(x => x.id!==id)]);
  }
  if(activityStore.loadingInitial){
    return<LoadingComponent content='Loading app' />
  }
  return (
    <>
      <NavBar/>
      <Container style={{marginTop:'7em'}}>
          <AcitivtyDashboard 
          activities={activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          />
      </Container>
    </>
  )
}

export default observer(App);
