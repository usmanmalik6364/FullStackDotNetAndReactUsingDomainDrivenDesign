import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../models/activity";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

interface Props {
  activities: Activity[];
  deleteActivity:(id:string)=>void;
  submitting:boolean;
}

const  ActivityList =({ activities,deleteActivity,submitting }: Props)=> {
  const [target,setTarget] = useState<string>('');
  const {activityStore} = useStore();
  const handleActivityDelete = (e:SyntheticEvent<HTMLButtonElement>,id:string) =>{
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  
  
  return (
    <>
      <Segment>
        <Item.Group divided>
          {activities.map((activity) => (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                  <Item.Extra>
                    <Button onClick={()=>activityStore.selectActivity(activity.id)} floated="right" content="View" color="blue" />
                    <Button
                    name={activity.id} 
                    loading={submitting && target === activity.id}
                     onClick={(e)=>handleActivityDelete(e,activity.id)
                     } 
                     floated="right"
                      content="Delete"
                       color="red"
                        />
                    <Label basic content={activity.category} />
                  </Item.Extra>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}

export default observer(ActivityList);