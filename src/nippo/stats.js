/**
 * Implements the statistics block
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St.
 */
Nippo.Stats = new Class({
  initialize: function() {
    this.element  = $E('div', {id: 'nippo-stats'});
    
    this.errors   = $E('span', {html: '0'});
    this.attempts = $E('span', {html: '0'});
    this.percent  = $E('span', {html: '0%'});
    this.strike   = $E('span', {html: '0'});
    
    this.element.insert($E('fieldset').insert([
      $E('legend', {html: 'Statistics'}),
      
      $E('div').insert([$E('label', {html: 'Errors:'}),   this.errors]),
      $E('div').insert([$E('label', {html: 'Attempts:'}), this.attempts]),
      $E('div').insert([$E('label', {html: 'Percent:'}),  this.percent]),
      $E('div').insert([$E('label', {html: 'Strike:'}),   this.strike])
    ]));
  },
  
  reset: function() {
    console.log('reset')
  },
  
  count: function() {}
});