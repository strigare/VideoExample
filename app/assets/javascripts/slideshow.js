var slidePrefix            = "slide-";
var slideControlPrefix     = "slide-control-";
var slideHighlightClass    = "highlight";
var slidesContainerID      = "slides";
var slidesControlsID       = "slides-controls";
var slideDelay 	       	= 10000;
var slideAnimationInterval = 20;
var slideTransitionSteps   = 10;

window.onload = function setUpSlideShow()
{
        // collect the slides and the controls
        slidesCollection = document.getElementById(slidesContainerID).children;
        slidesControllersCollection = document.getElementById(slidesControlsID).children;
                  
        totalSlides = slidesCollection.length;
                       
        if (totalSlides != 3 ){ 
	     return;
        }
                            
        //go through all slides
        for (var i=0; i < slidesCollection.length; i++)
        {
            //give IDs to slides and controls
            slidesCollection[i].id = slidePrefix+(i+1);
            slidesControllersCollection[i].id = slideControlPrefix+(i+1);
                        
            // attach onclick handlers to controls, highlight the first control
            slidesControllersCollection[i].onclick = function(){clickSlide(this);};
            
            //hide all slides except the first
            if (i > 0){
                slidesCollection[i].style.display = "none";
            }
            else{
                slidesControllersCollection[i].className = slideHighlightClass;
            }
            
            // initialize vars
            slideTransStep= 0;
            transTimeout  = 0;
            crtSlideIndex = 1;
        }
}

function showSlide(slideNo)
{
     // get references to the current slide and to the one to be shown next
     nextSlideIndex = slideNo;
     
     crtSlide = document.getElementById(slidePrefix + crtSlideIndex);
     nextSlide = document.getElementById(slidePrefix + nextSlideIndex);
     slideTransStep = 0;
                  
     transSlide();
}

function clickSlide(control)
{
        showSlide(Number(control.id.substr(control.id.lastIndexOf("-")+1)),true);
}
 
function transSlide()
{
    // make sure the next slide is visible (albit transparent)
    nextSlide.style.display = "block";
 
    // calculate opacity
    var opacity = slideTransStep / slideTransitionSteps;
 
    // fade out the current slide
    crtSlide.style.opacity = "" + (1 - opacity);
    crtSlide.style.filter = "alpha(opacity=" + (100 - opacity*100) + ")";
 
    // fade in the next slide
    nextSlide.style.opacity = "" + opacity;
    nextSlide.style.filter = "alpha(opacity=" + (opacity*100) + ")";
 
    // if not completed, do this step again after a short delay
    if (++slideTransStep <= slideTransitionSteps)
        transTimeout = setTimeout("transSlide()", slideAnimationInterval);
    else
    {
        // complete
        crtSlide.style.display = "none";
        transComplete();
    }
}

function transComplete()
{
    slideTransStep = 0;
    crtSlideIndex = nextSlideIndex;
 
    //unhighlight all controls
    for (var i=0; i < slidesControllersCollection.length; i++)
        slidesControllersCollection[i].className = "";
 
    // highlight the control for the next slide
    document.getElementById("slide-control-" + crtSlideIndex).className = slideHighlightClass;
}
