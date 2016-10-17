import Ember from 'ember';

const POMODORO_SETTING = 1500;
const SHORT_BREAK_SETTING = 300;
const LONG_BREAK_SETTING = 600;

const TIMER_STATUS_START = "START";
const TIMER_STATUS_STOP = "STOP";
const TIMER_STATUS_RESET = "RESET";

export default Ember.Controller.extend({
  clock: Ember.inject.service('system-clock'),

  timeDuration: 0,
  timerStatus: "STOP",
  loop: Ember.computed('clock.date', function(){

    let timeleft = this.get('timeDuration');
    let timerStatus = this.get('timerStatus');

    switch(timerStatus){
      case TIMER_STATUS_START:
        this.set('timeDuration', timeleft - 1);
        break;
      case TIMER_STATUS_STOP:
        this.set('timeDuration', timeleft);
        break;
      case TIMER_STATUS_RESET:
        break;
      default:
        break;

    }

    console.log('timeDuration' + this.get('timeDuration'));

    return this.get('clock.date');
  }),
  actions: {
    setInitialTime(setting){
      switch(setting){
        case "POMODORO":
          this.set('timeDuration', POMODORO_SETTING);
          break;
        case "SHORT_BREAK":
          this.set('timeDuration', SHORT_BREAK_SETTING);
          break;
        case "LONG_BREAK":
          this.set('timeDuration', LONG_BREAK_SETTING); 
          break;
        default:
          break;
      }
    },
    setTimerCommand(command){
      switch(command){
        case "START":
          this.set('timerStatus', TIMER_STATUS_START);
          break;
        case "STOP":
          this.set('timerStatus', TIMER_STATUS_STOP);
          break;
        case "RESET":
          this.set('timerStatus', TIMER_STATUS_RESET);
          break;
        default:
          break;
      }
    }
  }
});