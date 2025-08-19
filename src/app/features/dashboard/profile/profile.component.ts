import { Component, signal } from '@angular/core';
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
  name = signal('Lana Ahmad');
  role = signal('Web Developer');
  email = signal('lana@example.com');
  profileImage = signal<string | ArrayBuffer | null>('assets/defaultImage.jpg');

  editMode = signal(false);
  selectedFile = signal<File | null>(null);

  toggleEditMode() {
    this.editMode.update((mode) => !mode);
    if (!this.editMode()) {
      this.selectedFile.set(null);
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

      this.selectedFile.set(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // Save profile changes
  saveProfile() {
    if (this.selectedFile()) {
      console.log('File to upload:', this.selectedFile());
    }

    console.log('Profile saved:', {
      name: this.name(),
      role: this.role(),
      email: this.email()
    });

    this.editMode.set(false);
  }
}
