function navigation(from, to, head){
    $(from).addClass('display-none')
    $(from).removeClass('active')
    $(to).addClass('active')
    $(to).removeClass('display-none')
    $("#main-label").text(head)

    var module = $('.form').attr('data-nav-module')

    if (module == "Конструктор карт") {
        updateMain()
    } else if (module == "Отображение") {
        $("#map-create").addClass('display-none')
    } else if (module == "Конфигурация") {
        $("#map-create").addClass('display-none')
        $(".close-modal").removeClass('display-none')
        if($('.container-configuration').attr('data-nav-text').includes("Объекты")){
            $("#map-save").addClass('display-none')
        } else {
            $("#map-save").removeClass('display-none')
        }
        if ($('#game-mode').attr('value').split(":")[1].trim() == "Tower Defence") {
            $(".radio-horde").addClass('display-none')
        }
    } else {
        $("#map-save").addClass('display-none')
        $("#map-create").addClass('display-none')
        $(".close-modal").removeClass('display-none')
    }
}

$(document).on('click', '.close-modal', function() {
    module = $('.form').attr('data-nav-module')
    if($(".container-display").hasClass("active")) {
        $('.form').attr('data-nav-module', "Конструктор карт")
        navigation(".container-display", ".container-main", "Конструктор карт")
    } else if($(".container-modes").hasClass("active")) {
        $('.form').attr('data-nav-module', "Конструктор карт")
        navigation(".container-modes", ".container-main", "Конструктор карт")
    } else if($(".container-design").hasClass("active")) {
        $('.form').attr('data-nav-module', "Конструктор карт")
        navigation(".container-design", ".container-main", "Конструктор карт")
    } else if($("#td-configuration").hasClass("active")) {
        $(".radio-horde").removeClass('display-none')
        $('.form').attr('data-nav-module', "Конструктор карт")
        $(".container-configuration").addClass('display-none')
        navigation("#td-configuration", ".container-main", "Конструктор карт")
    } else if($("#td-editHorde").hasClass("active")) {
        $('.container-configuration').attr('data-nav-text', "Tower Defence")
        navigation("#td-editHorde", "#td-configuration", "Конфигурация")
        $('#td-configuration .td-create-horde').parent()[$(".container-configuration").attr('data-nav-index')].scrollIntoView({block: "center", inline: "center"})
    } else if($(".list-factions").hasClass("active")) {
        $(".container-objects").addClass('display-none')
        if (module == "Редактировние объектов") {
            $('.form').attr('data-nav-module', "Конструктор карт")
            navigation(".list-factions", ".container-main", "Конструктор карт")
        } else if (module == "Конфигурация"){
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

