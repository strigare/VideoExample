keys = {slidePrefix:        'slide-', 
        slideControlPrefix: 'slide-control-',
        slideHighlightClass:'highlight',
        slidesContainerID:  'slides',
        slidesControlsID:   'slides-controls'
};

window.onload = function setUpSlideShow()
{
        // collect the slides and the controls
        slidesCollection = document.getElementById(keys.slidesContainerID).children;
        slidesControllersCollection = document.getElementById(keys.slidesControlsID).children;
                  
        totalSlides = slidesCollection.length;
                       
        if (totalSlides != 3 ){ 
	     return;
        }
                            
        //go through all slides
        for (var i=0; i < slidesCollection.length; i++)
        {
            //give IDs to slides and controls
            slidesCollection[i].id = keys.slidePrefix+(i+1);
            slidesControllersCollection[i].id = keys.slideControlPrefix+(i+1);
                        
            // attach onclick handlers to controls, highlight the first control
            slidesControllersCollection[i].onclick = function(){clickSlide(this);};
            
            //hide all slides except the first
            if (i > 0){
                slidesCollection[i].style.display = "none";
            }
            else{
                slidesControllersCollection[i].className = keys.slideHighlightClass;
            }
            
            // initialize vars
            crtSlideIndex = 1;
        }
}

function showSlide(slideNo)
{
     // get references to the current slide and to the one to be shown next
     nextSlideIndex = slideNo;
     
     crtSlide = document.getElementById(keys.slidePrefix + crtSlideIndex);
     nextSlide = document.getElementById(keys.slidePrefix + nextSlideIndex);
                  
     transSlide();
}

function clickSlide(control)
{
     showSlide(Number(control.id.substr(control.id.lastIndexOf("-")+1)));
}
 
function transSlide()
{
    // make sure the next slide is visible (albit transparent)
    nextSlide.style.display = "block";

        // complete
    crtSlide.style.display = "none";
    crtSlideIndex = nextSlideIndex;
 
    //unhighlight all controls
    for (var i=0; i < slidesControllersCollection.length; i++){
        slidesControllersCollection[i].className = "";
    }

    // highlight the control for the next slide
    document.getElementById("slide-control-" + crtSlideIndex).className = keys.slideHighlightClass;
}
