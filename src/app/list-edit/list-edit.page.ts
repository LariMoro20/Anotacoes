import { Component, OnInit   } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Tarefas,ProviderService,TarefasList } from '../provider.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.page.html',
  styleUrls: ['./list-edit.page.scss'],
})
export class ListEditPage implements OnInit {
  model: Tarefas;
  tarefa: any;
  year = new Date().getFullYear();
  id: any;
  itemsall: any[]=[];
  itens:number[]=[];
  listItem: any[]=[];
  idf:number=0;
  key:number;
  id2: number=0;
  type:1;
  dados:Tarefas;
  tarefas: TarefasList[] ;
  constructor(public toastController: ToastController,public navCtrl: NavController, private route: ActivatedRoute, public servidor : ProviderService, private modalctr : ModalController){

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tarefa editada com sucesso!',
      
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
  ionViewDidEnter() {
    this.itens=[];
    this.id = this.route.snapshot.paramMap.get('id');
    this.model = new Tarefas();
    this.servidor.getById(this.id)
      .then((result) => {
        this.model.titulo =result[0]['tarefa'].titulo;
        this.model.descricao =result[0]['tarefa'].descricao;
        this.model.datas =new Date(result[0]['tarefa'].datas).toString();
        this.model.imagem =result[0]['tarefa'].imagem;
        this.model.itens =[];
        this.tarefa =result;
        
        this.servidor.getAllItem()
        .then((result2) => {
          this.itemsall = result2;
          this.tarefa[0].tarefa.itens.forEach(itemT => {
            this.itemsall.forEach(itemA => {
              if(itemT==itemA.keyI){
                this.listItem.push(itemA);
                itemA.isChecked=true;
              }
            })
          });
          this.id2++;
          this.itemsall.sort(function(a2,b2){
        
            return b2.tituloI - a2.tituloI;
          });
        });
      });
  }

  verifyEvent(id:number){

    this.itemsall.forEach(element => {
      if(element.keyI==""+id){
      if(element.isChecked==false){
        let pos=this.itens.indexOf(id);
          if(pos>-1){
            this.itens.splice(pos,1);
            element.isChecked==false;
          }
      }else if(element.isChecked==true){
        this.itens.push(id);
      }else{
        console.log('Erro');
      }
      }
 
    });
  }


  
  save() {
    this.updateTarefa()
      .then(() => {
        this.presentToast();
        this.navCtrl.navigateForward('list');
        
      })
      .catch(() => {

        
      });
  }
 
  private updateTarefa() {
    this.model.itens=[];
    this.model.itens=this.itens;
    this.model.datas=moment(this.model.datas).format("DD/MM/YYYY");

      return this.servidor.update(this.id, this.model);
   
  }

  ngOnInit() {
  }

}
