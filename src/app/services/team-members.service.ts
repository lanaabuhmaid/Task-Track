import { Injectable } from '@angular/core';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeamMembersService {
  private members: TeamMember[] = [
    {
      id: 1,
      name: 'Khaled Ahmad',
      role: 'Frontend Developer',
      email: 'khaled@organization.com',
      image: 'assets/profilepic1.png'
    },
    {
      id: 2,
      name: 'Layan Ramiz',
      role: 'Backend Developer',
      email: 'layan@organization.com',
      image: 'assets/profilepic2.avif'
    },
    {
      id: 3,
      name: 'Sara Rami',
      role: 'UI/UX Designer',
      email: 'sara@organization.com',
      image: 'assets/profilepic3.avif'
    }
  ];

  getTeamMembers(): TeamMember[] {
    return this.members;
  }

  getMemberById(id: number): TeamMember | undefined {
    return this.members.find(m => m.id === id);
  }
}
