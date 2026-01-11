function schimbaCuloare() {
    const mainDiv = document.getElementById('main');
    if (mainDiv) {
        mainDiv.style.backgroundColor = "#ffcc00";
    }
}

const imgEfect = document.getElementById('img-efect');
if (imgEfect) {
    imgEfect.addEventListener('mouseover', () => {
        imgEfect.style.filter = "grayscale(100%)";
    });
    imgEfect.addEventListener('mouseout', () => {
        imgEfect.style.filter = "none";
    });
}

if (window.location.href.includes("pagina2.html")) {
    const tabel = document.getElementById('tabel-joc');
    if (tabel) {
        let pBefore = document.createElement("p");
        pBefore.innerText = "Acum am pregatit un X si O mai iesit din tipar.";
        tabel.parentNode.insertBefore(pBefore, tabel);

        let pAfter = document.createElement("p");
        pAfter.innerText = "Poti sa rezolvi?";
        tabel.parentNode.insertBefore(pAfter, tabel.nextSibling);
    }
}

function inregistrare() {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    if(user && pass) {
        localStorage.setItem('user', user);
        localStorage.setItem('pass', pass);
        alert("Inregistrare reusita!");
    } else {
        alert("Completeaza ambele campuri!");
    }
}

function autentificare() {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let storedUser = localStorage.getItem('user');
    let storedPass = localStorage.getItem('pass');
    const mesajElement = document.getElementById('mesaj-login');

    if (user === storedUser && pass === storedPass) {
        mesajElement.innerText = "Bun venit, " + user + "!";
        mesajElement.style.color = "green";
    } else {
        mesajElement.innerText = "Eroare: Ne pare rau, dar datele sunt incorecte.";
        mesajElement.style.color = "red";
    }
}

let jucatorCurent = 'X';
let bazaDeDate = [];

fetch('DB/jucatori.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Eroare HTTP");
        }
        return response.json();
    })
    .then(data => {
        bazaDeDate = data;
        console.log(bazaDeDate);
    })
    .catch(err => console.log(err));

function joaca(celula, echipa1, echipa2) {
    if (celula.innerText !== "") {
        alert("Aceasta casuta este deja ocupata!");
        return;
    }

    if (bazaDeDate.length === 0) {
        alert("Baza de date cu jucatori nu s-a incarcat inca sau este goala!");
        return;
    }

    let nume = prompt(`Jucator ${jucatorCurent}: Numeste un fotbalist care a jucat la ${echipa1} si ${echipa2}:`);

    if (nume) {
        let valid = bazaDeDate.some(item => {
            let perecheCorecta = (item.cheie === `${echipa1}-${echipa2}` || item.cheie === `${echipa2}-${echipa1}`);
            let numeCorect = item.jucator.trim().toLowerCase() === nume.trim().toLowerCase();
            return perecheCorecta && numeCorect;
        });

        if (valid) {
            celula.innerText = jucatorCurent;
            celula.style.color = jucatorCurent === 'X' ? 'red' : 'blue';
            jucatorCurent = jucatorCurent === 'X' ? 'O' : 'X';
            const statusElement = document.getElementById('jucator-curent');
            if (statusElement) {
                statusElement.innerText = "Randul lui: " + jucatorCurent;
            }
        } else {
            alert("Gresit! Jucatorul nu este in baza de date sau nu a jucat la aceste echipe.");
        }
    }
}
