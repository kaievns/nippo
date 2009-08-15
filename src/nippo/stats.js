/**
 * Implements the statistics block
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St.
 */
Nippo.Stats = new Class({
  LEVEL_CHANGE_STRIKE: 8,
  
  initialize: function() {
    this.element  = $E('div', {id: 'nippo-stats'});
    
    this.errors   = $E('span');
    this.attempts = $E('span');
    this.percent  = $E('span');
    
    this.element.insert($E('fieldset').insert([
      $E('legend', {html: 'Statistics'}),
      
      $E('div').insert([$E('label', {html: 'Errors:'}),   this.errors]),
      $E('div').insert([$E('label', {html: 'Attempts:'}), this.attempts]),
      $E('div').insert([$E('label', {html: 'Percent:'}),  this.percent]),
      
      $E('input', {type: 'button', value: 'Reset'}).onClick(this.reset.bind(this))
    ]));
    
    this.setValues.apply(this, (Cookie.get('nippo-stats') || '').split(',').map('toInt'));
    
    this.resetStrikes();
  },
  
  reset: function() {
    return this.resetStrikes().setValues(0,0);
  },
  
  count: function(correct) {
    var overall = this.attempts.innerHTML.toInt() + 1;
    var errors  = this.errors.innerHTML.toInt();
    
    if (correct) {
      this.errorsStrike = 0;
      this.correctStrike ++;
    } else {
      errors ++;
      this.errorStrike ++;
      this.correctStrike = 0;
    }
    
    return this.setValues(errors, overall);
  },
  
  levelsUp: function() {
    var time = this.correctStrike == this.LEVEL_CHANGE_STRIKE;
    if (time)  this.resetStrikes();
    return time;
  },
  
  levelsDown: function() {
    var time = this.errorStrike == this.LEVEL_CHANGE_STRIKE;
    if (time)  this.resetStrikes();
    return time;
  },
  
// private
  
  setValues: function(errors, attempts) {
    errors   = errors   || 0;
    attempts = attempts || 0;
    percent  = attempts ? 100 - parseInt(errors/attempts*100) : 0;

    this.errors.innerHTML   = ''+errors;
    this.attempts.innerHTML = ''+attempts;
    this.percent.innerHTML  = ''+percent+'%';
    
    Cookie.set('nippo-stats', errors+","+attempts, {duration: 888});
    
    return this;
  },
  
  resetStrikes: function() {
    this.errorStrike   = 0;
    this.correctStrike = 0;
    
    return this;
  }
});