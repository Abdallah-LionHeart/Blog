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
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id: number) {
    return this.http.get<User>(this.baseUrl + id);
  }


  updateUser(id: number, user: User) {
    return this.http.put<User>(this.baseUrl + id, user);
  }

  addProfileImage(userId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ProfileImage>(this.baseUrl + userId + '/profile-images', formData);
  }

  addBackgroundImage(userId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<BackgroundImage>(this.baseUrl + userId + '/background-images', formData);
  }

  deleteProfileImage(id: number) {
    return this.http.delete(this.baseUrl + 'profile-images/' + id);
  }


  deleteBackgroundImage(id: number) {
    return this.http.delete(this.baseUrl + 'background-images/' + id);
  }

  getProfileImages(userId: number) {
    return this.http.get<ProfileImage>(this.baseUrl + userId + 'profile-images');
  }

  getBackgroundImages(userId: number) {
    return this.http.get<BackgroundImage>(this.baseUrl + userId + 'background-images');
  }

  getAllProfileImages() {
    return this.http.get<ProfileImage[]>(this.baseUrl + 'profile-images');
  }

  getAllBackgroundImages() {
    return this.http.get<BackgroundImage[]>(this.baseUrl + 'background-images');
  }

  setMainProfileImage(id: number) {
    return this.http.put(this.baseUrl + 'profile-images/' + id + '/set-main', {});
  }

}
