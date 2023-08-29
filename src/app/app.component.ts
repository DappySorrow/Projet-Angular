/*----------------------------------------------
// Fichier: app.component.ts
// Développeur: Jean-Simon Barbeau
// Date: 2022-09-28
// Fonction: La logique en arrière
----------------------------------------------*/

//-------------------------------------------
//Les imports
//-------------------------------------------
import { Component } from '@angular/core';
import { MinLengthValidator } from '@angular/forms';

//-------------------------------------------
//Les emplacements
//-------------------------------------------
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//-------------------------------------------
// Les variables
//-------------------------------------------
export class AppComponent {
  title = 'TP1';
  longueurMax: number = 17;
  longueurDistribution: number = 0;
  indexActuel: number = 0;
  message: string = "La citation rentrée ne correspond pas aux critères d'exigence: \n \n -La présence de caractères accentués ou diacritiques n’est pas permise (on ne prend queles ASCII < 128) ; \n -S’il y a deux (ou plus) séparateurs de mot consécutifs, on n’en affiche qu’un dans lagrille; \n -La longueur maximale d’une citation est de 100 caractères; \n -La longueur minimale est de 35; \n -Une infraction aux règles précédentes entrainera le rejet de la ligne;";
  case1: number = 34;
  case2: number = 51;
  case3: number = 68;
  case4: number = 85;

  visible: boolean = false;
  reponse: boolean = false;
  ASCII: Boolean | null | undefined = null;
  citation: string = "";

  citationArray: Array<string> = [];
  binaireArray: Array<boolean> = [];
  newBinaireArray: Array<boolean> = [];
  clearCitationArray: Array<string> = [];
  citationChar: Array<string> = []

  oldElement: Boolean | null | undefined = null;
  firstBlank: Boolean | null | undefined = null;

  grilleInf1: Array<boolean> = [];
  grilleInf2: Array<boolean> = [];
  grilleInf3: Array<boolean> = [];
  grilleInf4: Array<boolean> = [];
  grilleInf5: Array<boolean> = [];
  grilleInf6: Array<boolean> = [];

  grilleSup1: Array<string> = [];
  grilleSup2: Array<string> = [];
  grilleSup3: Array<string> = [];
  grilleSup4: Array<string> = [];
  grilleSup5: Array<string> = [];
  grilleSup6: Array<string> = [];

  L1: Array<string> = [];
  L2: Array<string> = [];
  L3: Array<string> = [];
  L4: Array<string> = [];
  L5: Array<string> = [];
  L6: Array<string> = [];

  mixer: Array<string> = [];


  //-------------------------------------------
  //code tiré de stackoverflow: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  //Sert à mélanger un array
  //------------------------------------------- 
  shuffle(array: Array<string>) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  
  //-------------------------------------------
  //code tiré de stackoverflow: https://stackoverflow.com/questions/14313183/javascript-regex-how-do-i-check-if-the-string-is-ascii-only
  //Sert à valider que le code est bien du ASCII
  //-------------------------------------------
  isASCII(str: string) {
    return /^[\x00-\x7F]*$/.test(str);
  }

  //-------------------------------------------
  //Sert à regarder la citation et à valider que celle-ci est convenable
  //-------------------------------------------
  regarderCitation() {
    this.ASCII = this.isASCII(this.citation);

    if (this.citation.length >= 35 && this.ASCII === true) {
      this.visible = true;
      this.citationArray = this.citation.split('')

      //------------------------------------------------------------------

      //Pour inférieure
      this.citationArray.forEach(char => {
        if (char === " " || char === "," || char === "'" || char == "-" || char === ";" || char === ":" || char === "." || char === "!" || char === "?" || char === "/"
          || char === "*" || char === "¸" || char === "~" || char === "`" || char === "\\" || char === "^" || char === "@" || char === "\"" || char === "%" || char === "#"
          || char === "(" || char === ")" || char === "-" || char === "_" || char === "=" || char === "+" || char === "" || char === "¯" || char === "<" || char === ">"
          || char === "{" || char === "}" || char === "[" || char === "]" || char === "~" || char == "'") {
          this.binaireArray.push(false);
        }
        else {
          this.binaireArray.push(true);
        }
      });

      this.binaireArray.forEach(element => {
        if (element === false && this.oldElement === false) {
        }
        else {
          this.newBinaireArray.push(element)
        }
        this.oldElement = element;
      });

      //------------------------------------------------------------------

      //Pour supérieure
      this.citationArray.forEach(char => {
        if (char === " " || char === "," || char === "'" || char == "-" || char === ";" || char === ":" || char === "." || char === "!" || char === "?" || char === "/"
          || char === "*" || char === "¸" || char === "~" || char === "`" || char === "\\" || char === "^" || char === "@" || char === "\"" || char === "%" || char === "#"
          || char === "(" || char === ")" || char === "-" || char === "_" || char === "=" || char === "+" || char === "" || char === "¯" || char === "<" || char === ">"
          || char === "{" || char === "}" || char === "[" || char === "]" || char === "~" || char == "'") {

          if (this.firstBlank === null || this.firstBlank === true) {
            this.clearCitationArray.push(" ")
            this.firstBlank = false;
          }
        }
        else {
          this.clearCitationArray.push(char.toUpperCase())
          this.firstBlank = true;
        }
      });

      //------------------------------------------------------------------

      //Construire les grilles 
      if (this.newBinaireArray.length >= 35) {
        this.grilleInferieure();
        this.grilleSuperieure();
      }
      else {
        alert(this.message)
        this.recommencer();
      }

    }
    else {
      alert(this.message)
      this.recommencer();
    }
  }

  //-------------------------------------------
  //Sert pour la grille du haut, la grille mélangée
  //-------------------------------------------
  grilleSuperieure() {

    //Citation ordonnée
    for (let index = 0; index < this.clearCitationArray.length; index++) {
      if (index <= 16) {
        this.L1.push(this.clearCitationArray[index]);
      }
      if (index >= 17 && index <= 33) {
        this.L2.push(this.clearCitationArray[index]);
      }
      if (index >= 34 && index <= 50) {
        this.L3.push(this.clearCitationArray[index]);
      }
      if (index >= 51 && index <= 67) {
        this.L4.push(this.clearCitationArray[index]);
      }
      if (index >= 68 && index <= 84) {
        this.L5.push(this.clearCitationArray[index]);
      }
      if (index >= 85) {
        this.L6.push(this.clearCitationArray[index]);
      }
    }

    //----------------------------------------------------------------------------

    //Pendant combien de temps il y a une distribution dans les colonnes
    this.longueurDistribution = this.clearCitationArray.length;
    //Distribution aux colonnes 1, 2 et 3
    if (this.clearCitationArray.length <= 51) {
      this.longueurDistribution = this.longueurDistribution - this.case1

      for (let index = 0; index < this.longueurDistribution; index++) {
        this.indexActuel = index;

        this.mixer.push(this.L1[index]);
        this.mixer.push(this.L2[index]);
        this.mixer.push(this.L3[index]);

        this.shuffle(this.mixer)

        this.grilleSup1.push(this.mixer[0]);
        this.grilleSup2.push(this.mixer[1]);
        this.grilleSup3.push(this.mixer[2]);

        this.mixer = [];
      }

      //Pour poursuivre où nous étions
      this.indexActuel = this.indexActuel + 1;

      for (let index = this.indexActuel; index < this.longueurMax; index++) {
        this.mixer.push(this.L1[index]);
        this.mixer.push(this.L2[index]);

        this.shuffle(this.mixer)

        this.grilleSup1.push(this.mixer[0]);
        this.grilleSup2.push(this.mixer[1]);

        this.mixer = [];
      }

    }
    if (this.clearCitationArray.length >= 52 && this.clearCitationArray.length <= 68) {
      this.longueurDistribution = this.longueurDistribution - this.case2

      //Distribution aux colonnes 1, 2, 3 et 4 
      for (let index = 0; index < this.longueurDistribution; index++) {
        this.indexActuel = index;

        this.mixer.push(this.L1[index]);
        this.mixer.push(this.L2[index]);
        this.mixer.push(this.L3[index]);
        this.mixer.push(this.L4[index]);

        this.shuffle(this.mixer)

        this.grilleSup1.push(this.mixer[0]);
        this.grilleSup2.push(this.mixer[1]);
        this.grilleSup3.push(this.mixer[2]);
        this.grilleSup4.push(this.mixer[3]);

        this.mixer = [];
      }

      //Pour poursuivre où nous étions
      this.indexActuel = this.indexActuel + 1;

      for (let index = this.indexActuel; index < this.longueurMax; index++) {
        this.mixer.push(this.L1[index]);
        this.mixer.push(this.L2[index]);
        this.mixer.push(this.L3[index]);

        this.shuffle(this.mixer)

        this.grilleSup1.push(this.mixer[0]);
        this.grilleSup2.push(this.mixer[1]);
        this.grilleSup3.push(this.mixer[2]);

        this.mixer = [];
      }

    }
    if (this.clearCitationArray.length >= 69 && this.clearCitationArray.length <= 85) {
      this.longueurDistribution = this.longueurDistribution - this.case3

      //Distribution aux colonnes 1, 2, 3, 4 et 5
      for (let index = 0; index < this.longueurDistribution; index++) {
        this.indexActuel = index;

        this.mixer.push(this.L1[index]);
        this.mixer.push(this.L2[index]);
        this.mixer.push(this.L3[index]);
        this.mixer.push(this.L4[index]);
        this.mixer.push(this.L5[index]);

        this.shuffle(this.mixer)

        this.grilleSup1.push(this.mixer[0]);
        this.grilleSup2.push(this.mixer[1]);
        this.grilleSup3.push(this.mixer[2]);
        this.grilleSup4.push(this.mixer[3]);
        this.grilleSup5.push(this.mixer[4]);

        this.mixer = [];
      }

      //Pour poursuivre où nous étions
      this.indexActuel = this.indexActuel + 1;

      for (let index = this.indexActuel; index < this.longueurMax; index++) {
        this.mixer.push(this.L1[index]);
        this.mixer.push(this.L2[index]);
        this.mixer.push(this.L3[index]);
        this.mixer.push(this.L4[index]);

        this.shuffle(this.mixer)

        this.grilleSup1.push(this.mixer[0]);
        this.grilleSup2.push(this.mixer[1]);
        this.grilleSup3.push(this.mixer[2]);
        this.grilleSup4.push(this.mixer[3]);

        this.mixer = [];
      }

    }
    if (this.clearCitationArray.length >= 86) {
      this.longueurDistribution = this.longueurDistribution - this.case4

      //Distribution aux colonnes 1, 2, 3, 4, 5 et 6
      for (let index = 0; index < this.longueurDistribution; index++) {
        this.indexActuel = index;

        this.mixer.push(this.L1[index]);
        this.mixer.push(this.L2[index]);
        this.mixer.push(this.L3[index]);
        this.mixer.push(this.L4[index]);
        this.mixer.push(this.L5[index]);
        this.mixer.push(this.L6[index]);

        this.shuffle(this.mixer)

        this.grilleSup1.push(this.mixer[0]);
        this.grilleSup2.push(this.mixer[1]);
        this.grilleSup3.push(this.mixer[2]);
        this.grilleSup4.push(this.mixer[3]);
        this.grilleSup5.push(this.mixer[4]);
        this.grilleSup6.push(this.mixer[5]);

        this.mixer = [];
      }

      //Pour poursuivre où nous étions
      this.indexActuel = this.indexActuel + 1;

      for (let index = this.indexActuel; index < this.longueurMax; index++) {
        this.mixer.push(this.L1[index]);
        this.mixer.push(this.L2[index]);
        this.mixer.push(this.L3[index]);
        this.mixer.push(this.L4[index]);
        this.mixer.push(this.L5[index]);

        this.shuffle(this.mixer)

        this.grilleSup1.push(this.mixer[0]);
        this.grilleSup2.push(this.mixer[1]);
        this.grilleSup3.push(this.mixer[2]);
        this.grilleSup4.push(this.mixer[3]);
        this.grilleSup5.push(this.mixer[4]);

        this.mixer = [];
      }

    }
  }

  //-------------------------------------------
  //Sert pour la grille du bas, la grille qui composée de carrés noirs et blancs
  //-------------------------------------------
  grilleInferieure() {
    for (let index = 0; index < this.newBinaireArray.length; index++) {

      if (index <= 16) {
        this.grilleInf1.push(this.newBinaireArray[index]);
      }
      if (index >= 17 && index <= 33) {
        this.grilleInf2.push(this.newBinaireArray[index]);
      }
      if (index >= 34 && index <= 50) {
        this.grilleInf3.push(this.newBinaireArray[index]);
      }
      if (index >= 51 && index <= 67) {
        this.grilleInf4.push(this.newBinaireArray[index]);
      }
      if (index >= 68 && index <= 84) {
        this.grilleInf5.push(this.newBinaireArray[index]);
      }
      if (index >= 85) {
        this.grilleInf6.push(this.newBinaireArray[index]);
      }
    }
  }

  //-------------------------------------------
  //Sert à montrer la citation
  //-------------------------------------------
  voirCitation() {

    this.grilleSup1 = [];
    this.grilleSup2 = [];
    this.grilleSup3 = [];
    this.grilleSup4 = [];
    this.grilleSup5 = [];
    this.grilleSup6 = [];

    for (let index = 0; index < this.clearCitationArray.length; index++) {
      if (index <= 16) {
        this.grilleSup1.push(this.clearCitationArray[index]);
      }
      if (index >= 17 && index <= 33) {
        this.grilleSup2.push(this.clearCitationArray[index]);
      }
      if (index >= 34 && index <= 50) {
        this.grilleSup3.push(this.clearCitationArray[index]);
      }
      if (index >= 51 && index <= 67) {
        this.grilleSup4.push(this.clearCitationArray[index]);
      }
      if (index >= 68 && index <= 84) {
        this.grilleSup5.push(this.clearCitationArray[index]);
      }
      if (index >= 85) {
        this.grilleSup6.push(this.clearCitationArray[index]);
      }
    }

    this.citation = this.citation.toUpperCase();
    this.reponse = true;
  }

  //-------------------------------------------
  //Sert à remettre toutes les varaibles du programme à leur état par défault
  //-------------------------------------------
  recommencer() {
    this.visible = false;
    this.reponse = false;
    this.ASCII = false;
    this.citation = "";

    this.citationArray = [];
    this.binaireArray = [];
    this.newBinaireArray = [];
    this.clearCitationArray = [];

    this.oldElement = null;
    this.firstBlank = null;

    this.grilleInf1 = [];
    this.grilleInf2 = [];
    this.grilleInf3 = [];
    this.grilleInf4 = [];
    this.grilleInf5 = [];
    this.grilleInf6 = [];

    this.grilleSup1 = [];
    this.grilleSup2 = [];
    this.grilleSup3 = [];
    this.grilleSup4 = [];
    this.grilleSup5 = [];
    this.grilleSup6 = [];

    this.L1 = [];
    this.L2 = [];
    this.L3 = [];
    this.L4 = [];
    this.L5 = [];
    this.L6 = [];

    this.mixer = [];
  }

}
