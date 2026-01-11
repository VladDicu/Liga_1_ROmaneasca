function schimbaCuloare() {
    const mainDiv = document.getElementById('main');
    if (mainDiv) {
        mainDiv.style.backgroundColor = "#ffcc00";
    }
}

// Efect imagine alb-negru
const imgEfect = document.getElementById('img-efect');
if (imgEfect) {
    imgEfect.addEventListener('mouseover', () => {
        imgEfect.style.filter = "grayscale(100%)";
    });
    imgEfect.addEventListener('mouseout', () => {
        imgEfect.style.filter = "none";
    });
}

// Adaugare paragrafe dinamice pe pagina 2
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

// Login - Inregistrare
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

// Login - Autentificare
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

// --- LOGICA JOCULUI ---
let jucatorCurent = 'X';
let bazaDeDate = [];

// Aici verificam folderul DB (scris cu majuscule conform cerintei tale)
fetch('DB/jucatori.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Nu am putut gasi fisierul JSON (Verifica daca folderul se numeste exact DB pe GitHub!)");
        }
        return response.json();
    })
    .then(data => {
        bazaDeDate = data;
        console.log("Date incarcate cu succes:", bazaDeDate);
    })
    .catch(err => console.log("Eroare incarcare JSON: ", err));

function joaca(celula, echipa1, echipa2) {
    // Daca celula e deja ocupata, nu facem nimic
    if (celula.innerText !== "") {
        alert("Aceasta casuta este deja ocupata!");
        return;
    }

    // Verificam daca baza de date s-a incarcat
    if (bazaDeDate.length === 0) {
        alert("Baza de date cu jucatori nu s-a incarcat inca sau este goala!");
        return;
    }

    let nume = prompt(`Jucator ${jucatorCurent}: Numeste un fotbalist care a jucat la ${echipa1} si ${echipa2}:`);

    if (nume) {
        // Cautam in baza de date
        let valid = bazaDeDate.some(item => {
            // Verificam cheia (ex: "FCSB-Dinamo" sau "Dinamo-FCSB")
            let perecheCorecta = (item.cheie === `${echipa1}-${echipa2}` || item.cheie === `${echipa2}-${echipa1}`);
            // Verificam numele (ignoram literele mari/mici)
            let numeCorect = item.jucator.trim().toLowerCase() === nume.trim().toLowerCase();
            return perecheCorecta && numeCorect;
        });

        if (valid) {
            celula.innerText = jucatorCurent;
            celula.style.color = jucatorCurent === 'X' ? 'red' : 'blue';
            
            // Schimbam tura
            jucatorCurent = jucatorCurent === 'X' ? 'O' : 'X';
            
            // Actualizam textul de pe ecran (daca exista elementul)
            const statusElement = document.getElementById('jucator-curent');
            if (statusElement) {
                statusElement.innerText = "Randul lui: " + jucatorCurent;
            }
        } else {
            alert("Gresit! Jucatorul nu este in baza de date sau nu a jucat la aceste echipe.");
        }
    }
}
