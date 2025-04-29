import { NgModule } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { provideRouter, Routes } from '@angular/router';
import { ReceiversListComponent } from './receivers-list/receivers-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleDirective } from '../../core/directives/role.directive';
import { ReceiverFormComponent } from './receiver-form/receiver-form.component';
import { VerifyPhoneComponent } from './verify-phone/verify-phone.component';
import { CsvImportComponent } from './csv-import/csv-import.component';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

const routes: Routes = [{ path: '', component: ReceiversListComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RoleDirective,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    ReceiverFormComponent,
    VerifyPhoneComponent,
    CsvImportComponent,
    ConfirmationDialogComponent,
  ],
  providers: [provideRouter(routes)],
})
export class ReceiversModule {}
