

(function(){

  sheet = document.head.appendChild(document.createElement('style')).sheet;

  function deleteRule(){
    if (sheet.cssRules.length) sheet.deleteRule(0);
  }

  function updateRule(text){
    deleteRule();
    sheet.insertRule('#schemas .block-link:not([data-description*="' + text + '"]) { display: none; }', 0);
  }

  function inputChange(e){
    if (search.value) {
      document.body.setAttribute('searching', '');
      updateRule(search.value.toLowerCase());
    }
    else {
      document.body.removeAttribute('searching');
      deleteRule();
    }
  }

  var search = document.getElementById('filter_search_input');

  search.addEventListener('input', inputChange);

  document.getElementById('filter_clear').addEventListener('click', function(){
    search.value = '';
    inputChange();
  })

})()