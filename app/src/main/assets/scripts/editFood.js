function checkNumber(element) {
    if (parseInt(element.value) > 10) {
        element.value = "10"
    } else if (parseInt(element.value) < 1) {
        element.value = "1"
    } else if (parseInt(element.value) >= 1 && parseInt(element.value) <= 10) {
        return
    } else{
        element.value = ""
    }
}