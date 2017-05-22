
(function(){
 
var nav = document.getElementById('global_nav');
var navCheckbox = document.getElementById('global_nav_checkbox');

navCheckbox.addEventListener('blur', function(e){
  if (!nav.contains(e.relatedTarget)) this.checked = false;
})

document.addEventListener('click', function(e){
  if (e.target.host == location.host) {
    e.preventDefault();
    navCheckbox.checked = false;
    if (e.target.href != location.href) {
      routeUpdate(e.target.href);
    }
  }
}, true);

document.getElementById('inquiry_form').addEventListener('submit', function(e){
  try {
    e.preventDefault();
    var request = new XMLHttpRequest();
    request.open('POST', 'https://docs.google.com/forms/d/e/1FAIpQLSe0ZVMdZGGpuSjf7chsXEnh9nISy7eTFDYwEJ41sT4R2KN15Q/formResponse');
    request.send(new FormData(this));
    this.innerHTML = '<div class="inquiry-submitted">Thank you for your interest!<div>';
  }
  catch (e){
    console.log(e);
  }
});

})();