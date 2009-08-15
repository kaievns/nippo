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
    
    this.controls.onLevelchange(this.setLevel.bind(this)).levelChange();
    this.controls.onDirectionchange(this.setDirection.bind(this)).directionChange();
    
    this.alphabet.onChoose(this.choose.bind(this));
    
    this.showNext();
  },
  
// protected
  
  setLevel: function(level) {
    this.alphabet.setLevel(level);
    
    return this.showNext();
  },
  
  setDirection: function(direction) {
    var pair = direction.split('-');
    this.alphabet.showChars(pair.last());
    this.charSet = pair.first();
    
    return this.showNext();
  },
  
  showNext: function() {
    var chars = this.alphabet.activeChars.random();
    this.desk.update(
      this.charSet == 'ro' ? chars[0] : this.charSet == 'ka' ? chars[2] : chars[1]
    );
    this.currentKey = chars[0];
    
    return this;
  },
  
  choose: function(key) {
    var correct = key == this.currentKey;
    
    this.stats.count(correct);
    
    if (this.stats.levelsUp()) {
      this.controls.levelUp();
    } else if (this.stats.levelsDown()) {
      this.controls.levelDown();
    }
    
    this.desk.block.highlight(correct ? '#AFA':'#FAA');
    this.showNext.bind(this).delay(200);
    
    return this;
  }
});