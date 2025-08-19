import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TeamMembersService, TeamMember } from '../../../services/team-members.service';

interface Task {
  id?: number;
  title: string;
  employeeId: number;
  employeeName: string;
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

  // Employees from team member sevice
  employees = signal<TeamMember[]>([]);

  newTask: Task = {
    title: '',
    employeeId: 0,
    employeeName: "",
    dueDate: new Date().toISOString().split('T')[0],
    description: '',
    status: 'Pending'
  };

  constructor(private sanitizer: DomSanitizer, private teamService: TeamMembersService) {}

  ngOnInit() {
    this.loadTeamMembers();
    this.loadSampleTasks();
  }

  loadTeamMembers() {
    this.employees.set(this.teamService.getTeamMembers());
  }

  loadSampleTasks() {
    this.tasks = [
      {
        id: 1,
        title: 'Complete project report',
        employeeId: 1,
        employeeName: "Khaled Ahmad",
        dueDate: '2025-08-15',
        description: 'Prepare the quarterly project report',
        status: 'Pending',
        uploadedFile: {
          name: 'mockups.zip',
          url: 'assets/sample.zip',
          type: 'application/zip',
          size: 2048
        }
      },
      {
        id: 2,
        title: 'Design mockups',
        employeeId: 2,
        employeeName: "Layan Ramiz",
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
  this.newTask.employeeId = Number(this.newTask.employeeId); // مهم
  const member = this.employees().find(m => m.id === this.newTask.employeeId);
  if (!member) {
    alert('Please select a valid employee!');
    return;
  }

  this.newTask.employeeName = member.name;

  if (this.validateTask()) {
    const newId = Math.max(...this.tasks.map(t => t.id || 0), 0) + 1;
    this.tasks.push({ ...this.newTask, id: newId });
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

  getEmployeeName(id: number): string {
  const member = this.employees().find(m => m.id === id);
  return member ? member.name : 'Unknown';
}


  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  closeModal() {
    this.showModal = false;
  }

  private validateTask(): boolean {
    return this.newTask.title.trim() !== '' &&
      this.newTask.employeeId !== 0 &&
      this.newTask.employeeName.trim() !== '' &&
      this.newTask.description.trim() !== '' &&
      this.newTask.dueDate.trim() !== '';
  }

  private resetNewTask() {
    this.newTask = {
      title: '',
      employeeId: 0,
      employeeName: "",
      dueDate: new Date().toISOString().split('T')[0],
      description: '',
      status: 'Pending'
    };
  }
}
