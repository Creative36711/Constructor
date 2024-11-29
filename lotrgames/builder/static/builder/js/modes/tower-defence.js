function headerTowerDefence() {
    $('#td-configuration').remove();
    var container = $('<div>', {'class': 'container', 'id': 'td-configuration'})
    var row = $('<div>', {'class': 'row'})
    var input_delay = $('<input>', {'class': 'form-content td-delay', 'id': 'td-delay', 'type': 'text', 'placeholder': 'Время до старта' , 'autocomplete': 'off'})
    var input_amountWave = $('<input>', {'class': 'form-content input-blocked', 'id': 'td-amountWave', 'type': 'text', 'disabled': 'disabled'})
    var button_addWave = $('<input>', {'class': 'form-content button', 'id': 'td-addWave', 'type': 'button', 'value': 'Добавить волну'})
    $('.container-configuration').append(container)
    container.append(row)
    row.append(input_delay)
    row.append(input_amountWave.val("Количество волн: 0"))
    customCheckbox(row, "td-mine", "Вкл шахты")
    container.append(button_addWave)
}

function editHordeTowerDefence() {
    $('#td-editHorde').remove();
    var form_editHorde = $('<div>', {'class': 'container display-none', 'id': 'td-editHorde'})
    var input_amountVariations = $('<input>', {'class': 'form-content input-blocked', 'id': 'td-amountVariations', 'type': 'text', 'disabled': 'disabled'})
    var button_addVariations = $('<input>', {'class': 'form-content button', 'id': 'td-addVariations', 'type': 'button', 'value': 'Добавить вариативный отряд'})
    $(".container-configuration").append(form_editHorde)
    $(form_editHorde).append(input_amountVariations)
    $(form_editHorde).append(button_addVariations)
    $("#td-amountVariations").val("Вариации отрядов: 0")
}

$(document).on('click', '#td-addWave', function() {
    var count = Number($("#td-amountWave").val().split(':')[1]) + 1
    var div_container1 = $('<div>', {'class': 'container td-waves', 'id': 'td-wave-'+count })
    var div_label = $('<div>', {'class': 'form-lable h2'})
    var input_text = $('<input>', {'class': 'form-content td-text', 'type': 'text', 'placeholder': 'Сообщение для игрока после завершения волны'})
    var row1 = $('<div>', {'class': 'row'})
    var input_minReward = $('<input>', {'class': 'form-content min-reward', 'type': 'text', 'placeholder': 'Награда от'})
    var input_maxReward = $('<input>', {'class': 'form-content max-reward', 'type': 'text', 'placeholder': 'Награда до'})
    var div_container2 = $('<div>', {'class': 'container', 'id': 'td-wave-'+count+'-horde-' })
    var button_createHorde = $('<input>', {'class': 'form-content button td-create-horde', 'type': 'button', 'value': 'Создать отряд'})
    $("#td-amountWave").val("Количество волн: " + count)
    $("#td-configuration").append(div_container1)
    div_container1.append(div_label.text("Волна №"+count))
     if(count > 1) {
         div_cross = $('<div>', {'class': 'cross cross-wave'})
         span_cross = $('<span>').text("❌")
         div_container1.append(div_cross)
         div_cross.append(span_cross)
     }
    div_container1.append(input_text)
    div_container1.append(row1)
    row1.append(input_minReward)
    row1.append(input_maxReward)
    div_container1.append(div_container2)
    div_container1.append(button_createHorde)
    div_container1.append($('<hr>'))
    $("#td-configuration").append($("#td-addWave"))
    $(".form").append($("#map-save"))
});


$(document).on('click', '#td-addVariations', function() {
    var count = Number($("#td-amountVariations").val().split(':')[1]) + 1

    if(count <= 40) {
        var div_container1 = $('<div>', {'class': 'container td-horde-variations', 'id': 'td-horde-variations-'+count })
        var div_label = $('<div>', {'class': 'form-lable h2'})
        var row1 = $('<div>', {'class': 'row'})
        var row2 = $('<div>', {'class': 'row'})
        var input_quantity = $('<input>', {'class': 'form-content td-quantity', 'type': 'text', 'placeholder': 'Количество юнитов'})
        var input_quantityLine = $('<input>', {'class': 'form-content td-quantity-line', 'type': 'text', 'placeholder': 'Численность ряда'})
        var input_startPosition = $('<input>', {'class': 'form-content td-start-position', 'type': 'text', 'placeholder': 'Стартовая позиция'})
        var input_distanceY = $('<input>', {'class': 'form-content td-distance-y', 'type': 'text', 'placeholder': 'Дистанция по Y'})
        var input_distanceX = $('<input>', {'class': 'form-content td-distance-x', 'type': 'text', 'placeholder': 'Дистанция по X'})
        var input_amountUnits = $('<input>', {'class': 'form-content input-blocked td-amountUnits', 'type': 'text', 'disabled': 'disabled'})
        var list_units = $('<div>', {'class': 'container td-list-units'})
        var button_addUnit = $('<input>', {'class': 'form-content button td-add-unit', 'type': 'button', 'value': 'Добавить юнита'})
        div_container1.append(div_label.text("Вариативный отряд №"+count))
        if(count > 1) {
            div_cross = $('<div>', {'class': 'cross cross-variations'})
            span_cross = $('<span>').text("❌")
            div_container1.append(div_cross)
            div_cross.append(span_cross)
        }

        $("#td-editHorde").append(div_container1)
        div_container1.append(row1)
        div_container1.append(row2)
        row1.append(input_quantity)
        row1.append(input_quantityLine)
        row1.append(input_startPosition)
        row1.append(input_distanceY)
        row2.append(input_distanceX)
        row2.append(input_amountUnits.val("Вариации юнитов: 0"))
        div_container1.append(list_units)
        div_container1.append(button_addUnit)
        div_container1.append($('<hr>'))
        $("#td-editHorde").append($("#td-addVariations"))
        $("#td-amountVariations").val("Вариации отрядов: " + count)
        $(".form").append($("#map-save"))
    }
});

deletingFields(".cross-wave", "#td-amountWave", "Количество волн")
deletingFields(".cross-variations", "#td-amountVariations", "Вариации отрядов")

numericInput('.td-quantity', "Количество")
numericInput('.td-quantity-line', "Численность ряда")
numericInput('.td-start-position', "Старт позиция")
numericInput('.td-distance-y', "Дистанция по Y")
numericInput('.td-distance-x', "Дистанция по X")
numericInput('.min-reward', "Мин награда")
numericInput('.max-reward', "Макс награда")
numericInput('.td-delay', "Задержка")

$(document).on('change', '.max-reward', function() {
    var minVal = Number($('.min-reward').val().replace(/[^0-9]/g,""))
    if (Number($(this).val()) >= minVal) {
        $(this).val("Макс награда: " + $(this).val())
    } else {
        $(this).val("Макс награда: " + minVal)
    }
});

$(document).on('change', '.td-delay', function() {
    $(this).val("Задержка: " + Math.round($(this).val().split(":")[1]/10)*10 + " сек")
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
    var index = $('.container-configuration').attr('data-nav-index').split(" | ") // Получает два индекса в формате int | int
    var parent = $("#td-editHorde").find($(".td-list-units")[index[0]]) // Находит элемент по первому индексу
    var child = parent.find($(".td-unit")[index[1]]) // Находит дочерний элемент по второму индексу
    child.val(display + " ("+name+")") // Записывает новое значение
}
