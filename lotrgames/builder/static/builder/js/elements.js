function customCheckbox(parent, id, text){
    var div1 = $('<div>', {'class': 'customCheckBoxHolder'})
    var input = $('<input>', {'class': 'customCheckBoxInput', 'id': id, 'type': 'checkbox'})
    var label = $('<label>', {'class': 'customCheckBoxWrapper', 'for': id})
    var div2 = $('<div>', {'class': 'customCheckBox'})
    var div3 = $('<div>', {'class': 'inner'})
    parent.append(div1)
    div1.append(input)
    div1.append(label)
    label.append(div2)
    div2.append(div3)
    div3.text(text)
}

function numericInput(selector, text){
    $(document).on('click', selector, function() {
        $(this).val('')
    });
    $(document).on('change', selector, function() {
        $(this).val(text + ": " + $(this).val())
    });
    $(document).on('input', selector, function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });
}

function deletingFields(selector, value, text) {
    $(document).on('click', selector, function() {
        $(this).closest('.container').remove()
        var count = Number($(value).val().split(':')[1]) - 1
        $(value).val(text + ": " + count)
    });
}