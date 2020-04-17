import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List";


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public dataService: GroceriesServiceProvider, public alertCtrl: AlertController, public socialSharing: SocialSharing) {

  }

  loadItems(){
    return this.dataService.getItems();
  }

  removeItem(item, index){
    console.log("Removing Item: ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + item.name,
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(index);
  }

  shareItem(item, index){
    console.log("Sharing Item: ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + item.name,
      duration: 3000
    });
    toast.present();
    let message = "Grocery Item - Name :" + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!")
    }).catch(() => {
      // Sharing via email is not possible
      console.log("Error while sharing");
      console.error();
    });
  }

  editItem(item, index){
    console.log("Edit Item: ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + item.name,
      duration: 3000
    });
    toast.present();

    console.log("Editing item: ", item);
    this.showEditItemPrompt(item, index);
    
  }

  addItem(){
    console.log("Adding new item")
    this.showAddItemPrompt();

  }

  
  showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: "Enter the name and quantity of the item you're adding",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
        {
          name: 'blurb',
          placeholder: 'Notes etc. (optional)'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancelled add item');
          }
        },
        {
          text: 'Add',
          handler: item => {
            console.log('Add clicked for', item);
            item.image = 'assets/imgs/customitem.jpg';
            this.dataService.addItem(item);
          }
        }
      ]
    });
    prompt.present();
  }


  showEditItemPrompt(item, index) {
    //save previousImage as the item's image (moved over after inputs take place)
    var previousImage = item.image
    const prompt = this.alertCtrl.create({
      title: 'Edit Item',
      message: "Enter edit name and quantity of the item",
      inputs: [
        {
          name: 'name',
          value: item.name
          
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity
        },
        {
          name: 'blurb',
          placeholder: 'Notes etc. (optional)',
          value: item.blurb
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancelled add item');
          }
        },
        {
          text: 'Save',
          handler: item => {
            //add a line here so that our image doesn't change when we edit an item 
            item.image = previousImage;
            console.log('Save clicked for', item);
            this.dataService.editItem(item, index);
            
          }
        }
      ]
    });
    prompt.present();
  }

  markDone(item){
    console.log('Marked bought for', item.name)
    item.image= 'assets/imgs/checkbox.jpg'
    const toast = this.toastCtrl.create({
      message: 'Marked complete - ' + item.name,
      duration: 3000
    });
    toast.present();
    
  }

  collapse(slidingItem: ItemSliding){
    slidingItem.close();
  }

}







