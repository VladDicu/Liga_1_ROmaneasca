
function schimbaCuloare() {
    document.getElementById('main').style.backgroundColor = "#ffcc00"; 
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
    
    let pBefore = document.createElement("p");
    pBefore.innerText = "Acum am pregatit un X si O mai iesit din tipar.";
    tabel.parentNode.insertBefore(pBefore, tabel);

    let pAfter = document.createElement("p");
    pAfter.innerText = "Poti sa rezolvi?";
    tabel.parentNode.insertBefore(pAfter, tabel.nextSibling);
}

function inregistrare() {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    if(user && pass) {
        localStorage.setItem('user', user);
        localStorage.setItem('pass', pass);
        alert("Inregistrare reusita!");
    }
}

function autentificare() {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    
    if (user === localStorage.getItem('user') && pass === localStorage.getItem('pass')) {
        document.getElementById('mesaj-login').innerText = "Bun venit, " + user + "!";
        document.getElementById('mesaj-login').style.color = "green";
    } else {
        document.getElementById('mesaj-login').innerText = "Eroare: Ne pare rau, dar datele sunt incorecte.";
        document.getElementById('mesaj-login').style.color = "red";
    }
}

let jucatorCurent = 'X';

let bazaDeDate = [];
fetch('db/jucatori.json') 
    .then(response => response.json())
    .then(data => bazaDeDate = data)
    .catch(err => console.log("Eroare incarcare JSON: ", err));

function joaca(celula, echipa1, echipa2) {
    if (celula.innerText !== "") return;

    let nume = prompt(`Jucator ${jucatorCurent}: Numeste un fotbalist care a jucat la ${echipa1} si ${echipa2}:`);

    if (nume) {
        let valid = bazaDeDate.some(item => {
            let perecheCorecta = (item.cheie === `${echipa1}-${echipa2}` || item.cheie === `${echipa2}-${echipa1}`);
            let numeCorect = item.jucator.toLowerCase() === nume.toLowerCase();
            return perecheCorecta && numeCorect;
        });

        if (valid) {
            celula.innerText = jucatorCurent;
            celula.style.color = jucatorCurent === 'X' ? 'red' : 'blue';
            jucatorCurent = jucatorCurent === 'X' ? 'O' : 'X';
            document.getElementById('jucator-curent').innerText = "Randul lui: " + jucatorCurent;
        } else {
            alert("Gresit! Jucatorul nu este in baza de date sau nu a jucat la aceste echipe.");
        }
    }

}

