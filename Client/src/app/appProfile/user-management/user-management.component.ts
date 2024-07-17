import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/appModels/user';
import { AdminService } from 'src/app/appService/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  userForm: FormGroup;
  user: User = {} as User;
  alertMessage: string | null = null;
  alertType: string = 'success';

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['',],
      lastName: ['',],
      email: ['', [, Validators.email]],
      phoneNumber: [''],
      education: [''],
      experience: [''],
      position: [''],
      overview: [''],
      age: ['', [, Validators.min(0)]],
      facebookLink: [''],
      twitterLink: [''],
      youTubeLink: ['']
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.adminService.getUser(1).subscribe({
      next: user => {
        this.user = user;
        this.userForm.patchValue(this.user);
      }
    })
  }


  updateUser() {
    if (this.userForm.invalid) {
      return;
    }

    const updatedUser: User = {
      ...this.userForm.value,
      id: this.user.id
    };

    this.adminService.updateUser(updatedUser.id, updatedUser).subscribe({
      next: () => {
        this.alertMessage = 'User updated successfully'
        this.alertType = 'success'
      },
      error: () => {
        this.alertMessage = 'Failed to update user'
        this.alertType = 'danger'
      }
    })
  }
}
