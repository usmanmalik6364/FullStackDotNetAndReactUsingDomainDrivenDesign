import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../models/activity";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../stores/store";

interface Props{
    createOrEdit:(activity: Activity) => void;
    submitting:boolean;
}

export default function ActivityForm({ createOrEdit,submitting}:Props){
    const {activityStore} = useStore();
    const {selectedActivity,closeForm} = activityStore;
    const initialState = selectedActivity ?? {
        id:'',
        title:'',
        category:'',
        description: '',
        date:'',
        city:'',
        venue:''
    };
    
    const [activity,setActivity] = useState<Activity>(initialState);
    
    const handleSubmit = () =>{
        createOrEdit(activity);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const{name,value} = event.target;
        setActivity({...activity,[name]:value});
    }

    return(
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete = 'off'>
            <Form.Input onChange={handleInputChange} value={activity.title} name='title' placeholder="Title" />
            <Form.TextArea onChange={handleInputChange} value={activity.description} name='description' placeholder="Description" />
            <Form.Input onChange={handleInputChange} value={activity.category} name='category' placeholder="Category" />
            <Form.Input type="date"  onChange={handleInputChange} value={activity.date} name='date' placeholder="Date" />
            <Form.Input  onChange={handleInputChange} value={activity.city} name='city' placeholder="City" />
            <Form.Input onChange={handleInputChange} value={activity.venue} name='venue' placeholder="Venue" />
            <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
            <Button onClick={closeForm} floated="right" positive type="button" content="Cancel"/>
        </Form>
    </Segment>
    );
}