import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';
import { Storage } from '@ionic/storage';
import {map} from 'rxjs/operators';
//import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProviderService {
  constructor(private storage: Storage) { }

/*-------------------Tarefas----------------*/ 
  public insert(key: number,tarefa: Tarefas) {
    return this.save(key, tarefa);
  }

  public update(key: number, tarefa: Tarefas) {
    return this.save(key, tarefa);
  }

  private save(key: number,  tarefa: Tarefas) {

    return this.storage.set(""+key, tarefa);
  }

  public remove(key: string) {
    let ok= this.storage.remove(key);
  

    return ok;
  }

  public getAll() {

    let tarefas: TarefasList[] = [];

    return this.storage.forEach((value: Tarefas, key: string, iterationNumber: Number) => {
      let tarefa = new TarefasList();
      tarefa.key = key;
      tarefa.tarefa = value;
      tarefa.type=value.type;
      if(tarefa.type==1){
      tarefas.push(tarefa);
      }
    })
      .then(() => {
        return Promise.resolve(tarefas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  getById(id:string){
    let tarefas: TarefasList[] = [];

    return this.storage.forEach((value: Tarefas, key: string, iterationNumber: Number) => {
      let tarefa = new TarefasList();
      tarefa.key = key;
      tarefa.tarefa = value;
      if(tarefa.key==id)
      tarefas.push(tarefa);
    })
      .then(() => {
        return Promise.resolve(tarefas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });

  }

/*-----------Items---------------- */
  public insertItem(keyI: number,item: Item) {
    return this.saveItem(keyI, item);
  }
  private saveItem(keyI: number,  item: Item) {
    return this.storage.set(""+keyI, item);
  }
  public updateItem(keyI: number, item: Item) {
    return this.saveItem(keyI, item);
  }
  public getAllItem() {
    let items: ItemList[] = [];
    return this.storage.forEach((value: Item, keyI: string, iterationNumber: Number) => {
      let item = new ItemList();
      item.keyI = keyI;
      item.item = value;
      item.type=value.type;
      if(item.type==2){
      items.push(item);
      }
    })
      .then(() => {
        return Promise.resolve(items);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }


  public getAllNum() {
   let num=0;
   let resp=0;
    return this.storage.forEach((value: any, keyI: string, iterationNumber: Number) => {
     
      if(keyI!='NaN' && typeof keyI !=='undefined'){
        num=Number(keyI);
        if(num!=NaN){
          resp=num;
        }else{
        }
      }
    })
      .then(() => {
        return Promise.resolve(resp);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }


  public removeItem(keyI: string) {
    //Remove o item
    let ok= this.storage.remove(keyI);

    //Remove o item de todas as listas
    this.getAll().then((result) => {
      let todas = result;
      todas.forEach(tarefa => {
        tarefa.tarefa.itens.forEach(itens => {
          console.log('removendo: '+itens+' de: '+keyI);
          if(itens==Number(keyI)){
            console.log('removido: '+itens+' de: '+keyI);
            let chave = tarefa.tarefa.itens.indexOf(itens);
            if (chave > -1) {
              tarefa.tarefa.itens.splice(chave);
            }

            
          }
       });
      });
    });
    return ok;
  }

}



export class Tarefas {
  titulo: string;
  datas: string;
  descricao: string;
  imagem: string;
  itens : Array<number>;
  type: number=1;
}

export class TarefasList {
  key: string;
  tarefa: Tarefas;
  type: number=1;
}

export class Item {
  tituloI: string;
  descricaoI: string;
  type: number=2;
}
export class ItemList {
  keyI: string;
  item: Item;
  type: number=2;
}


