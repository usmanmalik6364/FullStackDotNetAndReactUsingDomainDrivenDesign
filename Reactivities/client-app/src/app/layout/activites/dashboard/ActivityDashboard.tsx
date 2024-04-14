import { Grid } from "semantic-ui-react";
import { Activity } from "../../models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";

interface Props{
    activities: Activity[];
}

export default function AcitivtyDashboard(props:Props){
   const {activities} = props;

    return (
        <Grid >
            <Grid.Column width='10'>
            <ActivityList activities={activities}/>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityDetails activity={activities[0]}/>
            </Grid.Column>
        </Grid>
    )
}