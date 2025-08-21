import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Task {
  id?: number;
  title: string;
  employeeId: string;
  employeeName: string;
  dueDate: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

// Interface ثاني للملفات
interface FileAttachment {
  file?: File;
  fileUrl?: string;
}

// مثال على Intersection Types
type TaskWithFile = Task & FileAttachment;

class TaskModel implements TaskWithFile {
  constructor(
    public id: number,
    public title: string,
    public employeeId: string,
    public employeeName: string,
    public dueDate: string,
    public description: string,
    public status: 'Pending' | 'In Progress' | 'Completed',
    public file?: File,
    public fileUrl?: string
  ) {}

  updateStatus(newStatus: 'Pending' | 'In Progress' | 'Completed') {
    this.status = newStatus;
  }

  getSummary(): string {
    return `${this.title} - Assigned to ${this.employeeName} (Due: ${this.dueDate})`;
  }
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: TaskModel[] = [];
  selectedTask: TaskModel | null = null;
  selectedFile: {name: string, size: number, url: SafeUrl} | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadSampleTasks();
  }

  loadSampleTasks() {
    this.tasks = [
      new TaskModel(
        1,
        'Complete project report',
        'EMP-1001',
        'Khaled Ahmad',
        '2025-08-15',
        'Prepare the quarterly project report',
        'Pending'
      ),
      new TaskModel(
        2,
        'Review authentication module',
        'EMP-1002',
        'Layan Ramiz',
        '2025-08-12',
        'Perform code review',
        'In Progress'

    )];
  }

  viewDescription(task: TaskModel) {
    this.selectedTask = task;
  }

  onFileSelected(event: any, task: TaskModel) {
    const file: File = event.target.files[0];
    if (file) {
      task.file = file;
      task.fileUrl = URL.createObjectURL(file);
      console.log(`File selected for task ${task.id}: ${file.name}`);
    }
  }

  viewFile(task: TaskModel) {
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
