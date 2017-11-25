var HlSlider = function(selector,options) {
    this.options = options;
    this.selector = selector;
    var self = this;
    this.current = 0;

    this.intializeSlider();
    this.intializeEventListener();
    this.intializePagination();
    this.autoplay();
    }

HlSlider.prototype.intializeEventListener = function() {
    // navigation btn
    var self = this;
    document.querySelector(this.options.nextSlide).addEventListener('click', function () {
        //self.current - 2
        self.nextSlide();
    });
    document.querySelector(this.options.previousSlide).addEventListener('click', function () {
        self.previousSlide();
        
    }); 
}

HlSlider.prototype.intializeSlider = function() {
    var mainContainer = document.querySelector(this.selector);
    this.mainContainerWidth = window.outerWidth;
    // this.mainContainerWidth = document.querySelector(this.selector).offsetWidth;

    this.slidesWrapper = mainContainer.querySelector('.hl-slider-wrapper');
    this.totalSlidesLength = this.slidesWrapper.children.length;


    var containerWidth = this.slidesWrapper.querySelector('.hl-slides').offsetWidth;
    this.arraySlides = this.slidesWrapper.querySelectorAll('.hl-slides');
    for (var index = 0; index < this.arraySlides.length - 1; index++) {
        this.arraySlides[index].style.marginRight = this.options.slidesSpaceBetween;
    }
    for (var index = 0; index < this.arraySlides.length; index++) {
        this.arraySlides[index].style.width = this.mainContainerWidth + 'px';
    }

    if (this.options.slidesSpaceBetween !== 0) {
        //total this.slideswrapper width calculate with margin
        var containerTotalWidth = (this.totalSlidesLength * this.mainContainerWidth) + ((this.totalSlidesLength - 1) * this.options.slidesSpaceBetween);
    } else {
        var containerTotalWidth = (this.totalSlidesLength * this.mainContainerWidth); //total this.slideswrapper width calculate without margin
    }

    this.slidesWrapper.style.width = containerTotalWidth + 'px'; // add css to slides wrapper
}

HlSlider.prototype.intializePagination = function () {
    // pagination
    this.pagination = document.querySelector(this.options.pagination);
    for (var index = 0; index < this.arraySlides.length; index++) {
        var outerCircle = document.createElement('div');
        this.pagination.appendChild(outerCircle);
        outerCircle.setAttribute('class', 'outer-circle');
        var outerCircleComplete = outerCircle.innerHTML = '<div class="inner-circle"></div>'
    }

    this.totalPagination = this.pagination.querySelectorAll('.outer-circle');
    
    // add class active by default
    this.totalPagination[0].classList.add('active');
    this.arraySlides[0].classList.add('active');
    document.querySelector(this.options.previousSlide).classList.add('first-item');

    this.hlBullets = [];

    for (let index = 0; index < this.totalPagination.length; index++) {
        // this.totalPagination[index].addEventListener('click', createClickHandler(index));
        this.hlBullets.push(new HlBullets(this, index));
        // this.totalPagination[index].addEventListener('click', function() {
        //     console.log(index);
        // });
    }
}

HlSlider.prototype.beforeCurrentValueUpdate = function() {
    this.totalPagination[this.current].classList.remove('active');
    this.arraySlides[this.current].classList.remove('active');

    // add class first-item to the navigation btn
    if (this.current == this.arraySlides.length - 1) {
        document.querySelector(this.options.nextSlide).classList.remove('last-item');
    }
    if (this.current == 0) {
       document.querySelector(this.options.previousSlide).classList.remove('first-item');
    }
}

HlSlider.prototype.afterCurrentValueUpdate = function () {
    this.totalPagination[this.current].classList.add('active');
    this.arraySlides[this.current].classList.add('active');

    // add class last-tem to the navigation btn
    if(this.current == this.arraySlides.length - 1){
        document.querySelector(this.options.nextSlide).classList.add('last-item');
    }
    if (this.current == 0){
       document.querySelector(this.options.previousSlide).classList.add('first-item');
    }
}

HlSlider.prototype.translateSlidesModule = function () {
    this.slidesWrapper.style.transform = "translateX(" + (this.mainContainerWidth + this.options.slidesSpaceBetween) * -this.current + "px)";
}

HlSlider.prototype.nextSlide = function() {
    if (this.current < this.totalSlidesLength - 1) {
        this.beforeCurrentValueUpdate();
        let previousSlide = this.current;
        this.current += 1;
        this.afterCurrentValueUpdate();
        this.translateSlidesModule();
        // this.options.slideChangeCallBack(previousSlide, this.current);
    }else{
        
    }
}

HlSlider.prototype.previousSlide = function () {
    if (this.current != 0) {
        this.beforeCurrentValueUpdate();
        let previousSlide = this.current;
        this.current -= 1;
        this.afterCurrentValueUpdate();
        this.translateSlidesModule();
        // this.options.slideChangeCallBack(previousSlide, this.current);
    }
}

HlSlider.prototype.autoplay = function() {
    var self = this;
    if(this.options.autoplay) {
    function hh() {
        if ( self.current < self.totalSlidesLength-1) {
            self.beforeCurrentValueUpdate();
            self.current += 1;
            self.afterCurrentValueUpdate();
            self.translateSlidesModule();
            console.log("holad" + self.current);
            setTimeout(hh, self.options.speed);
            console.log("holad" + self.current);
        }else{
            self.beforeCurrentValueUpdate();
            self.current = 0;
            console.log("holal" + self.current);
            self.afterCurrentValueUpdate();
            self.translateSlidesModule();
            setTimeout(hh, self.options.speed);
        }

    }
    setTimeout(hh, self.options.speed);
}
}
// closure
// function createClickHandler(index) {
//     return function() {
//         console.log(index);
//     }
// }

var HlBullets = function(hlSlider, index) {
    hlSlider.totalPagination[index].addEventListener('click', function() {
        console.log(hlSlider.current);
        if (index !== hlSlider.current) {
            if (index > hlSlider.current) {
                hlSlider.beforeCurrentValueUpdate();
                let previousSlide = hlSlider.current;
                hlSlider.current = index;
                hlSlider.afterCurrentValueUpdate();
                hlSlider.translateSlidesModule();
                // hlSlider.options.slideChangeCallBack(previousSlide, hlSlider.current);
            }

            if (index < hlSlider.current) {
                hlSlider.beforeCurrentValueUpdate();
                let previousSlide = hlSlider.current;
                hlSlider.current = index;
                hlSlider.afterCurrentValueUpdate();
                hlSlider.translateSlidesModule();
                // hlSlider.options.slideChangeCallBack(previousSlide, hlSlider.current);
                
            }
        }
    });
}