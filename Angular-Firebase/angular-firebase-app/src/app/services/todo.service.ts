import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { 
    
  }

  //Metodo para obtener todas las tareas
  getTodoList() {
    //El metodo list me devuelve todos los datos que tenga
    //pero tengo que decirle que campos quiero obtener
    this.todoList = this.firebasedb.list('titles');

    //Una vez que tenga los datos los devuelvo para que mis otros componentes los puedan utilizar
    return this.todoList;
  }

  addTodo(title:string) {
    this.todoList.push({
      title: title,
      isChecked: false
    });
  }

  updateTodo($key:string, flag: boolean) {
    this.todoList.update($key, {isChecked: flag});
  }

  removeTodo($key) {
    this.todoList.remove($key);
  }
}
