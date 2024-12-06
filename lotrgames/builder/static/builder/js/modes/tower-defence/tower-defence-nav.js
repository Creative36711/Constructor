var tdConfigurationInputs = [".td-delay", ".td-lives", ".td-text", ".td-min-reward", ".td-max-reward"]
var tdConfigurationButtons = [".td-create-horde", ".td-addWave"]
var tdEditHordeInputs = [".td-quantity", ".td-quantity-line", ".td-start-position", ".td-distance-y", ".td-distance-x", ".td-speed"]
var tdEditHordeButtons = [".td-add-unit", ".td-addVariations"]

buttonLock(tdConfigurationInputs, tdConfigurationButtons, "input", tdConfigurationInputs[0])
buttonLock(tdConfigurationInputs, tdConfigurationButtons, "input", tdConfigurationInputs[1])
buttonLock(tdConfigurationInputs, tdConfigurationButtons, "input", tdConfigurationInputs[2])
buttonLock(tdConfigurationInputs, tdConfigurationButtons, "input", tdConfigurationInputs[3])
buttonLock(tdConfigurationInputs, tdConfigurationButtons, "input", tdConfigurationInputs[4])
buttonLock(tdConfigurationInputs, tdConfigurationButtons, "click", ".td-addWave")
buttonLock(tdConfigurationInputs, tdConfigurationButtons, "click", ".td-cross-wave")
buttonLock(tdConfigurationInputs, tdConfigurationButtons, "click", ".td-create-horde")

buttonLock(tdEditHordeInputs, tdEditHordeButtons, "input", tdEditHordeInputs[0])
buttonLock(tdEditHordeInputs, tdEditHordeButtons, "input", tdEditHordeInputs[1])
buttonLock(tdEditHordeInputs, tdEditHordeButtons, "input", tdEditHordeInputs[2])
buttonLock(tdEditHordeInputs, tdEditHordeButtons, "input", tdEditHordeInputs[3])
buttonLock(tdEditHordeInputs, tdEditHordeButtons, "input", tdEditHordeInputs[4])
buttonLock(tdEditHordeInputs, tdEditHordeButtons, "input", tdEditHordeInputs[5])
buttonLock(tdEditHordeInputs, tdEditHordeButtons, "click", ".td-addVariations")
buttonLock(tdEditHordeInputs, tdEditHordeButtons, "click", ".td-cross-variations")
buttonLock(tdEditHordeInputs, tdEditHordeButtons, "click", ".td-add-unit")
buttonLock(tdEditHordeInputs, tdEditHordeButtons, "click", ".td-autofill")

$(document).on('click', '.td-create-horde', function() {
    var wave = $(this).closest('.container').find('.h2').text()
    var label = wave+" | Отряд №#"
    editHordeTowerDefence()
    $('.container-configuration').attr('data-nav-text', label)
    $('.container-configuration').attr('data-nav-index', $(this).parent().index()-1)
    $('.td-addVariations').trigger('click')
    navigation("#td-configuration", "#td-editHorde", label)
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