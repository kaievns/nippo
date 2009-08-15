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
    
    // initializing the controls
    this.controls.buildLevels(
      this.alphabet.getBasics(),
      this.alphabet.getCombinations()
    );
    
    this.controls.setLevel(Cookie.get('nippo-level'));
    this.controls.setDirection(Cookie.get('nippo-direction'));
    this.controls.onLevelchange(this.setLevel.bind(this)).levelChange();
    this.controls.onDirectionchange(this.setDirection.bind(this)).directionChange();
    
    this.showNext();
  },
  
// protected
  
  setLevel: function(level) {
    this.alphabet.setLevel(level);
    Cookie.set('nippo-level', level, {duration: 888});
    
    return this.showNext();
  },
  
  setDirection: function(direction) {
    var pair = direction.split('-');
    this.alphabet.showChars(pair.last());
    this.charSet = pair.first();
    Cookie.set('nippo-direction', direction, {duration: 888});
    
    return this.showNext();
  },
  
  showNext: function() {
    var chars = this.alphabet.activeChars.random();
    this.desk.update(
      this.charSet == 'ro' ? chars[0] : this.charSet == 'ka' ? chars[2] : chars[1]
    );
    
    return this;
  }
});