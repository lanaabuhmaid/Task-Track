import { Component, OnInit, signal } from '@angular/core';
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
  uploadedFile?: {
    name: string;
    url: string;
    type: string;
    size: number;
  };
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {
  tasks: Task[] = [];
  showModal = false;
  isEditMode = false;
  currentTaskId: number | null = null;
  selectedTask: Task | null = null;
  selectedFile: any = null;

  // Signal بدل array عادية
  employees = signal<string[]>([
    'Ali Ahmad',
    'Sara Hasan',
    'Omar Khaled',
    'Lana Abu-Hmaid'
  ]);

  newTask: Task = {
    title: '',
    employeeId: '',
    dueDate: new Date().toISOString().split('T')[0],
    description: '',
    status: 'Pending'
  };

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadSampleTasks();
  }

  loadSampleTasks() {
    this.tasks = [
      {
        id: 1,
        title: 'Complete project report',
        employeeId: 'Ali Ahmad',
        dueDate: '2025-08-15',
        description: 'Prepare the quarterly project report',
        status: 'Pending',
        uploadedFile: {
          name: 'project_report.pdf',
          url: 'assets/sample.pdf',
          type: 'application/pdf',
          size: 1024
        }
      },
      {
        id: 2,
        title: 'Design mockups',
        employeeId: 'Sara Hasan',
        dueDate: '2025-08-12',
        description: 'Create UI mockups for new feature',
        status: 'Completed',
        uploadedFile: {
          name: 'mockups.zip',
          url: 'assets/sample.zip',
          type: 'application/zip',
          size: 2048
        }
      }
    ];
  }

  openAddModal() {
    this.isEditMode = false;
    this.resetNewTask();
    this.showModal = true;
  }

  viewDescription(task: Task) {
    this.selectedTask = task;
  }

  viewUploadedFile(task: Task) {
    if (task.uploadedFile) {
      this.selectedFile = task.uploadedFile;
    }
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  isImage(type: string): boolean {
    return type.startsWith('image/');
  }

  isPdf(type: string): boolean {
    return type === 'application/pdf';
  }

  submitTask() {
    if (this.validateTask()) {
      if (this.isEditMode && this.currentTaskId) {
        const index = this.tasks.findIndex(t => t.id === this.currentTaskId);
        if (index !== -1) {
          this.tasks[index] = { ...this.newTask, id: this.currentTaskId };
        }
      } else {
        const newId = Math.max(...this.tasks.map(t => t.id || 0), 0) + 1;
        this.tasks.push({ ...this.newTask, id: newId });
      }
      this.closeModal();
    }
  }

  getStatusClass(status: string) {
    return {
      'Pending': 'bg-amber-100 text-amber-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800'
    }[status] || 'bg-gray-100 text-gray-800';
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  closeModal() {
    this.showModal = false;
  }

  private validateTask(): boolean {
    return this.newTask.title.trim() !== '' &&
      this.newTask.employeeId.trim() !== '' &&
      this.newTask.description.trim() !== '' &&
      this.newTask.dueDate.trim() !== '';
  }

  private resetNewTask() {
    this.newTask = {
      title: '',
      employeeId: '',
      dueDate: new Date().toISOString().split('T')[0],
      description: '',
      status: 'Pending'
    };
  }
}
