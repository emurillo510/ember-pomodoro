import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/route';

const ENTER_KEY_CODE = 13;

export default Ember.Controller.extend(KeyboardShortcuts, {
    pomodoroName: "",
    actions: {
        addPomodoro(event) {
            let keyCode = event.keyCode;

            console.log('keyCode', keyCode);

            if(keyCode == ENTER_KEY_CODE){
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
    },
    keyboardShortcuts: {
        'enter': function(){
            alert('hello');
        }
    }
});