/**
 * Rrepresents the control elements block
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
Nippo.Controls = new Class(Observer, {
  EVENTS: $w('levelchange directionchange'),
  
  initialize: function() {
    this.$super();
    this.element = $E('div', {id: 'nippo-controls'});
    
    this.levelSelect     = $E('select');
    this.directionSelect = $E('select').insert([
      $E('option', {value: 'ro-hi', html: 'Romaji &rarr; Hiragana'}),
      $E('option', {value: 'hi-ro', html: 'Hiragana &rarr; Romaji'}),
      $E('option', {value: 'ro-ka', html: 'Romaji &rarr; Katakana'}),
      $E('option', {value: 'ka-ro', html: 'Katakana &rarr; Romaji'}),
      $E('option', {value: 'hi-ka', html: 'Hiragana &rarr; Katakana'}),
      $E('option', {value: 'ka-hi', html: 'Katakana &rarr; Hiragana'})
    ]).setValue(Cookie.get('nippo-direction'));
    
    this.element.insert($E('fieldset').insert([
      $E('legend', {html: 'Controls'}),
      
      $E('div', {id: 'nippo-controls-level'}).insert([$E('label', {html: 'Level:'}), this.levelSelect]),
      $E('div', {id: 'nippo-controls-direction'}).insert([$E('label', {html: 'Direction:'}), this.directionSelect])
    ]));
    
    this.levelSelect.on('change', this.levelChange.bind(this));
    this.directionSelect.on('change', this.directionChange.bind(this));
  },
  
  levelChange: function() {
    Cookie.set('nippo-level', this.levelSelect.value, {duration: 888});
    return this.fire('levelchange', this.levelSelect.value);
  },
  
  directionChange: function() {
    Cookie.set('nippo-direction', this.directionSelect.value, {duration: 888});
    return this.fire('directionchange', this.directionSelect.value);
  },
  
  // levels up
  levelUp: function() {
    var options = $A(this.levelSelect.getElementsByTagName('option'));
    var current = options.first(function(i) { return i.selected });
    
    if (current && current != options.last()) {
      this.levelSelect.value = options[options.indexOf(current)+1].value;
      this.levelChange();
    }
  },
  
  // levels down
  levelDown: function() {
    var options = $A(this.levelSelect.getElementsByTagName('option'));
    var current = options.first(function(i) { return i.selected });
    
    if (current && current != options.first()) {
      this.levelSelect.value = options[options.indexOf(current)-1].value;
      this.levelChange();
    }
  },
  
// private
  
  // builds the level-select options
  buildLevels: function(basics, combs) {
    [
      ["Basics", basics], ["Combinations", combs]
    ].each(function(pair) {
      this.levelSelect.insert(
        $E('optgroup', {label: pair[0]}).insert(
          pair[1].map(function(row) {
            var ro = row.map('first').join(' ');
            var hi = row.map('first', 'match', /[^a-z]+/).join(' ');
            var ka = row.map('last').join(' ');
            
            if (pair[1] == basics && row.length == 3) {
              ro = ro.split(' ').join(' &nbsp;&nbsp;&nbsp; ');
              hi = hi.split(' ').join(' &nbsp;&nbsp;&nbsp; ');
              ka = ka.split(' ').join(' &nbsp;&nbsp;&nbsp; ');
            }
            
            return $ext($E('option', {value: ro, html: hi}), {
              showRomaji:   function() {this.innerHTML = ro;},
              showHiragana: function() {this.innerHTML = hi;},
              showKatakana: function() {this.innerHTML = ka;}
            });
          })
        )
      );
    }, this);
    
    this.levelSelect.value = Cookie.get('nippo-level');
    
    return this;
  }
});