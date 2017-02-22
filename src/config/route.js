var HtmlWebpackPlugin = require('html-webpack-plugin');

function route(){
  debugger;
  this.htmlPlugin = [];
  this.jsPlugin = {
    home: './src/views/home/home.js',
    about: './src/views/about/about.js',
    lei:"./src/views/ding/ding.js"
  }
}


route.prototype.addJs = function(name){
  this.jsPlugin[name] = "./src/views/"+name+"/view.js";
}

route.prototype.addArrayToRoute = function(arr){
  var that = this;
  arr.forEach(function(value,index){
    that.addRoute(value.title,value.filename,value.template,value.chunks)
  })
}

route.prototype.addRoute = function(title,filename,template,chunks){
  var obj = {
    title:title||"none",
    filename:filename||"index.html",
    template:template,
    chunks:chunks||['home']
  }
  this.htmlPlugin.push(new HtmlWebpackPlugin(obj));
}

module.exports = route;