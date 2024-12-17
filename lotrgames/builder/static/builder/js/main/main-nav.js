function updateMain() {
    $("#map-save").removeClass('display-none')
    $("#map-create").removeClass('display-none')
    $(".close-modal").addClass('display-none')

    if ($('#map-display').attr('value') == "Отображение") {
        $("#game-mode").addClass('input-blocked')
        $("#map-design").addClass('input-blocked')
        $("#map-configuration").addClass('input-blocked')
        $("#object-editor").addClass('input-blocked')
        $("#game-mode").val('Режим')
        $("#map-design").val('Дизайн')
        $("#map-configuration").val('Конфигурация')
        $("#game-mode").attr("disabled", "disabled")
        $("#map-design").attr("disabled", "disabled")
        $("#map-configuration").attr("disabled", "disabled")
        $("#object-editor").attr("disabled", "disabled")
    }
    if ($('#map-display').attr('value') != "Отображение" && $('#game-mode').attr('value') == "Режим") {
        $("#map-design").addClass('input-blocked')
        $("#map-configuration").addClass('input-blocked')
        $("#game-mode").removeClass('input-blocked')
        $("#map-design").val('Дизайн')
        $("#map-configuration").val('Конфигурация')
        $("#map-design").attr("disabled", "disabled")
        $("#map-configuration").attr("disabled", "disabled")
        $("#game-mode").removeAttr('disabled')
        $("#object-editor").attr("disabled", "disabled")
        $("#object-editor").addClass('input-blocked')
    }
    if ($('#game-mode').attr('value') != "Режим" && $('#map-design').attr('value') == "Дизайн") {
        $("#map-configuration").addClass('input-blocked')
        $("#map-design").removeClass('input-blocked');
        $("#map-configuration").attr("disabled", "disabled")
        $("#map-design").removeAttr('disabled')
        $("#object-editor").attr("disabled", "disabled")
        $("#object-editor").addClass('input-blocked')
    }
    if ($('#game-mode').attr('value') != "Режим" && $('#map-design').attr('value') != "Дизайн") {
        $("#map-configuration").removeClass('input-blocked')
        $("#map-design").removeClass('input-blocked');
        $("#map-configuration").removeAttr('disabled')
        $("#map-design").removeAttr('disabled')
        $("#object-editor").removeClass('input-blocked')
        $("#object-editor").removeAttr('disabled')
    }
}

$(document).on('click', '#map-display', function() {
    $('.form').attr('data-nav-module', "Отображение")
    navigation(".container-main", ".container-display", "Отображение карты")
})

$(document).on('click', '#game-mode', function() {
    $('.form').attr('data-nav-module', "Режим")
    navigation(".container-main", ".container-modes", "Выбрать режим игры")
})

$(document).on('click', '#map-design', function() {
    $('.form').attr('data-nav-module', "Дизайн")
    navigation(".container-main", ".container-design", "Выбрать дизайн карты")
})

$(document).on('click', '#map-configuration', function() {
    $(".container-configuration").removeClass('display-none')
    $('.form').attr('data-nav-module', "Конфигурация")
    $('.container-configuration').attr('data-nav-text', "Tower Defence")
    if ($('#game-mode').attr('value') == "Режим игры: Tower Defence") {
        headerTowerDefence()
        $('.td-addWave').trigger('click')
        navigation(".container-main", "#td-configuration", "Конфигурация")
    }
})

$(document).on('click', '#object-editor', function() {
    $(".container-objects").removeClass('display-none')
    $('.form').attr('data-nav-module', $(this).val())
    $('.container-objects').attr('data-nav-text', "Выберите фракцию")
    navigation(".container-main", ".list-factions", "Выберите фракцию")
})