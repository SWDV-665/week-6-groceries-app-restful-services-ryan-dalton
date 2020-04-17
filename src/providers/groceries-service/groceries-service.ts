//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  items = [
    {
      name: "Toilet Paper",
      quantity: "100",
      blurb: "You don't want to run out of this.",
      image: "assets/imgs/tp.jpg"

    },
    {
      name: "Water Bottles",
      quantity: "200",
      blurb: "Great on a hot day.",
      image: "assets/imgs/bottle.jpg"

    },
    {
      name: "Tylenol",
      quantity: "10",
      blurb: "Keeps the fever down.",
      image: "assets/imgs/medicine.jpg"

    }
  ]


  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController) {
    console.log('GroceriesServiceProvider Provider Started');
  }



  removeItem(index){
    this.items.splice(index, 1);
  }

  shareItem(index){
    this.items.splice(index, 1);
  }

  addItem(item) {
      this.items.push(item);
    }
  
  editItem(item, index) {
    this.items[index] = item;

  }

  getItems() {
    return this.items;
  }

  }



