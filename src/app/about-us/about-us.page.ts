import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  year = new Date().getFullYear();
  constructor(public modalCtrl: ModalController, navparam:NavParams) { 


   }

  ngOnInit() {
  }
  async closeModal() {
    let status='close';
    this.modalCtrl.dismiss(status);
}
}
