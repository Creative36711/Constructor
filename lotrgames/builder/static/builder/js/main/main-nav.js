function updateMain() {
    $("#map-save").removeClass('display-none')
    $("#map-create").removeClass('display-none')
    $(".close-modal").addClass('display-none')

    if ($('#map-name').val() == "") {
        $("#game-mode").addClass('input-blocked')
        $("#map-design").addClass('input-blocked')
        $("#map-configuration").addClass('input-blocked')
        $("#object-editor").addClass('input-blocked')
        $("#game-mode").val('Режим игры')
        $("#map-design").val('Дизайн карты')
        $("#map-configuration").val('Конфигурация карты')
        $("#game-mode").attr("disabled", "disabled")
        $("#map-design").attr("disabled", "disabled")
        $("#map-configuration").attr("disabled", "disabled")
        $("#object-editor").attr("disabled", "disabled")
    }
    if ($('#map-name').val() != "" && $('#game-mode').attr('value') == "Режим игры") {
        $("#map-design").addClass('input-blocked')
        $("#map-configuration").addClass('input-blocked')
        $("#game-mode").removeClass('input-blocked')
        $("#object-editor").removeClass('input-blocked')
        $("#map-design").val('Дизайн карты')
        $("#map-configuration").val('Конфигурация карты')
        $("#map-design").attr("disabled", "disabled")
        $("#map-configuration").attr("disabled", "disabled")
        $("#game-mode").removeAttr('disabled')
        $("#object-editor").removeAttr('disabled')
    }
    if ($('#game-mode').attr('value') != "Режим игры" && $('#map-design').attr('value') == "Дизайн карты") {
        $("#map-configuration").addClass('input-blocked')
        $("#map-design").removeClass('input-blocked');
        $("#map-configuration").attr("disabled", "disabled")
        $("#map-design").removeAttr('disabled')
    }
    if ($('#game-mode').attr('value') != "Режим игры" && $('#map-design').attr('value') != "Дизайн карты") {
        $("#map-configuration").removeClass('input-blocked')
        $("#map-design").removeClass('input-blocked');
        $("#map-configuration").removeAttr('disabled')
        $("#map-design").removeAttr('disabled')
    }
}

$(document).on('input', '#map-name', function() {
    if ($(this).val().length == 0 || $(this).val().length == 1) {
        navigation(".container-modes", ".container-main", "Конструктор карт")
    }
});

$(document).on('click', '#game-mode', function() {
    $('.form').attr('data-nav-module', $(this).val())
    navigation(".container-main", ".container-modes", "Выбрать режим игры")
})

$(document).on('click', '#map-design', function() {
    $('.form').attr('data-nav-module', $(this).val())
    navigation(".container-main", ".container-design", "Выбрать дизайн карты")
})

$(document).on('click', '#map-configuration', function() {
    $(".container-configuration").removeClass('display-none')
    $('.form').attr('data-nav-module', $(this).val())
    $('.container-configuration').attr('data-nav-text', "Tower Defence")
    if ($('#game-mode').attr('value') == "Tower Defence") {
        headerTowerDefence()
        $('.td-addWave').trigger('click')
        navigation(".container-main", "#td-configuration", "Конфигурация карты")
    }
})

$(document).on('click', '#object-editor', function() {
    $(".container-objects").removeClass('display-none')
    $('.form').attr('data-nav-module', $(this).val())
    $('.container-objects').attr('data-nav-text', "Выберите фракцию")
    navigation(".container-main", ".list-factions", "Выберите фракцию")
})