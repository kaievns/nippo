/**
 * Generic alphabet unit
 *
 * @copyright 2009 Nikolay V. Nemshilov aka St.
 */
Nippo.Alphabet = new Class(Observer, {
  extend: {
    EVENTS: $w('choose'),
    
    /**
     * This is the hiragana default alphabet
     *
     * to convert it to katakana we use the utf-8 trick
     *   utf-8 + x60
     *
     *  ('3042'.toInt(16) + 96).toString(16) -> '30A2'
     *
     * And we don't keep the leading '30' numbers case
     * they are all the same for all the symbols
     */
    BASIC: [
      ' a: 42    i: 44    u: 46   e: 48   o: 4A',
      'ka: 4B   ki: 4D   ku: 4F  ke: 51  ko: 53',
      'ga: 4C   gi: 4E   gu: 50  ge: 52  go: 54',
      'sa: 55  shi: 57   su: 59  se: 5B  so: 5D',
      'za: 56   ji: 58   zu: 5A  ze: 5C  zo: 5E',
      'ta: 5F  chi: 61  tsu: 64  te: 66  to: 68',
      'da: 60   di: 62   du: 65  de: 67  do: 69',
      'na: 6A   ni: 6B   nu: 6C  ne: 6D  no: 6E',
      'ha: 6F   hi: 72   fu: 75  he: 78  ho: 7B',
      'ba: 70   bi: 73   bu: 76  be: 79  bo: 7C',
      'pa: 71   pi: 74   pu: 77  pe: 7A  po: 7D',
      'ma: 7E   mi: 7F   mu: 80  me: 81  mo: 82',
      'ya: 84            yu: 86          yo: 88',
      'ra: 89   ri: 8A   ru: 8B  re: 8C  ro: 8D',
      'wa: 8F             n: 93          wo: 92'
    ],
    
    COMBINATIONS: [
      'kya: 4D,83    kyu: 4D,85    kyo: 4D,87',
      'gya: 4E,83    gyu: 4E,85    gyo: 4E,87',
      'sha: 57,83    shu: 57,85    sho: 57,87',
      'ja:  58,83    ju:  58,85    jo:  58,87',
      'cha: 61,83    chu: 61,85    cho: 61,87',
      'nya: 6B,83    nyu: 6B,85    nyo: 6B,87',
      'hya: 72,83    hyu: 72,85    hyo: 72,87',
      'bya: 73,83    byu: 73,85    byo: 73,87',
      'pya: 74,83    pyu: 74,85    pyo: 74,87',
      'mya: 7E,83    myu: 7E,85    myo: 7E,87',
      'rya: 8A,83    ryu: 8A,85    ryo: 8A,87'
    ]
  },
  
  initialize: function(options) {
    this.$super(options);
    
    this.element = $E('div', {id: 'nippo-alphabet'});
    
    this.build().showHiragana();
  },
  
  // highlights the level
  setLevel: function(level) {
    var passed = false;
    this.activeLevel = level.split(' ').last();
    this.activeChars = [];
    
    this.cells.each(function(cell) {
      cell[passed ? 'addClass' : 'removeClass']('disabled');
      if (!passed) this.activeChars.push(cell.chars);
      passed = passed | cell.key == this.activeLevel;
    }, this);
  },
  
  // switches the alphabet by a short name
  showChars: function(name) {
    switch(name) {
      case 'ro': return this.showRomaji();
      case 'ka': return this.showKatakana();
      default:   return this.showHiragana();
    }
  },
  
  // switches the view to romaji
  showRomaji: function() {
    this.cells.each('showRomaji');
    this.element.setClass('romaji');
    return this;
  },
  
  // switches the view to hiragana
  showHiragana: function() {
    this.cells.each('showHiragana');
    this.element.setClass('hiragana');
    return this;
  },
  
  // switches the view to katakana
  showKatakana: function() {
    this.cells.each('showKatakana');
    this.element.setClass('katakana');
    return this;
  },
  
  // returns the list of basic chars
  getBasics: function() {
    this.basics = this.basicChars || this.constructor.BASIC.map(this.parseLine);
    return this.basics;
  },
  
  // returns the list of combinations
  getCombinations: function() {
    this.combinations = this.combinations || this.constructor.COMBINATIONS.map(this.parseLine);
    return this.combinations;
  },
  
// protected
  
  parseLine: function(line) {
    return line.trim().split(/\s+(?=[a-z]+:)/).map('split', /:\s*/).map(function(pair) {
      return [
        pair[0],
        pair[1].split(',').map(function(code) { return '&#'+('30'+code).toInt(16) + ';' }).join(''),
        pair[1].split(',').map(function(code) { return '&#'+(('30'+code).toInt(16) + 96) + ';' }).join('')
      ]
    });
  },

  // builds the structure
  build: function() {
    var basics = $E('fieldset', {id: 'nippo-alphabet-basic'}).insertTo(this.element);
    var combs  = $E('fieldset', {id: 'nippo-alphabet-combinations'}).insertTo(this.element);
    
    basics.insert($E('legend', {html: 'Basics'}));
    combs.insert($E('legend', {html: 'Combinations'}));
    
    this.cells = [];
    
    [['getBasics', basics], ['getCombinations', combs]].each(function(pair) {
      this[pair[0]]().each(function(line) {
        var row = $E('div', {'class': 'nippo-alphabet-row'}).insertTo(pair[1]);
        line.each(function(chars, i) {
          var cell = $ext($E('div').insertTo(row), {
            key: chars[0],
            chars: chars,
            showRomaji: function() {
              this.innerHTML = chars[0];
            },
            showHiragana: function() {
              this.innerHTML = chars[1];
            },
            showKatakana: function() {
              this.innerHTML = chars[2];
            }
          });
          cell.onClick(function() {
            if (!cell.hasClass('disabled'))
              this.choose(cell.key, cell)
          }.bind(this));
          this.cells.push(cell);
          
          if (line.length == 3 && (i==0 || i==1)) {
            row.insert($E('div', {'class': 'nippo-alphabet-blank'}));
          }
        }, this);
      }, this);
    }, this);
    
    return this;
  }
});