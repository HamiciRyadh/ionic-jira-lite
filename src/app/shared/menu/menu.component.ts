import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {ProjectService} from '../../services/project.service';
import {User} from '@firebase/auth';
import {Project} from '../../models/project';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user: User;
  project: Project;

  constructor(private router: Router,
              private userService: UserService,
              private projectService: ProjectService,
              private menu: MenuController) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        if (event.url === '/projects' || event.url === 'profile'
          || event.url === 'login' || event.url === 'register'
          || event.url === 'password-recovery') {
          this.menu.enable(false);
        } else {
          this.menu.enable(true);
        }
      }
    });
    this.userService.getObservableUser().subscribe(user => this.user = user);
    this.projectService.getSelectedProjectObservable().subscribe(project => this.project = project);
  }

  redirectToProfile(): void {
    this.router.navigate(['/profile']).then(() => this.closeMenu());
  }

  redirectToHome(): void {
    this.router.navigate(['/projects']).then(() => this.closeMenu());
  }

  redirectToTickets(): void {
    this.router.navigate([`/projects/${this.project.id}`]).then(() => this.closeMenu());
  }

  redirectToMembers(): void {
    this.router.navigate([`/projects/${this.project.id}/members`]).then(() => this.closeMenu());
  }

  redirectToParameters(): void {
    this.router.navigate([`/projects/${this.project.id}/parameters`]).then(() => this.closeMenu());
  }

  logout(): void {
    // TODO: Clear routing history
    this.userService.logout().then(() => this.router.navigate(['/login'])).then(() => this.closeMenu());
  }

  closeMenu(): Promise<boolean> {
    return this.menu.close('main_menu');
  }
}
