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

  // signal لتخزين الـtasks
  tasksSignal = signal<Task[]>([]);

  constructor(private http: HttpClient) {}

  // نجلب من السيرفر ونخزن بالـsignal
  loadTasks(): void {
    this.http.get<Task[]>(`${this.apiUrl}/tasks`)
      .subscribe(tasks => this.tasksSignal.set(tasks));
  }

  // نرجع Observable إذا محتاجين
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  // إضافة task وتحديث الـsignal
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task).pipe(
      tap(newTask => {
        const current = this.tasksSignal();
        this.tasksSignal.set([...current, newTask]);
      })
    );
  }

  // تحديث Task (للتعديل)
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${task.id}`, task).pipe(
      tap(updatedTask => {
        const current = this.tasksSignal();
        const index = current.findIndex(t => t.id === updatedTask.id);
        if (index > -1) {
          current[index] = updatedTask;
          this.tasksSignal.set([...current]);
        }
      })
    );
  }

  // حذف Task
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`).pipe(
      tap(() => {
        const current = this.tasksSignal();
        this.tasksSignal.set(current.filter(t => t.id !== id));
      })
    );
  }
}
