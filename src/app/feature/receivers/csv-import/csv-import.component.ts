import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CsvImportPreview } from '../../../core/models/receiver.model';
import { ReceiverService } from '../../../core/services/receiver.service';
import { CsvService } from '../../../core/services/csv.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { RoleDirective } from '../../../core/directives/role.directive';
import { VerifyPhoneComponent } from '../verify-phone/verify-phone.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
  ],
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
})
export class CsvImportComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  file: File | null = null;
  fileName = '';
  isLoading = false;
  isUploading = false;
  showPreview = false;

  preview: CsvImportPreview | null = null;

  constructor(
    private receiverService: ReceiverService,
    private csvService: CsvService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.fileName = this.file.name;

      if (!this.file.name.endsWith('.csv')) {
        this.notificationService.showError('Please select a CSV file');
        this.file = null;
        this.fileName = '';
        return;
      }

      this.processFile();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.fileName = this.file.name;

      if (!this.file.name.endsWith('.csv')) {
        this.notificationService.showError('Please select a CSV file');
        this.file = null;
        this.fileName = '';
        return;
      }

      this.processFile();
    }
  }

  processFile(): void {
    if (!this.file) {
      return;
    }

    this.isLoading = true;
    this.showPreview = false;

    // For real implementation, use the service
    this.receiverService.previewCsvImport(this.file).subscribe(
      (preview: CsvImportPreview) => {
        this.preview = preview;
        this.showPreview = true;
        this.isLoading = false;
      },
      (error) => {
        this.notificationService.showError('Failed to process CSV file');
        this.isLoading = false;
      }
    );

    // For development purposes, you can also use CSV service to parse locally
    /*
    this.csvService.parseCsvFile(this.file).then(
      data => {
        const userId = this.authService.getUserId() || 0;
        const result = this.csvService.mapToReceivers(data, userId);
        this.preview = {
          valid: result.valid,
          invalid: result.invalid,
          totalValid: result.valid.length,
          totalInvalid: result.invalid.length
        };
        this.showPreview = true;
        this.isLoading = false;
      }
    ).catch(error => {
      this.notificationService.showError('Failed to parse CSV file');
      this.isLoading = false;
    });
    */
  }

  importReceivers(): void {
    if (!this.preview || this.preview.valid.length === 0) {
      this.notificationService.showWarning('No valid receivers to import');
      return;
    }

    this.isUploading = true;

    this.receiverService.importCsvReceivers(this.preview.valid).subscribe(
      (count) => {
        this.notificationService.showSuccess(
          `${count} receivers imported successfully`
        );
        this.close.emit();
      },
      (error) => {
        this.notificationService.showError('Failed to import receivers');
        this.isUploading = false;
      }
    );
  }

  onCancel(): void {
    this.close.emit();
  }

  clearFile(): void {
    this.file = null;
    this.fileName = '';
    this.showPreview = false;
    this.preview = null;
  }
}
