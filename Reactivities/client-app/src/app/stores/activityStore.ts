import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";

export default class ActivityStore{
    activities: Activity[] =[];
    selectedActivity:Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    loadActivities = async () =>{
        this.setLoadingInitial(true);
        try {
           const activities = await  agent.Activities.list();
            activities.forEach(activity =>{
                activity.date= activity.date.split('T')[0];
                runInAction(()=>{
                this.activities.push(activity);
                });
              });
              this.setLoadingInitial(false);
        } catch (error) {
            this.setLoadingInitial(false);
            console.log(error);
        }
    }
    selectActivity= (id:string)=>{
        this,this.selectedActivity  = this.activities.find(a => a.id ===  id);
        
    }
    cancelSelectedActivity = ()=>{
        this.selectedActivity = undefined;
    }
    openForm = (id?:string)=>{
        id? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }
    closeForm = () =>{
        this.editMode = false;
    }
    setLoadingInitial = (state:boolean)=>{
        this.loadingInitial = state;
    }
}