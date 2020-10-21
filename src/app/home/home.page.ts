import { Component } from '@angular/core';
import { AboutUsPage } from '../about-us/about-us.page';
import { ModalController } from '@ionic/angular';
import { ContactPage } from '../contact/contact.page';
import { NavController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( public navCtrl: NavController, private modalctr : ModalController) { }

  year = new Date().getFullYear();
  async  showModalAbout(){
    let modal= await this.modalctr.create({
      component: AboutUsPage
    });
    return await modal.present();
  }

  async  showModalContact(){
    let modal= await this.modalctr.create({
      component: ContactPage
    });
    return await modal.present();
  }
  add(){
    this.navCtrl.navigateForward('list-manager');
  }
}
