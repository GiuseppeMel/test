import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  getUsers() {
    return this._http.get<IUser[]>(environment.basePath + 'public/v2/users')
  }

  postUser(data: IUser) {
    return this._http.post(environment.basePath + 'public/v2/users', data)
  }
}
