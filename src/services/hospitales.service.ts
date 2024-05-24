import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital } from '../models/hospital';
@Injectable({
 providedIn: 'root'
})
export class HospitalesService {
 private apiUrl = 'http://localhost:3000/hospitales';
 constructor(private http: HttpClient) { }
 // Obtener la lista de hospitales
 get(): Observable<Hospital[]> {
 return this.http.get<Hospital[]>(this.apiUrl);
 }

  add(hospital: Hospital): Observable<Hospital> {
 return this.http.post<Hospital>(this.apiUrl, hospital, { });
 }

 delete(id: number): Observable<Hospital[]> {
    return this.http.delete<Hospital[]>(this.apiUrl + '/' + id);
 }

 put(hospital: Hospital): Observable<Hospital> {
   return this.http.put<Hospital>(this.apiUrl + "/" + hospital.id, hospital, { });
 }
}