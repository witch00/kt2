class Slider {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.slide');
        this.dots = container.querySelectorAll('.dot');
        this.prevBtn = container.querySelector('.prev');
        this.nextBtn = container.querySelector('.next');
        this.currentSlide = 0;
        
        this.init();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        this.showSlide(this.currentSlide);
    }
    
    showSlide(index) {
        // Скрываем все слайды
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Показываем текущий слайд
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentSlide = index;
    }
    
    next() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = 0; // Возврат к первому слайду
        }
        this.showSlide(nextIndex);
    }
    
    prev() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1; // Переход к последнему слайду
        }
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
}


class AutoSlider extends Slider {
    constructor(container, interval = 3000) {
        super(container);
        this.interval = interval;
        this.autoPlayId = null;
        this.startAutoPlay();
    }
    
    startAutoPlay() {
        this.autoPlayId = setInterval(() => {
            this.next();
        }, this.interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayId) {
            clearInterval(this.autoPlayId);
            this.autoPlayId = null;
        }
    }
    
    // Переопределяем методы для остановки автопрокрутки при ручном управлении
    next() {
        super.next();
        this.restartAutoPlay();
    }
    
    prev() {
        super.prev();
        this.restartAutoPlay();
    }
    
    goToSlide(index) {
        super.goToSlide(index);
        this.restartAutoPlay();
    }
    
    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
	
}

const autoSlider = new AutoSlider(document.querySelector('.slider'), 5000);



document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.product-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});




// Обработка отправки формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();


  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

 
 
  console.log('Данные формы для отправки:', data);
  alert('Заявка успешно сформирована! Данные в консоли.');
  
 
  this.reset();
});

