$(document).on('click', '.list-factions input', function() {
    faction = $(this).val()
    gameObjectsRender(faction)

    $('.container-objects').attr('data-nav-text', faction)
    navigation(".list-factions", ".list-kindOf", faction)
})

$(document).on('click', '.list-kindOf .button', function() {
    var arr = $(".list-objects .object-parameters .kindOf")
    var type = $(this).attr("data-filter")
    var catType = categoryUnits[type]

    objectFilter(arr, type, catType)

    label = $("#main-label").text() + " | " + $(this).val()
    $('.container-objects').attr('data-nav-text', label)
    navigation(".list-kindOf", ".list-objects", label)
});

$(document).on('click', '.list-objects .object figure', function() {
    if ($('.form').attr('data-context-menu') == "False") {
        listObjects(this)
    }
});

$(document).on('click', '.list-objects .object .dropdown', function() {
    if ($('.form').attr('data-context-menu') == "True") {
        listObjects(this)
    }
});

function listObjects(figure) {
    objectName = $(figure.closest('.object')).find('.object-parameters .name').text()
    img = $(figure.closest('.object')).find('.object-parameters .img').text()
    side = $(figure.closest('.object')).find('.object-parameters .side').text()
    displayName = $(figure.closest('.object')).find('.object-parameters .displayName').text()
    buildCost = $(figure.closest('.object')).find('.object-parameters .buildCost').text()

    module = $('.form').attr('data-nav-module')

    if (module == "Конфигурация карты" && $('.form').attr('data-context-menu') == "False") {
        if($('.container-configuration').attr('data-nav-index').includes("|")){
            editUnit(objectName, displayName)
        } else {
            addUnit(objectName, displayName)
        }
        var label = $('.container-configuration').attr('data-nav-text').split(" | ")
        $('.container-configuration').attr('data-nav-text', label[0] + " | " + label[1])
        navigation(".list-objects", "#td-editHorde", label[0] + " | " + label[1])
    } else if (module == "Редактировние объектов" || $('.form').attr('data-context-menu') == "True") {
        viewObjectRender(displayName, side, buildCost, img)

        $('.container-objects').attr('data-nav-text', $("#main-label").text() + " | " + objectName)
        $('.container-objects').attr('data-nav-index', $(figure.closest('.object')).index())

        navigation(".list-objects", ".view-object", objectName)
    }
}