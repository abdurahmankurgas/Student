var containerDiv = null;

// Funkcija koja ce se okinuti kada se prozor naseg browsera
// potpuno ucita.
// Ovo radimo da bi mogli doci do elementa sa id-jem 'textContainer'
// koji ce nam biti dostupan tek kada se ucita HTML dio aplikacije.
window.onload = function () {

  // Ovim dobavljamo HTML element naseg containera u kojem
  // cemo prikazati sve podatke.
  containerDiv = document.getElementById('textContainer');

  // Koristenjem fetch metode pravimo request za dobavljanje podataka
  // sa prilozenog URL-a koji smo ubacili kao parametar.
  // Posto fetch metoda vraca promise, koristicemo jedan od pristupa za hendlanje promisa a to je
  // .then. Time omogucavamo pristup response objektu naseg requesta odnosno u ovom slucaju
  // tekstualnim podacima sa ovom URL-a.
  fetch('https://v-dresevic.github.io/Advanced-JavaScript-Programming/data/students.txt')

    // Prvi handler ce nam vratiti response.Text()
    .then(response => response.text())
    // Drugi handler ce taj isti tekst poslati u metodu textSplitter i vratiti nam array.
    .then(text => textSplitter(text))
    // Posljednji handler ce pozvati funkciju displayStudents sa arrayom koji smo dobili.
    .then(students => displayStudents(students))
    // Ako je request fail-ao, ispisat cemo error u konzoli.
    .catch(error => console.log(error))
};

// Funkcija pomocu koje cemo modifikovati tekst tako da dobijemo
// zeljeni niz student objekata.
function textSplitter(textObj) {

  // Razdvajamo tekst po elementu novog reda odn. \n
  // Svaki novi red ce biti jedan element u nizu splittedTextArray.
  var splittedTextArray = textObj.split('\n');

  var studentsArray = [];

  // Iteraciju kroz prethodno kreirani array vrsimo pomocu for petlje
  // uz to da necemo povecavati brojac za 1 vec za broj redova koliko
  // informacija sadrzi svaki student a to je 4.
  for (i = 0; i < splittedTextArray.length;) {

    // Prilikom svake iteracije, kreiramo novi objekat studenta i dodjeljujemo
    // mu podatke, i dodajemo ga u do sada prazan niz studentsArray.
    studentsArray.push(
      {
        name: splittedTextArray[i],
        address: splittedTextArray[i + 1],
        phone: splittedTextArray[i + 2],
        course: splittedTextArray[i + 3],
      });
    // Brojac ce da nastavi odakle smo stali sa podacima
    // , odnosno od 4-te pozicije u nizu.
    i += 4;
  }

  // Pomocni ispis u konzolu da mozemo biti sigurni da je niz popunjen.
  //console.log(studentsArray);

  return studentsArray;
}

// Funkcija pomocu koje cemo prikazati niz student objekata.
function displayStudents(students) {

  // Iteracija kroz niz studenata
  for (i = 0; i < students.length; i++) {

    // Kreiranje paragrafa koji ce da sadrze tekst svakog polja studenta.
    var nameParagraph = document.createElement("p");
    var addressParagraph = document.createElement("p");
    var phoneParagraph = document.createElement("p");
    var courseParagraph = document.createElement("p");

    // Kreiranje break elementa da vidno razdvojimo pojedinacne student objekte.
    var breakElement = document.createElement("br");

    // Dodavanje teksta unutar prethodno kreiranih paragrafa i ispisivanje podataka iz niza studenata.
    nameParagraph.appendChild(document.createTextNode("Name: " + students[i].name));
    addressParagraph.appendChild(document.createTextNode("Address: " + students[i].address));
    phoneParagraph.appendChild(document.createTextNode("Phone: " + students[i].phone));
    courseParagraph.appendChild(document.createTextNode("Course: " + students[i].course));

    // Koristenjem appendChild metode dodajemo paragrafe u element "containerDiv"
    // da bi se oni prikazali.
    containerDiv.appendChild(nameParagraph);
    containerDiv.appendChild(addressParagraph);
    containerDiv.appendChild(phoneParagraph);
    containerDiv.appendChild(courseParagraph);
    containerDiv.appendChild(breakElement);
  }
}