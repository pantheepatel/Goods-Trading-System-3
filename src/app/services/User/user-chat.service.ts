import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserChatDTO } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserChatService {
  private readonly getUserForChat = `${environment.baseUrl}api/user/chat/availableUsers`; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getAvailableUsers(): Observable<UserChatDTO[]> {
    return this.http.get<UserChatDTO[]>(this.getUserForChat);
  }

}
