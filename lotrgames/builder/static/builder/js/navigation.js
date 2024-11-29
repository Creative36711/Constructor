function navigation(from, to, head){
    $(from).addClass('display-none')
    $(from).removeClass('active')
    $(to).addClass('active')
    $(to).removeClass('display-none')
    $("#main-label").text(head)

    var module = $('.form').attr('data-nav-module')

    if (module == "Конструктор карт") {
        $("#map-save").removeClass('display-none')
        $("#map-create").removeClass('display-none')
        $(".close-modal").addClass('display-none')

        if ($('#game-mode').attr('value') == "Режим игры") {
            $("#map-design").addClass('input-blocked')
            $("#map-configuration").addClass('input-blocked')
            $("#map-design").val('Дизайн карты')
            $("#map-configuration").val('Конфигурация карты')
            $("#map-design").attr("disabled", "disabled")
            $("#map-configuration").attr("disabled", "disabled")
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
    } else if (module == "Конфигурация карты") {
        $("#map-create").addClass('display-none')
        $(".close-modal").removeClass('display-none')
        if($('.container-configuration').attr('data-nav-text').includes("Объекты")){
            $("#map-save").addClass('display-none')
        } else {
            $("#map-save").removeClass('display-none')
        }
    } else {
        $("#map-save").addClass('display-none')
        $("#map-create").addClass('display-none')
        $(".close-modal").removeClass('display-none')
    }
}

$(".close-modal").click(function(){
    module = $('.form').attr('data-nav-module')
    if($(".container-modes").hasClass("active")) {
        $('.form').attr('data-nav-module', "Конструктор карт")
        navigation(".container-modes", ".container-main", "Конструктор карт")
    } else if($(".container-design").hasClass("active")) {
        $('.form').attr('data-nav-module', "Конструктор карт")
        navigation(".container-design", ".container-main", "Конструктор карт")
    } else if($("#td-configuration").hasClass("active")) {
        $('.form').attr('data-nav-module', "Конструктор карт")
        $(".container-configuration").addClass('display-none')
        navigation("#td-configuration", ".container-main", "Конструктор карт")
    } else if($("#td-editHorde").hasClass("active")) {
        $('.container-configuration').attr('data-nav-text', $('.container-configuration').attr('data-nav-text').split(" | ")[0])
        navigation("#td-editHorde", "#td-configuration", "Конфигурация карты")
        $('#td-configuration .td-create-horde').parent()[$(".container-configuration").attr('data-nav-index')].scrollIntoView({block: "center", inline: "center"})
    } else if($(".list-factions").hasClass("active")) {
        $(".container-objects").addClass('display-none')
        if (module == "Редактировать объекты") {
            $('.form').attr('data-nav-module', "Конструктор карт")
            navigation(".list-factions", ".container-main", "Конструктор карт")
        } else if (module == "Конфигурация карты"){
            var label = $('.container-configuration').attr('data-nav-text').split(" | ")
            $('.container-configuration').attr('data-nav-text', label[0] + " | " + label[1])
            navigation(".list-objects", "#td-editHorde", label[0] + " | " + label[1])
        }
    } else if($(".list-kindOf").hasClass("active")) {
        navigation(".list-kindOf", ".list-factions", "Выберите фракцию")
    } else if($(".list-objects").hasClass("active")) {
        label = $("#main-label").text().split(" | ")[0]
        $('.container-objects').attr('data-nav-text', label)
        navigation(".list-objects", ".list-kindOf", label)
    } else if($(".view-object").hasClass("active")) {
        label = $(".container-objects").attr('data-nav-text').split(" | ")[0] + " | " + $(".container-objects").attr('data-nav-text').split(" |" )[1]
        $('.container-objects').attr('data-nav-text', label)
        navigation(".view-object", ".list-objects", label)
        $('.list-objects .object')[$(".container-objects").attr('data-nav-index')].scrollIntoView({block: "center", inline: "center"})
    }
})

$("#game-mode").click(function(){
    $('.form').attr('data-nav-module', $(this).val())
    navigation(".container-main", ".container-modes", "Выбрать режим игры")
})

$("#map-design").click(function(){
    $('.form').attr('data-nav-module', $(this).val())
    navigation(".container-main", ".container-design", "Выбрать дизайн карты")
})

$("#map-configuration").click(function(){
    $(".container-configuration").removeClass('display-none')
    $('.form').attr('data-nav-module', $(this).val())
    $('.container-configuration').attr('data-nav-text', "Конфигурация карты")
    if ($('#game-mode').attr('value') == "Tower Defence") {
        headerTowerDefence()
        navigation(".container-main", "#td-configuration", "Конфигурация карты")
        $('#td-addWave').trigger('click')
    }
})

$(document).on('click', '.td-create-horde', function() {
    var wave = $(this).closest('.container').find('.h2').text()
    var label = wave+" | Отряд №#"
    editHordeTowerDefence()
    $('.container-configuration').attr('data-nav-text', label)
    $('.container-configuration').attr('data-nav-index', $(this).parent().index()-1)
    navigation("#td-configuration", "#td-editHorde", label)
    $('#td-addVariations').trigger('click')
});

$(document).on('click', '.td-add-unit', function() {
    $(".container-objects").removeClass('display-none')
    $('.container-configuration').attr('data-nav-text', $('#main-label').text() + " | Объекты")
    $('.container-configuration').attr('data-nav-index', $(this).closest(".td-horde-variations").index()-1)
    navigation("#td-editHorde", ".list-factions", "Выберите фракцию")
});

$(document).on('click', '.td-unit', function() {
    $(".container-objects").removeClass('display-none')
    $('.container-configuration').attr('data-nav-text', $('#main-label').text() + " | Объекты")
    $('.container-configuration').attr('data-nav-index', $(this).closest(".td-horde-variations").index()-1 + " | " + $(this).index())
    navigation("#td-editHorde", ".list-factions", "Выберите фракцию")
});

$("#object-editor").click(function(){
    $(".container-objects").removeClass('display-none')
    $('.form').attr('data-nav-module', $(this).val())
    $('.container-objects').attr('data-nav-text', "Выберите фракцию")
    navigation(".container-main", ".list-factions", "Выберите фракцию")
})

$(".list-factions input").click(function(){
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

$(document).on('click', '.list-objects .object', function() {

    objectName = $(this).find('.object-parameters .name').text()
    img = $(this).find('.object-parameters .img').text()
    side = $(this).find('.object-parameters .side').text()
    displayName = $(this).find('.object-parameters .displayName').text()
    buildCost = $(this).find('.object-parameters .buildCost').text()

    module = $('.form').attr('data-nav-module')

    if (module == "Конфигурация карты") {
        if($('.container-configuration').attr('data-nav-index').includes("|")){
            editUnit(objectName, displayName)
        } else {
            addUnit(objectName, displayName)
        }
        var label = $('.container-configuration').attr('data-nav-text').split(" | ")
        $('.container-configuration').attr('data-nav-text', label[0] + " | " + label[1])
        navigation(".list-objects", "#td-editHorde", label[0] + " | " + label[1])
    } else if (module == "Редактировать объекты") {
        viewObjectRender(displayName, side, buildCost, img)

        $('.container-objects').attr('data-nav-text', $("#main-label").text() + " | " + objectName)
        $('.container-objects').attr('data-nav-index', $(this).index())
    
        navigation(".list-objects", ".view-object", objectName)
    }
});