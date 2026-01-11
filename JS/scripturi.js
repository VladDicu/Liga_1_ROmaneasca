// Test sa vedem daca scriptul a pornit
console.log("Scriptul a pornit cu succes!");

function schimbaCuloare() {
    var mainDiv = document.getElementById('main');
    if (mainDiv) {
        mainDiv.style.backgroundColor = "#ffcc00";
    }
}

// Efect imagine alb-negru
var imgEfect = document.getElementById('img-efect');
if (imgEfect) {
    imgEfect.addEventListener('mouseover', function() {
        imgEfect.style.filter = "grayscale(100%)";
    });
    imgEfect.addEventListener('mouseout', function() {
        imgEfect.style.filter = "none";
    });
}

// Adaugare paragrafe pagina 2
if (window.location.href.indexOf("pagina2.html") > -1) {
    var tabel = document.getElementById('tabel-joc');
    if (tabel) {
        var pBefore = document.createElement("p");
        pBefore.innerText = "Acum am pregatit un X si O mai iesit din tipar.";
        tabel.parentNode.insertBefore(pBefore, tabel);

        var pAfter = document.createElement("p");
        pAfter.innerText = "Poti sa rezolvi?";
        tabel.parentNode.insertBefore(pAfter, tabel.nextSibling);
    }
}

// Login
function inregistrare() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    if(user && pass) {
        localStorage.setItem('user', user);
        localStorage.setItem('pass', pass);
        alert("Inregistrare reusita!");
    } else {
        alert("Completeaza ambele campuri!");
    }
}

function autentificare() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    var storedUser = localStorage.getItem('user');
    var storedPass = localStorage.getItem('pass');
    var mesajElement = document.getElementById('mesaj-login');

    if (user === storedUser && pass === storedPass) {
        mesajElement.innerText = "Bun venit, " + user + "!";
        mesajElement.style.color = "green";
    } else {
        mesajElement.innerText = "Eroare date incorecte.";
        mesajElement.style.color = "red";
    }
}

// JOCUL
var jucatorCurent = 'X';
var bazaDeDate = [];

// ATENTIE: Verifica daca folderul tau pe GitHub este 'DB' sau 'db'
fetch('DB/jucatori.json')
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Nu gasesc fisierul JSON. Verifica numele folderului DB/db!");
        }
        return response.json();
    })
    .then(function(data) {
        bazaDeDate = data;
        console.log("Date incarcate:", bazaDeDate);
    })
    .catch(function(err) {
        console.log("Eroare incarcare:", err);
    });

function joaca(celula, echipa1, echipa2) {
    if (celula.innerText !== "") {
        alert("Ocupat!");
        return;
    }
    if (bazaDeDate.length === 0) {
        alert("Baza de date nu s-a incarcat! Verifica consola (F12) pentru erori.");
        return;
    }

    var nume = prompt("Jucator " + jucatorCurent + ": Cine a jucat la " + echipa1 + " si " + echipa2 + "?");

    if (nume) {
        var valid = false;
        // Cautam manual pentru compatibilitate maxima
        for (var i = 0; i < bazaDeDate.length; i++) {
            var item = bazaDeDate[i];
            var key1 = echipa1 + "-" + echipa2;
            var key2 = echipa2 + "-" + echipa1;
            
            if (item.cheie === key1 || item.cheie === key2) {
                if (item.jucator.trim().toLowerCase() === nume.trim().toLowerCase()) {
                    valid = true;
                    break;
                }
            }
        }

        if (valid) {
            celula.innerText = jucatorCurent;
            celula.style.color = (jucatorCurent === 'X') ? 'red' : 'blue';
            jucatorCurent = (jucatorCurent === 'X') ? 'O' : 'X';
        } else {
            alert("Gresit sau jucatorul nu e in lista!");
        }
    }
}
