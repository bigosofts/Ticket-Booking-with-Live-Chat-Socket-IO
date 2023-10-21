    
let thumbnails = document.getElementsByClassName('Slider-thumbnail');
let activeImages = document.getElementsByClassName('active');

/* iterate through each thumbnail */
for (var i=0; i < thumbnails.length; i++){
  
  /* listen for click events on each thumbnail */
  thumbnails[i].addEventListener('click', function(e){
    /* prevent default action on a tag */   
    e.preventDefault()
    /* if more than one image has .active then remove class */
    if (activeImages.length > 0){
      activeImages[0].classList.remove('active')
    }
    /* add .active class on click */
    this.classList.add('active')
    /* replace src url in #featuredImage with clicked thumbnail src url */
    document.getElementById('featuredImage').src = this.href
  })
}
    