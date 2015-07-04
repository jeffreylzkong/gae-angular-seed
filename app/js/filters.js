angular.module('myApp.filters', [])

.filter('translate', function(){
  // translation table - Make Sure key is all in LOWER CASE
  var translation = {
    home: {
      zhs: '首页',
      zht: '首頁'
    },
    contact: {
      zhs: '联系我们',
      zht: '聯繫我們'
    },
    'contact us': {
      zhs: '联系我们',
      zht: '聯繫我們'
    },
  };
	return function(input, scope) {

		return input[scope.language] ||
            typeof(input) === 'string' &&
            translation[input.toLowerCase()] && 
            translation[input.toLowerCase()][scope.language] ||
            input.en ||
            input;
	};
});
