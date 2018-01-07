var game;

(function() {

var s, self;

game = {

  settings: {
    ran:0,
    lvlSelect:0,
    nbCoup:0,
    status:'',

    level:['Easy','Normal','Hard'],
    minimum:[1,1,1],
    maximum:[100,10000,1000000],
    time:[3,2,1], // temps en minutes
    coups:[10,7,5],


    btnEasy:document.getElementById('btn-easy'),
    btnNormal:document.getElementById('btn-normal'),
    btnHard:document.getElementById('btn-hard'),

    affMin:document.getElementById('minimum'),
    affMax:document.getElementById('maximum'),
    affTime:document.getElementById('time'),
    affCoups:document.getElementById('coups'),
    affHint:document.getElementById('hint'),
    
    inValue:document.getElementById('input-value'),
    btnTry:document.getElementById('btn-validate'),
  },

  init: function() {
    s = this.settings;
    self = this;

    s.btnEasy.addEventListener('click', function(){
        s.lvlSelect = 0;
        self.SetValue();
    });
    s.btnNormal.addEventListener('click', function(){
        s.lvlSelect = 1;
        self.SetValue();
    });
    s.btnHard.addEventListener('click', function(){
        s.lvlSelect = 2;
        self.SetValue();
    });

    s.btnTry.addEventListener('click', function(){
      valueInput = s.inValue.value;
      if (s.nbCoup >= s.coups[s.lvlSelect] - 1) {
            s.status = "c'est perdu";
            s.affHint.className = "bg-danger";             
            self.DisableAff();
        } else if (valueInput != s.ran) {
            s.nbCoup++;
            if (valueInput < s.ran) {
                s.status = "c'est plus"
            } else {
                s.status = "c'est moins";
            }
        } else {
            s.status = "c'est Gagnger";
            s.affHint.className = "bg-success";
            self.DisableAff();
        }
        self.AffValue();
    });
  },

  SetValue: function() {
    s.nbCoup = 0;
    s.status = '';
    s.affMin.innerText = s.minimum[s.lvlSelect];
    s.affMax.innerText = s.maximum[s.lvlSelect];
    s.affCoups.innerText = s.coups[s.lvlSelect] - s.nbCoup;
    s.ran = self.GenerRan(s.minimum[s.lvlSelect], s.maximum[s.lvlSelect]);
    console.log("Solution : " + s.ran);
    s.affHint.innerText = s.status;
    self.EnableAff();
  },

  AffValue: function() {
    s.affMin.innerText = s.minimum[s.lvlSelect];
    s.affMax.innerText = s.maximum[s.lvlSelect];
    s.affCoups.innerText = s.coups[s.lvlSelect] - s.nbCoup;    
    s.affHint.innerText = s.status;
    console.log("Solution : " + s.ran);
},
  DisableAff: function () {
    s.btnTry.disabled = true;
    s.btnTry.hidden = true;
    s.inValue.disabled = true;
    s.inValue.hidden = true;
  },

  EnableAff: function () {
        s.btnTry.disabled = false;
        s.btnTry.hidden = false;
        s.inValue.disabled = false;
        s.inValue.hidden = false;
      },

  GenerRan: function(min, max) {
    return Math.floor((Math.random() * max) + min);
  }

};

})();

game.init();
