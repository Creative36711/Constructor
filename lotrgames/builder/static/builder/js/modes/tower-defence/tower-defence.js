deletingFields(".td-cross-wave", ".td-amountWave", "Количество волн")
deletingFields(".td-cross-variations", ".td-amountVariations", "Вариации отрядов")

conditionsInput('.td-delay', "Задержка", "int")
conditionsInput('.td-lives', "Жизней", "int")
conditionsInput('.td-startup-money', "Ресурсы", "int")
conditionsInput('.td-price-palantir', "Цена палантира", "int")
conditionsInput('.td-price-experience', "Цена опыта", "int")
conditionsInput('.td-price-level', "Цена уровня", "int")
conditionsInput('.td-time-purchase', "Время покупки", "int", "сек")
conditionsInput('.td-min-reward', "Мин награда", "int")
conditionsInput('.td-max-reward', "Макс награда", "int")

conditionsInput('.td-quantity', "Количество", "int")
conditionsInput('.td-quantity-line', "Численность ряда", "int")
conditionsInput('.td-start-position', "Старт позиция", "int")
conditionsInput('.td-distance-y', "Дистанция по Y", "int")
conditionsInput('.td-distance-x', "Дистанция по X", "int")
conditionsInput('.td-speed', "Скорость отряда", "int")

$(document).on('change', '.td-delay', function() {
    $(this).val("Задержка: " + Math.round($(this).val().split(":")[1]/10)*10 + " сек")
});

function headerTowerDefence() {
    $('#td-configuration').remove();
    $(".container-configuration").append(`
        <div class='container' id='td-configuration'>
            <div class='row'>
                <input class='form-content td-delay' type='text' placeholder='Время до старта' autocomplete='off'>
                <input class='form-content td-lives' type='text' placeholder='Количество жизней' autocomplete='off'>
                <input class='form-content td-startup-money' type='text' placeholder='Стартовые ресурсы' autocomplete='off'>
                <input class='form-content td-price-palantir' type='text' placeholder='Цена очков палантира' autocomplete='off'>
            </div>
            <div class='row'>
                <input class='form-content td-price-experience' type='text' placeholder='Цена опыта войск' autocomplete='off'>
                <input class='form-content td-price-level' type='text' placeholder='Цена уровня героя' autocomplete='off'>
                <input class='form-content td-time-purchase' type='text' placeholder='Время покупки' autocomplete='off'>
                <input class='form-content input-blocked td-amountWave' type='text' value='Количество волн: 0' disabled>
            </div>
            <input class='form-content button td-addWave' type='button' value='Добавить волну'>
        </div>
    `);
}

function editHordeTowerDefence() {
    $('#td-editHorde').remove();
    $(".container-configuration").append(`
        <div class='container display-none' id='td-editHorde'>
            <input class='form-content input-blocked td-amountVariations' type='text' value='Вариации отрядов: 0' disabled>
            <input class='form-content button td-addVariations' type='button' value='Добавить вариативный отряд'>
        </div>
    `);
}

$(document).on('click', '.td-addWave', function() {
    buttonLock(tdConfigurationInputs, tdConfigurationButtons, "click", this)

    var count = Number($(".td-amountWave").val().split(':')[1]) + 1

    $("#td-configuration").append(`
        <div class='container td-waves'>
            <div class='form-lable h2'>Волна №${count}</div>
            ${cross(count, 'td-cross-wave')}
            <input class='form-content td-text' type='text' placeholder='Сообщение для игрока после завершения волны' autocomplete='off'>
            <div class='row'>
                <input class='form-content td-min-reward' type='text' placeholder='Награда от' autocomplete='off'>
                <input class='form-content td-max-reward' type='text' placeholder='Награда до' autocomplete='off'>
            </div>
            <div class='container'></div>
            <input class='form-content button td-create-horde' type='button' value='Создать отряд'>
            <hr>
        </div>
    `);
    $(".td-amountWave").val("Количество волн: " + count)
    $("#td-configuration").append($(".td-addWave"))
    $(".form").append($("#map-save"))
});


$(document).on('click', '.td-addVariations', function() {
    buttonLock(tdEditHordeInputs, tdEditHordeButtons, "click", this)

    var count = Number($(".td-amountVariations").val().split(':')[1]) + 1

    if(count <= 40) {
        $("#td-editHorde").append(`
            <div class='container td-horde-variations'>
                <div class='form-lable h2'>Вариативный отряд №${count}</div>
                ${cross(count, "td-cross-variations")}
                <div class='row'>
                    <input class='form-content td-quantity' type='text' placeholder='Количество юнитов' autocomplete='off'>
                    <input class='form-content td-quantity-line' type='text' placeholder='Численность ряда' autocomplete='off'>
                    <input class='form-content td-start-position' type='text' placeholder='Стартовая позиция' autocomplete='off'>
                    <input class='form-content td-distance-y' type='text' placeholder='Дистанция по Y' autocomplete='off'>
                </div>
                <div class='row'>
                    <input class='form-content td-distance-x' type='text' placeholder='Дистанция по X' autocomplete='off'>
                    <input class='form-content td-speed' type='text' placeholder='Скорость отряда' autocomplete='off'>
                    <input class='form-content input-blocked td-amountUnits' type='text' value='Вариации юнитов: 0' disabled>
                    ${additionalButton("additional-button td-autofill", "По умолчанию")}
                </div>
                <div class='container td-list-units'></div>
                <input class='form-content button td-add-unit' type='button' value='Добавить юнита'>
                <hr>
            </div>
        `);
        $("#td-editHorde").append($(".td-addVariations"))
        $(".td-amountVariations").val("Вариации отрядов: " + count)
        $(".form").append($("#map-save"))
    }
});

$(document).on('click', '.td-autofill', function() {
    var parent = $(this).closest(".td-horde-variations")
    parent.find(".td-quantity").val("Количество: 100")
    parent.find(".td-quantity-line").val("Численность ряда: 5")
    parent.find(".td-start-position").val("Старт позиция: 0")
    parent.find(".td-distance-y").val("Дистанция по Y: 20")
    parent.find(".td-distance-x").val("Дистанция по X: 20")
    parent.find(".td-speed").val("Скорость отряда: 50")
});

function addUnit(name, display) {
    var index = $('.container-configuration').attr('data-nav-index')
    var counter = $(".td-horde-variations").find(".td-amountUnits")[index]
    var count = Number(counter.value.split(':')[1]) + 1
    var div_label = $('<div>', {'class': 'form-lable h2'})
    var button_unit = $('<input>', {'class': 'form-content button td-unit', 'type': 'button', 'value': display + " ("+name+")"})
    $("#td-editHorde").find($(".td-list-units")[index]).append(button_unit)
    $("#td-editHorde").find($(".td-amountUnits")[index]).val("Вариации юнитов: " + count)
}

function editUnit(name, display) {
    var index = $('.container-configuration').attr('data-nav-index').split(" | ")
    var parent = $("#td-editHorde").find(".td-list-units").eq(index[0])
    var child = parent.find(".td-unit").eq(index[1])
    child.val(`${display} (${name})`)
}
