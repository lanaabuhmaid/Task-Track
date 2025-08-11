import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Task {
  id?: number;
  title: string;
  employeeId: string;
  dueDate: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  file?: File;
  fileUrl?: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  selectedFile: {name: string, size: number, url: SafeUrl} | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadSampleTasks();
  }

  loadSampleTasks() {
    this.tasks = [
      {
        id: 1,
        title: 'Complete project report',
        employeeId: 'EMP-1001',
        dueDate: '2025-08-15',
        description: 'Prepare the quarterly project report',
        status: 'Pending'
      },
      {
        id: 2,
        title: 'Review authentication module',
        employeeId: 'EMP-1002',
        dueDate: '2025-08-12',
        description: 'Perform code review',
        status: 'In Progress'
      }
    ];
  }

  viewDescription(task: Task) {
    this.selectedTask = task;
  }

  onFileSelected(event: any, task: Task) {
    const file: File = event.target.files[0];
    if (file) {
      task.file = file;
      task.fileUrl = URL.createObjectURL(file);
      console.log(`File selected for task ${task.id}: ${file.name}`);
    }
  }

  viewFile(task: Task) {
    if (task.file && task.fileUrl) {
      this.selectedFile = {
        name: task.file.name,
        size: task.file.size,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(task.fileUrl)
      };
    }
  }

  updateStatus(task: Task) {
    console.log(`Task ${task.id} status updated to: ${task.status}`);
  }

  isPdf(file: any): boolean {
    return file.name.toLowerCase().endsWith('.pdf');
  }

  isImage(file: any): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    return imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  }

  getSafeUrl(file: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(file.url);
  }

  hoveredTaskId: number | null = null;

  setHover(taskId: number, isHover: boolean) {
  this.hoveredTaskId = isHover ? taskId : null;
  }
}
