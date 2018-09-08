function route(handle, pathname, response){
  if(typeof handle[pathname] === 'function'){
    handle[pathname](response);
  }else{
    console.log("no request", pathname)
    return "404 Not Found"
  }
}

exports.route = route;