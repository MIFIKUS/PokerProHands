document.addEventListener('DOMContentLoaded', function() {
    // Получаем текущую дату
    const today = new Date();

    const week_ago = new Date();

    week_ago.setDate(today.getDate() - 7)
    // Форматируем дату в формат YYYY-MM-DD
    const formattedToday = today.toISOString().split('T')[0];
    const formattedWeekAgo = week_ago.toISOString().split('T')[0];

    // Устанавливаем значение в input
    document.getElementById('end_date').value = formattedToday;
    document.getElementById('start_date').value = formattedWeekAgo;


});


function toggleDropdown() {
    const dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");

    console.log(dropdown);

    if (dropdown.classList.contains("show")) {
        dropdown.style.display = "block"; // Сначала показываем элемент
        // Блокируем изначально, чтобы показать его с плавностью
        setTimeout(() => {
            dropdown.style.opacity = "1"; // Плавно показываем
        }, 10);
    } else {
        dropdown.style.opacity = "0"; // Плавно скрываем
        setTimeout(() => {
            dropdown.style.display = "none"; // Скрываем элемент после анимации
        }, 300); // Время анимации соответствует времени в CSS
    }
}

function toggleDropdownBuyIn() {
    const dropdown = document.getElementById("buy_in_dropdown");
    dropdown.classList.toggle("show");

    console.log(dropdown);

    if (dropdown.classList.contains("show")) {
        dropdown.style.display = "block"; // Сначала показываем элемент
        // Блокируем изначально, чтобы показать его с плавностью
        setTimeout(() => {
            dropdown.style.opacity = "1"; // Плавно показываем
        }, 10);
    } else {
        dropdown.style.opacity = "0"; // Плавно скрываем
        setTimeout(() => {
            dropdown.style.display = "none"; // Скрываем элемент после анимации
        }, 300); // Время анимации соответствует времени в CSS
    }
}

function toggleDropdownTableSize() {
    const dropdown = document.getElementById("table_size_dropdown");
    dropdown.classList.toggle("show");

    console.log(dropdown);

    if (dropdown.classList.contains("show")) {
        dropdown.style.display = "block"; // Сначала показываем элемент
        // Блокируем изначально, чтобы показать его с плавностью
        setTimeout(() => {
            dropdown.style.opacity = "1"; // Плавно показываем
        }, 10);
    } else {
        dropdown.style.opacity = "0"; // Плавно скрываем
        setTimeout(() => {
            dropdown.style.display = "none"; // Скрываем элемент после анимации
        }, 300); // Время анимации соответствует времени в CSS
    }
}

function toggleDropdownSpeed() {
    const dropdown = document.getElementById("speed_dropdown");
    dropdown.classList.toggle("show");

    console.log(dropdown);

    if (dropdown.classList.contains("show")) {
        dropdown.style.display = "block"; // Сначала показываем элемент
        // Блокируем изначально, чтобы показать его с плавностью
        setTimeout(() => {
            dropdown.style.opacity = "1"; // Плавно показываем
        }, 10);
    } else {
        dropdown.style.opacity = "0"; // Плавно скрываем
        setTimeout(() => {
            dropdown.style.display = "none"; // Скрываем элемент после анимации
        }, 300); // Время анимации соответствует времени в CSS
    }
}


function updateButtonText() {
        const checkboxes = document.querySelectorAll('input[class="filters_checkbox"]');
        const button = document.getElementById('type_button');
        const selectedOptions = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedOptions.push(checkbox.value);
            }
        });

        if (selectedOptions.length > 0) {
            if (selectedOptions.length > 2) {
                button.textContent = `${selectedOptions.length} selected`;
            } else {
                button.textContent = selectedOptions.join(', ');
            }
            button.classList.add('active'); // Добавляем класс для изменения цвета
        } else {
            button.textContent = 'All';
            button.classList.remove('active'); // Убираем класс
        }
    }

function updateButtonTextBuyIn() {
        const checkboxes = document.querySelectorAll('input[class="buy_in_checkbox"]');
        const button = document.getElementById('buy_in_button');
        const selectedOptions = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedOptions.push(checkbox.value);
            }
        });

        if (selectedOptions.length > 0) {
            if (selectedOptions.length > 2) {
                button.textContent = `${selectedOptions.length} selected`;
            } else {
                button.textContent = selectedOptions.join(', ');
            }
            button.classList.add('active'); // Добавляем класс для изменения цвета
        } else {
            button.textContent = 'All';
            button.classList.remove('active'); // Убираем класс
        }
    }

function updateButtonTextTableSize() {
        const checkboxes = document.querySelectorAll('input[class="table_size_checkbox"]');
        const button = document.getElementById('table_size_button');
        const selectedOptions = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedOptions.push(checkbox.value);
            }
        });

        if (selectedOptions.length > 0) {
            if (selectedOptions.length > 2) {
                button.textContent = `${selectedOptions.length} selected`;
            } else {
                button.textContent = selectedOptions.join(', ');
            }
            button.classList.add('active'); // Добавляем класс для изменения цвета
        } else {
            button.textContent = 'All';
            button.classList.remove('active'); // Убираем класс
        }
    }

function updateButtonTextSpeed() {
        const checkboxes = document.querySelectorAll('input[class="speed_checkbox"]');
        const button = document.getElementById('speed_button');
        const selectedOptions = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedOptions.push(checkbox.value);
            }
        });

        if (selectedOptions.length > 0) {
            if (selectedOptions.length > 2) {
                button.textContent = `${selectedOptions.length} selected`;
            } else {
                button.textContent = selectedOptions.join(', ');
            }
            button.classList.add('active'); // Добавляем класс для изменения цвета
        } else {
            button.textContent = 'All';
            button.classList.remove('active'); // Убираем класс
        }
    }



