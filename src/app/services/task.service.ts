import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarea {
  id?: number;
  titulo: string;
  estado: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener todas las tareas
  getTasks(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  // Método para agregar una nueva tarea
  addTask(task: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, task);
  }
  // Método para eliminar una tarea
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // Metodo para actualizar tarea
  updateTask(task: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${task.id}`, task);
  }
}