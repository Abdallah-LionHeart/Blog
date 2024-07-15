import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AppUserImage } from '../appModels/app-user-image';
import { User } from '../appModels/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getUserById(id: string) {
    return this.http.get<User>(this.baseUrl + 'admin/users' + id);
  }

  updateUser(id: string, user: User) {
    return this.http.put<User>(this.baseUrl + 'admin/users' + id, user);
  }

  addProfileImage(userId: string, image: File) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('isMain', 'true');
    return this.http.post<AppUserImage>(this.baseUrl + 'admin/users/profile-images', formData);
  }

  addBackgroundImage(userId: string, image: File) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('isMain', 'true');
    return this.http.post<AppUserImage>(this.baseUrl + 'admin/users/background-images', formData);
  }

  setMainProfileImage(imageId: number) {
    return this.http.post(this.baseUrl + 'admin/users/profile-images/' + imageId + '/set-main', {});
  }

  setMainBackgroundImage(imageId: number) {
    return this.http.post(this.baseUrl + 'admin/users/background-images/' + imageId + '/set-main', {});
  }

  deleteProfileImage(imageId: number) {
    return this.http.delete(this.baseUrl + 'admin/users/profile-images/' + imageId);
  }

  deleteBackgroundImage(imageId: number) {
    return this.http.delete(this.baseUrl + 'admin/users/background-images/' + imageId);
  }
}
