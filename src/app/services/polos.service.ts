import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/userData.interface';
import { AddressItau, PolosItau } from '../interfaces/polos.interface';
import getAddress from 'cep-promise';

@Injectable({
  providedIn: 'root'
})
export class PolosService {

  private path: string = 'https://antlia-mockapi.azurewebsites.net/api/v1';
  private userData: UserData = { name: '', position: 'Diretor Itaú BBA' };

  constructor(private http: HttpClient) { }

  getUser() {
    return this.userData;
  }

  postUser(name: string) {
    this.userData.name = name;
  }

  getAllPolos(): Observable<PolosItau[]> {
    return this.http.get<PolosItau[]>(`${this.path}/itau_teste`);
  }

  getPolo(id: string): Observable<PolosItau> {
    return this.http.get<PolosItau>(`${this.path}/itau_teste/${id}`);
  }

  getAddress(cep: string): Promise<AddressItau> {
    return getAddress(cep);
  }
}
