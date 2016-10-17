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
  timeleftMin: 0,
  timeleftSec: 0,
  initialTime: 0,
  timerStatus: "STOP",
  loop: Ember.computed('clock.date', function(){

    let timeleft = this.get('timeDuration');

    let timeleftMin = Math.floor(timeleft / 60);
    let timeleftSec = timeleft % 60;
    let timerStatus = this.get('timerStatus');

    switch(timerStatus){
      case TIMER_STATUS_START:
         if(timeleft === 0){
           this.set('timerStatus', TIMER_STATUS_STOP);
         }
        this.set('timeDuration', (timeleft - 1));
        this.set('timeleftMin', timeleftMin);
        this.set('timeleftSec', timeleftSec);
        console.log('min left ' + timeleftMin);
        console.log('sec left ' + timeleftSec);
        break;
      case TIMER_STATUS_STOP:
        this.set('timeDuration', timeleft);
        break;
      case TIMER_STATUS_RESET:
        this.set('timerStatus',TIMER_STATUS_STOP);
        break;
      default:
        break;

    }
    return this.get('clock.date');
  }),
  actions: {
    setInitialTime(setting){
      switch(setting){
        case "POMODORO":
          this.set('timeDuration', 1500);
          this.set('timeleftMin',  Math.floor(1500/60));
          this.set('initialTime', POMODORO_SETTING);
          break;
        case "SHORT_BREAK":
          this.set('timeDuration', 300);
          this.set('timeleftSec', Math.floor(300/60));
          this.set('initialTime', SHORT_BREAK_SETTING);
          break;
        case "LONG_BREAK":
          this.set('timeDuration', 600);
          this.set('timeleftSec', Math.floor(600/60));
          this.set('initialTime', LONG_BREAK_SETTING);
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
          let initialTime = this.get('initialTime');
          let timeleftMin = Math.floor(initialTime / 60);
          let timeleftSec = initialTime % 60;
          this.set('timeDuration', initialTime);
          this.set('timeleftMin', timeleftMin);
          this.set('timeleftSec', timeleftSec);
          break;
        default:
          break;
      }
    }
  }
});