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
  usersFilter = []
  onChange = false;

  constructor(public userService: UserService) { }

  ngOnInit() {

    this.subscription = this.userService.findAllUsers().subscribe(users => {
      this.users = users;
      this.usersFilter = users;
    })
  }

  updateRole(user: User) {
  var delayInMiliseconds = 3000;
  if(this.userService.updateRole(user)){
    this.onChange = true;
  }else{
    this.onChange = false;
  }
  }

  onSearchChange(searchValue: string): void {
    console.log(searchValue.length)
    if (searchValue.length === 0) {
      this.usersFilter = this.users;
    } else {
      this.usersFilter = this.users.filter(user => user.email.startsWith(searchValue));
    }
  }

}


