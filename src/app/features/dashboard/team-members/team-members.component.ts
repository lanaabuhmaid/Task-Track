import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeamMembersService, TeamMember } from '../../../services/team-members.service';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent {
  teamMembers: TeamMember[] = [];

  constructor(private teamService: TeamMembersService) {
    this.teamMembers = this.teamService.getTeamMembers();
  }
}
