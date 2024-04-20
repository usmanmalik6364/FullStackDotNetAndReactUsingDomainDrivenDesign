import { Grid } from "semantic-ui-react";
import { Activity } from "../../models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props{
    activities: Activity[];
    selectedActivity:Activity | undefined;
    selectActivity:(id:string) => void;
    cancelSelectActivity:()=>void;
    editMode: boolean;
    openForm:(id:string) => void;
    closeForm: () => void;
    createOrEdit:(activity: Activity) => void;
    deleteActivity:(id:string)=>void;

}

export default function AcitivtyDashboard(props:Props){
   const {
        activities,
        selectActivity,
        selectedActivity,
        cancelSelectActivity,
        editMode,
        closeForm,
        openForm,
        createOrEdit,
        deleteActivity
        } = props;

    return (
        <Grid >
            <Grid.Column width='10'>
            <ActivityList 
                activities={activities}
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}
            />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode && 
                    <ActivityDetails
                     activity={selectedActivity}
                      cancelSelectActivity={cancelSelectActivity}
                      openForm={openForm}
                      />
                }
                {editMode && 
                <ActivityForm
                 closeForm={closeForm}
                 createOrEdit={createOrEdit}
                    activity={selectedActivity}/>
                }
            </Grid.Column>
        </Grid>
    )
}