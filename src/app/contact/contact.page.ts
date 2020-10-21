import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})


export class ContactPage implements OnInit {
model:any = {nome:'',email:'', descricao:''};
year = new Date().getFullYear();
  constructor(public toastController: ToastController,public modalCtrl: ModalController) {
    this.model.nome='';
    this.model.email='';
    this.model.descricao='';
   }
   async closeModal() {
    let status='close';
    this.modalCtrl.dismiss(status);
}


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Contato enviado com sucesso! Aguarde nosso retorno',
      
      position: 'top',
      duration: 2000,
      buttons: [
        {
          side: 'start',
          icon: 'checkmark',
          text: '',
          
        }]
    });
    toast.present();
  }


enviar(){
  this.presentToast();
}
  ngOnInit() {
  }

}
