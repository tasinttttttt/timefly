SwarmView = function (params) {
  this.id = params.id;
  this.size = params.size;
  this.container = null;
  this.isInit = false;
};

SwarmView.prototype.init = function (flies) {
  if (!this.isInit) {
    this.container = $("#" + this.id);
    if (!$(this.container).length) {
      console.log("SwarmView : container not found");
      return;
    }
    var fliesHtml = "";
    for (var i = 0; i < flies.length; i++) {
      var fly = flies[i];
      fliesHtml += fly.view.getHtml.call(fly.view);
    }
    $(this.container).css({ width : this.size + "px", height : this.size + "px" }).html(fliesHtml);
    this.isInit = true;
  }
};