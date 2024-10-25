// Плавный скролл только для ссылок на якоря
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Проверяем находится ли элемент в слайдере
        const isInSlider = this.closest('.reviewsSwiper') !== null;

        // Если ссылка находится в слайдере, не предотвращаем клик
        if (!isInSlider) {
            e.preventDefault();

            // Пробуем получить элемент по ID или имени якоря
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Проверяем, существует ли элемент с таким ID
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

//Отображение файлов и кнопки отправить в форме
document.getElementById('screenshot').addEventListener('change', function () {
    const fileNameDisplay = document.getElementById('file-name');
    const submitButton = document.querySelector('.sketch__submit');
    const nameField = document.getElementById('name');
    const phoneField = document.getElementById('phone');
    const file = this.files[0];

    if (file) {
        fileNameDisplay.textContent = `Файл: ${file.name}`;

        // Показываем поля для имени и номера телефона
        nameField.style.display = 'block';
        phoneField.style.display = 'block';

        // Показываем кнопку отправки
        submitButton.style.display = 'block';
    } else {
        fileNameDisplay.textContent = '';

        // Скрываем поля и кнопку, если файл не загружен
        nameField.style.display = 'none';
        phoneField.style.display = 'none';
        submitButton.style.display = 'none';

        // Убираем классы ошибок
        nameField.classList.remove('error');
        phoneField.classList.remove('error');
    }
});

//Проверка на валидность
document.querySelector('.sketch__upload').addEventListener('submit', function (event) {
    const nameField = document.getElementById('name');
    const phoneField = document.getElementById('phone');
    const successMessage = document.getElementById('success-message'); // Элемент для сообщения об успехе
    let valid = true;

    // Проверяем имя
    if (!nameField.value) {
        nameField.classList.add('error'); // Добавляем класс ошибки
        valid = false;
    } else {
        nameField.classList.remove('error'); // Убираем класс ошибки, если валидно
    }

    // Проверяем номер телефона
    if (!validPhone(phoneField.value)) {
        phoneField.classList.add('error'); // Добавляем класс ошибки
        valid = false;
    } else {
        phoneField.classList.remove('error'); // Убираем класс ошибки, если валидно
    }

    if (!valid) {
        event.preventDefault(); // Останавливаем отправку формы при неверном вводе
        alert("Пожалуйста, заполните корректные данные.");
    } else {
        event.preventDefault(); // Здесь предотвращаем реальную отправку формы (для примера)

        // Отображаем сообщение об успешной отправке
        successMessage.textContent = "Ваше изображение получено! Ждите обратного звонка.";
        successMessage.style.display = 'block';

        // Очищаем поля после успешной попытки (опционально)nameField.value = '';
        phoneField.value = '';
        document.getElementById('file-name').textContent = '';
        phoneField.classList.remove('error');
        nameField.classList.remove('error');

        // Скрываем поля и кнопку (опционально)
        nameField.style.display = 'none';
        phoneField.style.display = 'none';
        document.querySelector('.sketch__submit').style.display = 'none';
    }
});

// Функция для проверки валидности номера телефона
function validPhone(phone) {
    const phoneRegex = /^(8\d{10}|\+7\d{10})$/; // Номер должен начинаться с 8 или +7 и содержать 11 цифр (всего)
    return phoneRegex.test(phone);
}

//Анимация имени автора
window.addEventListener('scroll', function () {
    const aboutSection = document.querySelector('.about');
    const quoteName = document.querySelector('.quote-author__name');
    const quotePost = document.querySelector('.quote-author__post');

    // Проверка позиции обертки about
    const sectionPosition = aboutSection.getBoundingClientRect().top;

    // Если секция about попадает в видимую область
    if (sectionPosition <= window.innerHeight) {
        setTimeout(() => {
            quoteName.classList.add('visible'); // Показать имя
        }, 3000); // Задержка 3 секунды

        setTimeout(() => {
            quotePost.classList.add('visible'); // Показать пост
        }, 3500); // Задержка 3.5 секунды
    }
});

// Слайдер
var swiper = new Swiper('.reviewsSwiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 0,
    centeredSlides: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    autoplay: {
        delay: 4000, 
        disableOnInteraction: false,
    },

    effect: 'slide',
});  

// Обработчик событий для управления слайдером с клавиатуры
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        swiper.slideNext(); 
    } else if (event.key === 'ArrowLeft') {
        swiper.slidePrev(); 
    }
});

