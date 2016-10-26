import Ember from 'ember';

const POMODORO_SETTING = 1500;
const SHORT_BREAK_SETTING = 300;
const LONG_BREAK_SETTING = 600;

const TIMER_STATUS_START = "START";
const TIMER_STATUS_STOP = "STOP";

export default Ember.Controller.extend({
  clock: Ember.inject.service('system-clock'),

  timeDuration: POMODORO_SETTING,
  timeleftMin: Math.floor(1500/60),
  timeleftSec: "00",
  initialTime: POMODORO_SETTING,
  timerStatus: TIMER_STATUS_STOP,
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
        this.set('timeleftMin', this.formatTime(timeleftMin));
        this.set('timeleftSec', this.formatTime(timeleftSec));
        break;
      case TIMER_STATUS_STOP:
        this.set('timeDuration', timeleft);
        break;
      default:
        break;

    }
    return this.get('clock.date');
  }),
  formatTime(number){
    if(number < 10){
      return "0" + number;
    } else {
      return number;
    }
  },
  actions: {
    setInitialTime(setting){
      switch(setting){
        case "POMODORO":
          this.set('timeDuration',POMODORO_SETTING);
          this.set('timeleftMin', this.formatTime(Math.floor(1500/60)));
          this.set('timeleftSec', this.formatTime(0));
          this.set('initialTime', POMODORO_SETTING);
          break;
        case "SHORT_BREAK":
          this.set('timeDuration', SHORT_BREAK_SETTING);
          this.set('timeleftMin', this.formatTime(Math.floor(300/60)));
          this.set('timeleftSec', this.formatTime(0));
          this.set('initialTime', SHORT_BREAK_SETTING);
          break;
        case "LONG_BREAK":
          this.set('timeDuration', LONG_BREAK_SETTING);
          this.set('timeleftMin', Math.floor(600/60));
          this.set('timeleftSec', this.formatTime(0));
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
          this.set('timerStatus', TIMER_STATUS_STOP);
          let initialTime = this.get('initialTime');
          let timeleftMin = Math.floor(initialTime / 60);
          let timeleftSec = initialTime % 60;
          this.set('timeDuration', this.formatTime(initialTime));
          this.set('timeleftMin', this.formatTime(timeleftMin));
          this.set('timeleftSec', this.formatTime(timeleftSec));
          break;
        default:
          break;
      }
    }
  }
});