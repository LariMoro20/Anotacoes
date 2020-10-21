import { Component, OnInit } from '@angular/core';
import { Tarefas,ProviderService,TarefasList,Item,ItemList } from '../provider.service';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.page.html',
  styleUrls: ['./list-manager.page.scss'],
})
export class ListManagerPage implements OnInit {
  model: Tarefas;
  momentjs: any = moment;
  key: number;
  tarefasall: any[]=[];
  Checkboxes: any;
  posts: any;
  itens:number[]=[];
  id: number=0;
  year = new Date().getFullYear();
  id2: number=0;
  tarefa: any;
  itemsall: any[]=[];
  constructor(private route: ActivatedRoute,
    public navCtrl: NavController, 
    public router: RouterModule,
    private providerService: ProviderService,
    private toastController: ToastController) {
      this.model = new Tarefas();

    }
    ionViewDidEnter() {
      this.providerService.getAll()
        .then((result) => {
          this.id=0;
          this.tarefasall = result;
          this.tarefasall.forEach(element => {
            if(this.id<parseFloat(element.key)){
              console.log(this.id+" "+element.key);
            this.id=parseFloat(element.key);
            
            }
          });
          this.providerService.getAllItem()
        .then((result2) => {
          this.id2=0;
          this.itemsall = result2;
          this.itemsall.forEach(element2 => {
            if(this.id2<parseFloat(element2.keyI)){
              //console.log(this.id2+" "+element2.keyI);
              this.id2=parseFloat(element2.keyI);
              element2.item.isChecked=false;
              element2.item.keyI=element2.keyI;
            //alert(element2.item.tituloI)
            
            }
          });
          this.id2++;
        });
        this.itemsall.sort(function(a2,b2){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return b2.tituloI - a2.tituloI;
        });
          
        this.providerService.getAllNum()
        .then((result) => {
          this.id=result+1;
          //alert(result);
        })
        

        
        });
        this.tarefasall.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return b.datas - a.datas;
        });

        
         



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
    edit(item: TarefasList){
      let id=item.key;
      this.navCtrl.navigateForward('list-edit/'+id);
  
  }
    removeTarefa(item: TarefasList) {
      this.providerService.remove(item.key)
        .then(() => {
          var index = this.tarefasall.indexOf(item);
          this.tarefasall.splice(index, 1);
          this.presentToast('Tarefa removida com sucesso!');
        })
    }

    verifyEvent(id:number){

      this.itemsall.forEach(element => {
        if(element.keyI==""+id){
        console.log(id+" - selecionado "+element.item.isChecked);
        if(element.item.isChecked==false){
          let pos=this.itens.indexOf(id);
            if(pos>-1){
              this.itens.splice(pos,1);
              console.log('removido');
            }
        }else{
          this.itens.push(id);
          console.log('adicionado');
        }
        }
   
      });
    }
    save() {
      
     
      
      this.saveTarefa()
        .then(() => {
          this.presentToast('Tarefa adicionada com sucesso!');
          this.navCtrl.navigateForward('list');
        })
        .catch(() => {
          
          this.presentToast('Erro!');
        });
    }
   
    private saveTarefa() {
      //if (this.key) {
       // console.log("update");
      //  console.log(this.key);
      //  return this.providerService.update(this.key, this.model);
     // } else {

      
      this.model.itens=this.itens;
        console.log("insert");
        console.log(this.key);
        
        
        console.log(this.model);
        this.model.datas=moment(this.model.datas).format("DD/MM/YYYY");
        return this.providerService.insert(this.key,this.model);
      //}
    }




  ngOnInit() {
  }

}
