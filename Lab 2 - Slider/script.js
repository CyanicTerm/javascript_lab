// the image array
const images = [
  "./images/image1.jpg",
  "./images/image2.jpg",
  "./images/image3.jpg",
  "./images/image1.jpg",
];
const forwardButton = document.querySelector("#forwardBtn");
const backwardButton = document.querySelector("#backwardBtn");
let slider = document.querySelector(".imageContainer");
let moveImg = 0;
let currentImg = 0;
let animation;
let interval;

function addImage()
{
    for (let i = 0; i < images.length; i++) {
        let img = document.createElement("img");
        img.src = images[i];   
        slider.appendChild(img);     
    }
}

function forward()
{
    clearInterval(interval);
    animation.cancel();
    slider.style.transform = `translateX(${moveImg - 1920}px)`;
    moveImg-=1920
    if(moveImg <= -5760)
        {            
            moveImg = 0;
        }
        
    console.log(moveImg)
    animateSlides();
}

function backward()
{
    clearInterval(interval);
    animation.cancel();
    slider.style.transform = `translateX(${moveImg + 1920}px)`;
    moveImg+=1920
    if(moveImg >= 0)
        {            
            moveImg = -5760;
        }

    console.log(moveImg)
    animateSlides();
}
backwardButton.addEventListener("click", backward)
forwardButton.addEventListener("click", forward)

function animateSlides()
{
    interval = setInterval(() => {
        animation = slider.animate([
            {transform: `translateX(${moveImg}px`},
            {transform: `translateX(${moveImg-1920}px`}
        ], {
            duration: 2000,
            easing: "ease-in-out",
            fill: "forwards"
        });
        animation.commitStyles();
        moveImg -= 1920; 
        if(moveImg <= -5760)
        {            
            moveImg = 0;
        }
    }, 2000)
}

addImage();
animateSlides();
//Zrobić przyciski i zwiększanie zdjęcia po najechaniu