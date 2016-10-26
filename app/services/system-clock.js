import Clock from 'ember-cli-clock/services/clock';

export default Clock.extend({
  init(){
    this._super(...arguments);
  },
  interval: 1000
});
