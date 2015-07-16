angular.module('instantrip.services', [])

.factory('Getdata', function ($http) {
  // Your code hereconsole.log('in services links getlink resp:', resp);
      
  var getmap = function(){
    return $http({
      method: 'GET',
      url: "/api/links"// todo
    }).then(function(resp){
      console.log('in services  Getdata getmap resp.data:', resp.data);
      return resp.data;
    })
  }

  var getphoto = function(){
    return $http({
      method: 'GET',
      url: "/api/links"// todo
    }).then(function(resp){
      console.log('in services Getdata getmap resp.data:', resp.data);
      return resp.data;
    })
  }

  // var getphoto = function(url){
  //     console.log('in services addlink location:', url);
  //   return $http({
  //     method: 'POST',
  //     url: "/api/links",//todo
  //     data: url
  //   }).success(function(resp) {
  //   console.log(resp);
  //   console.log("response url: ",resp.url)
  //   console.log("base url: ",resp.base_url);
  // })
  // .catch(function(err) {
  //   console.log(err);
  // })
  // }
  return { 
            getmap: getmap,
            getphot: getphot
         };
})