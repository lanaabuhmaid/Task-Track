import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  status: string;
  dueDate: string;
  description: string;
  employeeId: string;
  employeeName: string;
  uploadedFile?: {
    name: string;
    url: string;
    type: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api';

  tasksSignal = signal<Task[]>([]);

  constructor(private http: HttpClient) {}

  loadTasks(): void {
    this.http.get<Task[]>(`${this.apiUrl}/tasks`)
      .subscribe(tasks => this.tasksSignal.set(tasks));
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task).pipe(
      tap(newTask => {
        const current = this.tasksSignal();
        this.tasksSignal.set([...current, newTask]);
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`).pipe(
      tap(() => {
        const current = this.tasksSignal();
        this.tasksSignal.set(current.filter(t => t.id !== id));
      })
    );
  }
}
