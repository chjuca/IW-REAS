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

  users = [];
  subscription: Subscription;
  newRole: string;

  constructor(public userService: UserService) { }

  ngOnInit() {

    this.subscription = this.userService.findAllUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
    })
  }

  updateRole(user: User) {
    user.rol = this.newRole;
    this.userService.updateRole(user);
  }

}
