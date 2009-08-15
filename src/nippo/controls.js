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
    this.directionSelect = $E('select', {html:
      '<option value="ro-hi">Romaji &rarr; Hiragana</option>'+
      '<option value="hi-ro">Hiragana &rarr; Romaji</option>'+
      '<option value="ro-ka">Romaji &rarr; Katakana</option>'+
      '<option value="ka-ro">Katakana &rarr; Romaji</option>'+
      '<option value="hi-ka">Hiragana &rarr; Katakana</option>'+
      '<option value="ka-hi">Katakana &rarr; Hiragana</option>'
    });
    
    this.element.insert($E('fieldset').insert([
      $E('legend', {html: 'Controls'}),
      
      $E('div', {id: 'nippo-controls-level'}).insert([$E('label', {html: 'Level:'}), this.levelSelect]),
      $E('div', {id: 'nippo-controls-direction'}).insert([$E('label', {html: 'Direction:'}), this.directionSelect])
    ]));
    
    this.levelSelect.on('change', this.levelChange.bind(this));
    this.directionSelect.on('change', this.directionChange.bind(this));
  },
  
  setLevel: function(level) {
    this.levelSelect.value = level;
    return this;
  },
  
  setDirection: function(direction) {
    this.directionSelect.value = direction;
    return this;
  },
  
  levelChange: function() {
    return this.fire('levelchange', this.levelSelect.value);
  },
  
  directionChange: function() {
    return this.fire('directionchange', this.directionSelect.value);
  },
  
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
    
    return this;
  }
});