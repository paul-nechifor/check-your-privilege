var simpleOptions = {
  start: {
    color: 0
  },
  race: {
    color: 1,
    horizontalTiles: 3,
    options: [
      {name: 'Asian', score: 5, icon: 'icon-wink'},
      {name: 'White', score: 35, icon: 'icon-happy'},
      {name: 'Black', score: -65, icon: 'icon-cool'},
      {name: 'Middle Eastern', score: 70, icon: 'icon-smiley'},
      {name: 'Native American', score: -40, icon: 'icon-tongue'},
      {name: 'Other', score: -80, icon: 'icon-alienware'},
    ]
  },
  sex: {
    color: 2,
    options: [
      {name: 'Male', score: 45, icon: 'icon-male'},
      {name: 'Female', score: -50, icon: 'icon-female'},
      {name: 'Intersex', score: -75, icon: 'icon-mahara'}
    ]
  },
  orientation: {
    color: 3,
    options: [
      {name: 'Straight', score: 20, icon: 'icon-long-arrow-right'},
      {name: 'Gay', score: -30, icon: 'icon-undo'},
      {name: 'Asexual', score: -10, icon: 'icon-cancel'},
      {name: 'Bisexual', score: -15, icon: 'icon-exchange'},
      {name: 'Other', score: -50, icon: 'icon-tree'}
    ]
  },
  gender: {
    color: 7,
    options: [
      {name: 'Cis', score: 20, icon: 'icon-flow-parallel'},
      {name: 'Trans', score: -75, icon: 'icon-flow-switch'},
      {name: 'Genderfluid', score: -65, icon: 'icon-flow-merge'},
      {name: 'Gendersolid', score: -45, icon: 'icon-question-mark'}
    ]
  },
  religion: {
    horizontalTiles: 4,
    color: 6,
    options: [
      {name: 'Jew', score: -10, icon: 'icon-david-star'},
      {name: 'Christian', score: 15, icon: 'icon-cross'},
      {name: 'Muslim', score: -20, icon: 'icon-moon-andstar'},
      {name: 'Sikh', score: -15, icon: 'icon-knife'},
      {name: 'Hindu', score: -20, icon: 'icon-handdrag'},
      {name: 'Other', score: -30, icon: 'icon-circle'},
      {name: 'None', score: 5, icon: 'icon-atom'}
    ]
  },
  profession: {
    horizontalTiles: 4,
    color: 5,
    options: [
      {name: 'Banker', score: 95, icon: 'icon-dollar'},
      {name: 'Engineer', score: 45, icon: 'icon-rocket'},
      {name: 'Policeman/ Fireman', score: 20, icon: 'icon-police'},
      {name: 'Scientist', score: 30, icon: 'icon-beaker'},
      {name: 'Doctor', score: 55, icon: 'icon-user-md'},
      {name: 'Teacher', score: -5, icon: 'icon-book'},
      {name: 'Other', score: -20, icon: 'icon-circle'}
    ]
  },
  status: {
    color: 0,
    options: [
      {name: 'Rich', score: 99, icon: 'icon-safe'},
      {name: 'Affluent', score: 65, icon: 'icon-money-bag'},
      {name: 'Middle', score: 5, icon: 'icon-wallet'},
      {name: 'Poor', score: -20, icon: 'icon-dollar2'},
      {name: 'Homeless', score: -40, icon: 'icon-cart'},
    ]
  },
  disability: {
    horizontalTiles: 4,
    color: 1,
    options: [
      {name: 'Able-bodied', score: 10, icon: 'icon-accessibility'},
      {name: 'Blind', score: -20, icon: 'icon-eye-blocked'},
      {name: 'Mute', score: -5, icon: 'icon-mute'},
      {name: 'Deaf', score: -10, icon: 'icon-mute2'},
      {name: 'Paralyzed', score: -40, icon: 'icon-pause'},
      {name: 'Retarded', score: -50, icon: 'icon-point-of-interest'},
      {name: 'Diseased', score: -15, icon: 'icon-mine'}
    ]
  },
  height: {
    color: 2,
    options: [
      {name: 'Short', score: -5, icon: 'icon-zoom-in'},
      {name: 'Normal', score: 5, icon: 'icon-user'},
      {name: 'Tall', score: 10, icon: 'icon-zoom-out'},
    ]
  },
  attractiveness: {
    color: 3,
    options: [
      {name: '“Curvy”', score: -55, icon: 'icon-plus'},
      {name: 'Butterface', score: 5, icon: 'icon-sad'},
      {name: 'Average', score: 20, icon: 'icon-user'},
      {name: 'Skinny', score: 35, icon: 'icon-skull'},
      {name: '9+', score: 45, icon: 'icon-number'}
    ]
  },
  results: {
    color: 4
  }
};

var backgrounds = ('27ae61 16a086 3598db 8f44ad 2d3e50 f39c11 d55401 c1392b ' +
    '7e8c8d').split(' ');

var tileSlides = {};

var privilege = 0;
var $privilege = $('.privilege');

function TileSlide(key, opts) {
  this.key = key;
  this.opts = opts;
  this.activeTile = -1;
  this.$slide = null;
  this.$tiles = [];
}

TileSlide.prototype.onTileClick = function (index) {
  var score = 0;

  if (this.activeTile !== -1) {
    this.$tiles[this.activeTile].removeClass('selected');
    score -= this.opts[this.activeTile].score;
  }
  this.activeTile = index;

  var $item = this.$tiles[index];
  $item.addClass('selected');

  score += this.opts[index].score;

  changeScore(score);

  setTimeout(function () {Reveal.next();}, 350);
};

function main() {
  augmentSlides();
  initReveal();
}

function augmentSlides() {
  for (var key in simpleOptions) {
    augmentSlide(key, simpleOptions[key]);
  }
}

function augmentSlide(key, vals) {
  var tileSlide = new TileSlide(key, vals.options);
  tileSlides[key] = tileSlide;

  tileSlide.$slide = $('section#' + key);
  tileSlide.$slide.addClass('color-' + vals.color);
  tileSlide.$slide.attr('data-background', '#' + backgrounds[vals.color]);

  if (vals.options) {
    addOptions(tileSlide, vals);
  }
}

function addOptions(tileSlide, vals) {
  var $tiles = $('<div class="tiles"/>').appendTo(tileSlide.$slide);

  if (vals.horizontalTiles) {
    $tiles.addClass('max-fit-' + vals.horizontalTiles);
  }

  var onTileClick = function (index) {
    return function () {
      tileSlide.onTileClick(index);
    };
  };

  for (var i = 0, len = vals.options.length; i < len; i++) {
    var opt = vals.options[i];

    var $tile = $('<div class="tile"/>').appendTo($tiles);
    tileSlide.$tiles.push($tile);

    var $tileInner = $('<div class="tile-inner"/>').appendTo($tile);
    var $icon = $('<div class="icon"/>').appendTo($tileInner);
    $('<span/>').addClass(opt.icon).appendTo($icon);
    $('<div class="label"/>').text(opt.name).appendTo($tileInner);
    $tile.click(onTileClick(i));
  }
}

function initReveal() {
  Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,
    hideAddressBar: true,

    transition: 'linear',
    transitionSpeed: 'default',
    backgroundTransition: 'slide',

    width: 1024,
    height: 768,
    margin: 0.0,
    minScale: 0.2,
    maxScale: 4.0
  });
}

function changeScore(add) {
  var positive = privilege >= 0;

  privilege += add;
  $privilege.text(privilege);

  if (positive === (privilege >= 0)) {
    return;
  }

  if (privilege >= 0) {
    $('.positive-result').show();
    $('.negative-result').hide();
  } else {
    $('.positive-result').hide();
    $('.negative-result').show();
  }
}

main();
