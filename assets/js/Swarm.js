Swarm = function (params) {
  this.id = params.id;
  this.size = params.size;
  this.limits = {
    x : { min : 0, max : this.size},
    y : { min : 0, max : this.size},
  };
  this.flies = [];
  for (var i = 0; i < params.nbFlies; i++) {
    this.flies.push(new Fly({id : this.id + "-fly-" + i, limits : this.limits }));
  }
  //Display swarm
  this.view = new SwarmView({ id : this.id, size : params.size });
};

Swarm.prototype.start = function () {
  //On initialise la vue...
  this.view.init.call(this.view, this.flies);
  for (var i = 0; i < this.flies.length; i++) {
    var fly = this.flies[i];
    fly.start.call(fly);
  }
};
