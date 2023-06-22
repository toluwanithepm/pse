function updateParallax() {
  var scrollTop = window.scrollY || window.pageYOffset;
  var layers = document.getElementsByClassName('parallax-layer');
  
  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    var speed = parseFloat(layer.getAttribute('data-speed'));
    var yPos = -(scrollTop * speed);
    
    layer.style.transform = 'translate3d(0px, ' + yPos + 'px, 0px)';
  }
}

window.addEventListener('scroll', function() {
  window.requestAnimationFrame(updateParallax);
});
