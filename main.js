let proizvodi = '';

const ucitajProizvode = () => {
    fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll')
    .then(res => {
        if (!res.ok) {
            throw Error('Desila se greska prilikom fetchanja');
        }

        return res.json();
    })
    .then (data => {
        let cards = '';
        let tabela = document.querySelector('#tabela');

        proizvodi = data;

        data.forEach(element => {
            cards += `
                <tr>
                    <td>${element.proizvodID}</td>
                    <td>${element.naziv}</td>
                    <td><button onclick="prikaziDetalje(${element.proizvodID})">Detalji</button></td>
                </tr>
            `;
        })

        tabela.innerHTML += cards;
    })
}

const prikaziDetalje = (ID) => {
    let temp = proizvodi.find(x => x.proizvodID === ID);

    document.querySelector('#slika').src = `${temp.slikaUrl}`;
    document.querySelector('#cijena').innerHTML = `${temp.cijenaPoKvadratu} KM`;
    document.querySelector('#razlikaucijeni').setAttribute('onclick', `izracunajRazliku(${temp.cijenaPoKvadratu})`);
    document.querySelector('#lajkovi').setAttribute('onclick', 'prikaziLajkove()');
}    

const izracunajRazliku = (cijenaTrenutna) => {
    let temp = 0;
    for (let i = 0; i < proizvodi.length; i++) {
        if (temp < proizvodi[i].cijenaPoKvadratu) {
            temp = proizvodi[i].cijenaPoKvadratu;
        }
    }

    let razlika = temp - cijenaTrenutna;

    if (cijenaTrenutna > temp) {
        razlika = cijenaTrenutna - temp;
    }

    document.querySelector('#razlikaCijena').innerHTML = razlika + 'KM';
}

const prikaziLajkove = () => {
    let temp = '';
    for (let i = 0; i < proizvodi.length; i++) {
        if (temp < proizvodi[i].likeCounter) {
            temp = proizvodi[i];
        }
    }

    document.querySelector('#zaLajkove').innerHTML = `Proizvod sa ID-em ${temp.proizvodID} ima najvise lajkova: ${temp.likeCounter}`;
}