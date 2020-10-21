import { Component,OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Tarefas,ProviderService,TarefasList} from '../provider.service';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  tarefas: any;
  year = new Date().getFullYear();
  constructor(public servidor : ProviderService, private navCrtl: NavController){
  }
  ionViewDidEnter() {
    this.servidor.getAll()
      .then((result) => {
        this.tarefas = result;
      });
  }
  ngOnInit() {
  }
  get(id: number){
   
    this.navCrtl.navigateForward('tarefa/'+id);

}
add(){
  this.navCrtl.navigateForward('list-manager');
}
}
