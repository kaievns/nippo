/**
 * Inmplements the currently displayed unit element
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St.
 */
Nippo.Desk = new Class({
  initialize: function() {
    this.element = $E('div', {id: 'nippo-desk'});
    
    this.block = $E('div');
    
    this.element.insert($E('fieldset').insert([
      $E('legend', {html: 'Current Symbol'}), this.block
    ]));
  },
  
  update: function(symbol) {
    this.block.update(symbol);
    return this;
  }
});