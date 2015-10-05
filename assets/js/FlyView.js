FlyView = function (id) {
  this.id = id;
  this.container = null;
  this.isInit = false;
};

FlyView.prototype.init = function () {
  if (!this.isInit) {
    this.container = $("#" + this.id);
    if (!$(this.container).length) {
      console.log("FlyView : container not found");
    }
    this.isInit = true;
  }
};

FlyView.prototype.move = function (position) {
  $(this.container).css({ left : position.x + "px", top : position.y + "px"});
};

FlyView.prototype.getHtml = function () {
  return '<div id="' + this.id + '" class="fly"></div>';
};
