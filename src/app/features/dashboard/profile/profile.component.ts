import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  name: string = 'Lana Ahmad';
  role: string = 'Web Developer';
  email: string = 'lana@example.com';
  profileImage: string | ArrayBuffer | null = 'assets/defaultImage.jpg';

  // Edit state
  editMode: boolean = false;
  selectedFile: File | null = null;

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.selectedFile = null;
    }
  }

  // Handle image selection
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Only image files are allowed!');
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Save profile changes
  saveProfile() {
    if (this.selectedFile) {
      console.log('File to upload:', this.selectedFile);
    }

    console.log('Profile saved:', {
      name: this.name,
      role: this.role,
      email: this.email
    });

    this.editMode = false;
  }
}
