import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(private http: HttpClient) {}

  validate(value: string) {
    return this.http.get(`http://localhost:3000/api/items/validate/${value}`);
  }
}
