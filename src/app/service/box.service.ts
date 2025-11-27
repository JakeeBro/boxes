import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Box } from '../model/box';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoxService {

  private api = `${environment.apiUrl}/boxes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Box[]> {
    return this.http.get<Box[]>(this.api);
  }

  createBox(box: Box) {
    return this.http.post<Box>(this.api, box);
  }

  updateBox(box: Box) {
    return this.http.put<Box>(`${this.api}/${box.id}`, box);
  }

  deleteBox(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
