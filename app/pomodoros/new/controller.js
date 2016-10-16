import Ember from 'ember';

export default Ember.Controller.extend({
    pomodoroName: "",
    actions: {
        addPomodoro() {
            
            let name = this.get('pomodoroName');
            let status = "open";

            let pomodoro = this.get('store').createRecord('pomodoro', {
                name,
                status 
            });
            
            pomodoro.save().then(()=> {
                this.set('pomodoroName', '');
                this.transitionToRoute('index');
            }).catch(()=> {

            });
        }
    }
});