import { Component, OnInit } from '@angular/core';
import { Item,ProviderService,ItemList } from '../provider.service';
import { Routes, RouterModule } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.page.html',
  styleUrls: ['./item-add.page.scss'],
})
export class ItemAddPage implements OnInit {
  model: Item;
  momentjs: any = moment;
  keyI: number;
  year = new Date().getFullYear();
  itemsall: any;
  posts: any;
  id: number=0;
  item: any;
  constructor(private route: ActivatedRoute,
    public navCtrl: NavController, 
    public router: RouterModule,
    private providerService: ProviderService,
    public loadingController: LoadingController,
    private toastController: ToastController) {
      this.model = new Item();

    }

    ionViewDidEnter() {

      

      this.providerService.getAllItem()
        .then((result) => {
          this.id=0;
          this.itemsall = result;
          this.itemsall.forEach(element => {
            if(this.id<parseFloat(element.keyI)){
            this.id=parseFloat(element.keyI);
            
            }
          });


          this.providerService.getAllNum()
          .then((result) => {
            this.id=result+1;
           
          })
          this.id++;
        });
        this.itemsall.sort(function(a,b){
          return b.tituloI - a.tituloI;
        });
    }



    async presentLoading(msg:string) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: msg,
        spinner:'circular',
        duration: 2000
      });
      await loading.present().then(() => {
        setTimeout(function(){ location.reload(); }, 3000);
        
      })
    }



    async presentToast(msg:string) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000,
        position: 'top',
        buttons: [
          {
            side: 'start',
            icon: 'checkmark',
            text: '',
            
          }]
      });
      toast.present();
    }

    removeTarefa(item: ItemList) {
      this.providerService.removeItem(item.keyI)
        .then(() => {
          var index = this.itemsall.indexOf(item);
          this.itemsall.splice(index, 1);
          this.presentToast('Item removido com sucesso!');
        })
    }

    save() {
      this.saveItem()
        .then(() => {
          this.presentLoading('Item adicionado com sucesso! \n Atualizando a pagina..');
          //this.navCtrl.navigateForward('/home');
          
        
        })
        .catch(() => {
          this.presentToast('Erro!');
        });
    }

    private saveItem() {
        return this.providerService.insertItem(this.keyI,this.model);
     
    }


  ngOnInit() {
  }

}
