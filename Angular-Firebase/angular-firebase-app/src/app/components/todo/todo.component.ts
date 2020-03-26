import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { element } from 'protractor';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})  
export class TodoComponent implements OnInit {

  todoListArray: any[];
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodoList().snapshotChanges()
    .subscribe(item => {
      this.todoListArray = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.todoListArray.push(x);
      });

      this.todoListArray.sort((a,b )=> {
        return a.isChecked - b.isChecked;
      })
    })
  
  }


  addTodo(itemTitulo) {
    this.todoService.addTodo(itemTitulo.value);
    itemTitulo.value = null;
  }

  updateTodo($key:string, isChecked: boolean) {
    this.todoService.updateTodo($key, !isChecked);
  }

  deleteTodo($key: string) {
    //Si confirmamos al eliminar
    if(confirm('Estas seguro de que quieres eliminar?')) {
      this.todoService.removeTodo($key);

    }
  }

}
