import { Component , OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { TaskService, Tarea as Task } from './services/task.service';

export interface Tarea{
  id?: number;
  titulo: string;
  estado: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  imports:[CommonModule, FormsModule]
})
export class AppComponent implements OnInit {
  TareaList: Task[] = []; // Lista de tareas para mostrar en la interfaz
  newTask: string = '';   // Input para una nueva tarea
  editTaskId: number | null = null;
 

  constructor(private taskService: TaskService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Llamar al servicio para obtener las tareas
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.TareaList = tasks; // Asignar las tareas obtenidas al array
        console.log('Tareas obtenidas:', this.TareaList);
      },
      error: (err) => {
        console.error('Error al obtener tareas:', err);
      }
    });
  }

  editTask(taskId: number): void {
    this.editTaskId = taskId;
  }

  // Cancelar edición
  cancelEdit(): void {
    this.editTaskId = null;
  }

  updateTask(updatedTask: Tarea): void {
    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        console.log('Tarea actualizada');
        this.editTaskId = null; // Salir del modo de edición
      },
      error: (err) => {
        console.error('Error al actualizar tarea:', err);
      }
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        // Eliminar la tarea de la lista local
        this.TareaList = this.TareaList.filter(task => task.id !== taskId);
        console.log('Tarea eliminada correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
      }
    });
  }

  // Método para agregar una nueva tarea
  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTaskItem: Tarea = {
        titulo: this.newTask,
        estado: false, // Nueva tarea empieza como no completada
      };

      // Llamar al servicio para agregar la nueva tarea
      this.taskService.addTask(newTaskItem).subscribe({
        next: (task) => {
          // Agregar la nueva tarea a la lista
          this.TareaList.push(task);
          console.log('Tarea añadida:', task);
        },
        error: (err) => {
          console.error('Error al agregar tarea:', err);
        }
      });

      // Limpiar el campo de entrada
      this.newTask = '';
    }
  }
}