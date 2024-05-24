import { Component } from '@angular/core';
import { Hospital } from '../../models/hospital';
import { HospitalesService } from '../../services/hospitales.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-hospitales',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss']
})
export class HospitalesComponent {
  public displayedColumns: string[] = ['actions', 'id', 'nombre', 'direccion'];
  public hospitals2: Hospital[] = [];
  public editId: number | null = null;
  public isLoading: boolean = false;

  constructor(
    private hospitalesService: HospitalesService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals(): void {
    this.isLoading = true;
    this.hospitalesService.get().subscribe({
      next: (data: Hospital[]) => {
        this.isLoading = false;
        this.hospitals2 = data;
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
        this.snackbar.open('Error al cargar hospitales', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  enableEdit(id: number): void {
    this.editId = id;
  }

  cancelEdit(): void {
    this.editId = null;
    this.loadHospitals(); // Para revertir cualquier cambio no guardado
  }

  saveEdit(hospital: Hospital): void {
    this.isLoading = true;
    this.hospitalesService.put(hospital).subscribe({
      next: () => {
        this.isLoading = false;
        this.editId = null;
        this.snackbar.open('Hospital actualizado con éxito', 'Cerrar', {
          duration: 3000
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
        this.snackbar.open('Error al actualizar hospital', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  deleteHospital(id: number): void {
    this.isLoading = true;
    this.hospitalesService.delete(id).subscribe({
      next: (data) => {
        const deletedHospital = data[0];
        const deletedHospitalIndex = this.hospitals2.findIndex(hospital => hospital.id == deletedHospital.id);
        this.hospitals2.splice(deletedHospitalIndex, 1);
        this.isLoading = false;
        this.snackbar.open('Hospital borrado con éxito', 'Cerrar', {
          duration: 3000
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
        this.snackbar.open('Error al borrar hospital', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }
}
