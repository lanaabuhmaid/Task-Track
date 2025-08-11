import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  title: string;
  status: string;
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
  }
}
