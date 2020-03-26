var inlogPagina = document.getElementById("inlogPagina")
// var registreerPagina = document.getElementById("registreerPagina")

inlogPagina.style.display = 'block'
registreerPagina.style.display = 'none'

fucntion changePage() {
    if (inlogpagina.style.display == 'none') {
        inlogPagina.style.display = 'block'
        registreerPagina.style.display = 'none'
    } else if (inlogpagina.style.display == 'block') {
        inlogPagina.style.display = 'none'
        registreerPagina.style.display = 'block'
    }
}