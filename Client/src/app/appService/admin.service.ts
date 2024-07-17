import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { BackgroundImage } from '../appModels/BackgroundImage';
import { ProfileImage } from '../appModels/ProfileImage';
import { User } from '../appModels/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl + 'admin/';
  users: User[] = [];

  constructor(private http: HttpClient) { }


  getUsers() {
    return this.http.get<User>(this.baseUrl);
  }

  getUser(id: number) {
    return this.http.get<User>(this.baseUrl + id);
  }


  updateUser(id: number, user: User) {
    return this.http.put<User>(this.baseUrl + id, user);
  }

  // updateUser(id: number, user: User) {
  //   return this.http.put(this.baseUrl + id, user).pipe(
  //     map(() => {
  //       const index = this.users.indexOf(user);
  //       this.users[index] = { ...this.users[index], ...user }
  //     })
  //   )
  // }

  // updateUser(id: number, user: User) {
  //   return this.http.put<User>(this.baseUrl + id, user);
  // }

  addProfileImage(userId: number, profileImage: ProfileImage, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('appUserId', userId.toString());
    formData.append('url', profileImage.url);
    formData.append('isMain', profileImage.isMain.toString());
    formData.append('publicId', profileImage.publicId);
    return this.http.post<ProfileImage>(this.baseUrl + userId + '/profile-images', formData);
  }

  addBackgroundImage(userId: number, backgroundImage: BackgroundImage, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('appUserId', userId.toString());
    formData.append('url', backgroundImage.url);
    formData.append('publicId', backgroundImage.publicId);
    return this.http.post<BackgroundImage>(this.baseUrl + userId + '/background-images', formData);
  }

  deleteProfileImage(id: number) {
    return this.http.delete(this.baseUrl + 'profile-images/' + id);
  }


  deleteBackgroundImage(id: number) {
    return this.http.delete(this.baseUrl + 'background-images/' + id);
  }

  getProfileImages(userId: number) {
    return this.http.get(this.baseUrl + userId + '/profile-images');
  }

  getBackgroundImages(userId: number) {
    return this.http.get(this.baseUrl + userId + '/background-images');
  }

  setMainProfileImage(id: number) {
    return this.http.put(this.baseUrl + '/profile-images/' + id + '/set-main', {});
  }

}
