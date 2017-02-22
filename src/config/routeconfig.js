var route = require("./route");
var config = require("./config");
var rg = new route();
var obj = [
  {
    title: 'lei',
    filename: 'lei/index.html',
    template: './src/views/ding/ding.handlebars',
    chunks: ['lei']
  }
]

config.server.forEach(function(o,index,arr){
  var temp = {
    title:o.title,
    filename:o.path+"/index.html",
    template:"./src/views/"+o.template+"/view.handlebars",
    chunks:[]
  }
  !config.jsFormat&&temp.chunks.push(o.jsName)
  obj.push(temp);
  rg.addJs(o.jsName);
});



rg.addArrayToRoute(obj);

module.exports = rg;