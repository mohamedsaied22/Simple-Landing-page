//check for main color 
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null){
    // console.log (`local storage is empty now`)
    // console.log (localStorage.getItem("color-option"))
    document.documentElement.style.setProperty('--main-color', mainColors)
       //remove active class from all elements
        document.querySelectorAll(".colors-list li").forEach(element=>{
        element.classList.remove("active");
        //add avtive class for element with data-color --- local storage element
        if (element.dataset.color === mainColors ){
            element.classList.add ("active")
        }
    })
}
//random background option
let backroundOption = true;
//variable to control the setinterval
let backgroundInterval;
// Toggle Spin Class On Icon

//check for background on local storage 
let backgroundLocally = localStorage.getItem ("background-option");

if (backgroundLocally !== null) {
    // console.loog (backgroundLocally)
    // console.lg (typeof backgroundLocally)
    if(backgroundLocally === 'true'){
        backroundOption = true;    
    } else {
        backroundOption = false;   
    }
        // console.log (backgroundLocally)
    //remove class active from background options
    document.querySelectorAll(".rondom-background span").forEach(element =>{
    element.classList.remove("active")
    //add class active 
    })        
    if (backgroundLocally ==='true'){
        document.querySelector(".rondom-background .yes").classList.add ("active")
    }else {
        document.querySelector(".rondom-background .no").classList.add ("active")

    }
    }


document.querySelector(".toggle-settings").onclick = function () {
    // Toggle Class Fa-spin For Rotation On Self
    document.querySelector(".fa-gear").classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
let colorList = document.querySelectorAll (".colors-list li")
//loop for all list itmes
colorList.forEach (li => {
    //click on every list items
    li.addEventListener ("click",(e)=> {
        //set color to root
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color)
        //set main colkor to local storage
        localStorage.setItem("color-option", e.target.dataset.color)

        handleActive(e);
    })
    })
// switch rondom background 
let rondomBackGround = document.querySelectorAll (".rondom-background span")

//loop for all list itmes
rondomBackGround.forEach (span => {
    //click on every list items
    span.addEventListener ("click",(e)=> {
        
        handleActive(e)

    if (e.target.dataset.background === 'yes'){
        backroundOption =true;
        randomaizImages ()
        localStorage.setItem("background-option", true);
    }else {
        clearInterval(backgroundInterval);
        backroundOption =false;
        localStorage.setItem("background-option", false);
        // document.querySelector(".landing-page").style.backgroundImage = 'url("imgs/1.png")'
    }
    })
    })

//change bavkground images rondom
let imagsArray = ["1.png","2.png","3.png","4.png"]


//function to randomaized images 
function randomaizImages (){
    if (backroundOption === true){
        backgroundInterval = setInterval(() => {
            let rondomNumbers = Math.floor(Math.random () * imagsArray.length)
            document.querySelector(".landing-page").style.backgroundImage = 'url("imgs/'+ imagsArray[rondomNumbers]+'")'
        }, 5000);
    }
}
randomaizImages ()

//select our skills
let ourSkills = document.querySelector(".skills")

window.onscroll = function (){
    //skills OffSet Top
    let skillsOffSetTop = ourSkills.offsetTop;
    //skills outer height
    let skiilsOuterHeight = ourSkills.offsetHeight;
    //window height
    let windowHeight = this.innerHeight;
    //window scrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffSetTop + skiilsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll (".skills-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    } 
}

// Create Popup with the image
let galleryImg = document.querySelectorAll(".gallery img");
galleryImg.forEach(img => {
    img.addEventListener('click', e => {
        //create ovelay element
        let overlay = document.createElement("div")
        //add class to the div
        overlay.className = 'overlay-popup'
        // add div to the body
        document.body.appendChild (overlay);

         //create popub-box element
        let popubBox = document.createElement("div")
         //add class to the div
        popubBox.className = 'popub-box'

        if (img.alt !== null) {
            // create img heading
            let imgHeading = document.createElement ("h3");
            // create heading text
            let headingText = document.createTextNode (img.alt);
            //add headingText to imgHeading
            imgHeading.appendChild (headingText);
            
            //apend imgHeading to popubBox
            popubBox.appendChild (imgHeading);
        }

        //create image popup
        let imagePopup = document.createElement("img");
        
        // set image source
        imagePopup.src = img.src

        // add image to popb-box
        popubBox.appendChild(imagePopup);

        // append popubBox to body 
        document.body.appendChild(popubBox);

        //create span close
        let closeButtom = document.createElement("span");

        //create span closetext
        let closeButtomText = document.createTextNode("X");

        //append closeButtomText to closeButtom
        closeButtom.appendChild(closeButtomText);

        //add class to closeButtom
        closeButtom.className = 'close-buttom'
        
        //append closeButtom to popubBox
        popubBox.appendChild(closeButtom);
    })
})


//close popub
document.addEventListener ('click', function(e){
    if(e.target.className == 'close-buttom'){
    //remove popup
    e.target.parentElement.remove()
    //another way to remove
    document.querySelector('.overlay-popup').remove();   
    }
})

//select all bullets
let allBullets = document.querySelectorAll (".nav-bullets .bullet");

//select all all links
let allLinks = document.querySelectorAll (".links a");

//function to scrolling
function scrollingSections (elements){
    elements.forEach(ele => {
        ele.addEventListener("click", e=> {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
    scrollingSections (allBullets);
    scrollingSections(allLinks);   
//testimonials
let slides = document.querySelectorAll (".slide-container")
let index = 0 ;

function next() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}

function prev() {
    slides[index].classList.remove("active");
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add("active");
}
// next fuction calling
let nextAction = document.querySelector("#next");
nextAction.addEventListener('click', next);

// next fuction calling
let prevAction = document.querySelector("#prev");
prevAction.addEventListener('click', prev);


//handle function state 
function handleActive (ev){

//remove active class from all elements
ev.target.parentElement.querySelectorAll(".active").forEach(element=>{
element.classList.remove("active");
})

//set active class for target element
ev.target.classList.add("active")
}


//bullets options
let bulletsSpan = document.querySelectorAll(".bullets-options span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletsLocalItem = localStorage.getItem ("bullets-option")

if (bulletsLocalItem !== null) {

    bulletsSpan.forEach(span =>{
        span.classList.remove("active")
    })

    if (bulletsLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-options .yes").classList.add("active")
    }else{
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-options .no").classList.add("active")


    }
}

bulletsSpan.forEach(span =>{
    span.addEventListener('click', (e)=>{

        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets-option", 'block')
        }else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets-option", 'none')

        }
        handleActive (e)
    })
})

//reset options 
document.querySelector(".reset-options").onclick = function(){
    localStorage.removeItem("color-option")
    localStorage.removeItem("background-option")
    localStorage.removeItem("bullets-options")

    window.location.reload()
}

//toggle menu 
let toglleBtn = document.querySelector(".header-area .toggle")
let theLinks = document.querySelector(".links")

toglleBtn.onclick = function (e){
    //stop propagation
    e.stopPropagation()

    //toggle class menu-active on button
    this.classList.toggle("menu-active")

    //toggle clas opne on linkes
    theLinks.classList.toggle("open")
}

//click anywhere outside the menu to close menu
document.addEventListener ('click', (e)=> {

    if (e.target !== toglleBtn && e.target !== theLinks){
        // check the menu is open 
        if (theLinks.classList.contains("open")){
        //toggle class menu-active on button
        toglleBtn.classList.toggle("menu-active")

        //toggle clas opne on linkes
        theLinks.classList.toggle("open")
        }
    }
})
//stop propagtion on menu
theLinks.onclick = e => {
    e.stopPropagation()
}