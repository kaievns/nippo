/**
 * Top level class of the game
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St.
 */
var Nippo = new Class(Observer, {
  initialize: function(element) {
    this.element = $E('div', {id: 'nippo'}).insertTo(element);
  }
});