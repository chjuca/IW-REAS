import { User } from './../../models/user.interface';
import { UserService } from './../../services/user.service';

import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  roles = ['admin', 'estudiante', 'contribuidor']
  users = [];
  subscription: Subscription;

  constructor(public userService: UserService) { }

  ngOnInit() {

    this.subscription = this.userService.findAllUsers().subscribe(users => {
      this.users = users;
    })
  }

  updateRole(user: User) {
    this.userService.updateRole(user);
  }

}
