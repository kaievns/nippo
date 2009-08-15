/**
 * Top level class of the game
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St.
 */
var Nippo = new Class(Observer, {
  initialize: function(element) {
    this.alphabet = new Nippo.Alphabet();
    this.desk     = new Nippo.Desk();
    this.stats    = new Nippo.Stats();
    this.controls = new Nippo.Controls();
    
    this.element = $E('div', {id: 'nippo'}).insertTo(element).insert([
      this.alphabet.element,
      this.desk.element,
      this.stats.element,
      this.controls.element
    ]);
    
    var basics = this.alphabet.getBasics();
    var combs  = this.alphabet.getCombinations();
    var chars  = basics.concat(basics);
    
    this.controls.buildLevels(basics, combs);
    
    this.desk.update(chars.random().random().random())
  }
});