import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  getProfile() {
    return {
      name: 'John Doe',
      role: 'Backend Developer',
      email: 'john.doe@organization.com',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    };
  }
}
