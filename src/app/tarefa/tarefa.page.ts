import { Component, OnInit } from '@angular/core';
import { Tarefas,ProviderService,TarefasList } from '../provider.service';
import { NavController, NavParams,ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.page.html',
  styleUrls: ['./tarefa.page.scss'],
})
export class TarefaPage implements OnInit {
  tarefa: any;
  id: any;
  itemsall: any[]=[];
  year = new Date().getFullYear();
  tarefas: TarefasList[] ;
  listItem: any[]=[];
  constructor(   public navCtrl: NavController,  private route: ActivatedRoute,private toastController: ToastController, public servidor : ProviderService){
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ionViewDidEnter() {
    this.servidor.getById(this.id)
      .then((result) => {
        this.tarefa = result;
        this.servidor.getAllItem()
        .then((result2) => {
          this.itemsall = result2;
          this.tarefa[0].tarefa.itens.forEach(itemT => {
            this.itemsall.forEach(itemA => {
              if(itemT==itemA.keyI){
                this.listItem.push(itemA);
              }
            })
          });


        });

       
       







      });
  }
  ngOnInit() {
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
  removeTarefa(item: TarefasList) {
    this.servidor.remove(item.key)
      .then(() => {
        var index = this.tarefa.indexOf(item);
        this.tarefa.splice(index, 1);
        this.presentToast('Tarefa removida com sucesso!');
        this.navCtrl.navigateForward('list');
      })
  }
  edit(item: TarefasList){
    let id=item.key;
    this.navCtrl.navigateForward('list-edit/'+id);

}
}
