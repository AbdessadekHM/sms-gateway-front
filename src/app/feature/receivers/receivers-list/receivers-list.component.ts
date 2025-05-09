import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
  Receiver,
  ReceiverPage,
  SearchParams,
} from '../../../core/models/receiver.model';
import { AuthService } from '../../../core/services/auth.service';
import { ReceiverService } from '../../../core/services/receiver.service';
import { NotificationService } from '../../../core/services/notification.service';
import { NgForOf, NgIf } from '@angular/common';
import { ReceiverFormComponent } from '../receiver-form/receiver-form.component';
import { CsvImportComponent } from '../csv-import/csv-import.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-receivers-list',
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    ReceiverFormComponent,
    CsvImportComponent,
    ConfirmationDialogComponent,
  ],
  templateUrl: './receivers-list.component.html',
})
export class ReceiversListComponent implements OnInit, OnDestroy {
  receivers: Receiver[] = [];
  totalItems = 0;
  currentPage = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  searchControl = new FormControl('');
  searchQuery = '';
  loading = false;
  selectedReceivers: number[] = [];
  showAddEditModal = false;
  showCsvImportModal = false;
  showConfirmationDialog = false;
  confirmationMessage = '';
  currentReceiver: Receiver | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private receiverService: ReceiverService,
    private authService: AuthService,
    protected notificationService: NotificationService
  ) {}

  get allSelected(): boolean {
    return (
      this.receivers.length > 0 &&
      this.selectedReceivers.length === this.receivers.length
    );
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): number[] {
    const result = [];
    const totalPages = this.totalPages;

    // Show at most 5 pages
    const startPage = Math.max(
      0,
      Math.min(this.currentPage - 2, totalPages - 5)
    );
    const endPage = Math.min(totalPages, startPage + 5);

    for (let i = startPage; i < endPage; i++) {
      result.push(i);
    }

    return result;
  }

  confirmationAction: () => void = () => {};

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.searchQuery = value || '';
        this.currentPage = 0;
        this.loadReceivers();
      });

    this.loadReceivers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadReceivers(): void {
    console.log('Load Receivers');
    this.loading = true;
    const params: SearchParams = {
      page: this.currentPage,
      size: this.pageSize,
      query: this.searchQuery,
    };

    this.receiverService
      .getReceivers(params)
      // .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: ReceiverPage) => {
          console.log('Receivers loaded', data);
          this.receivers = data.content;
          this.totalItems = data.totalElements;
          this.loading = false;
        },
        error: (error) => {
          this.notificationService.showError('Failed to load receivers');
          this.loading = false;
        },
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadReceivers();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 0;
    this.loadReceivers();
  }

  openAddModal(): void {
    this.currentReceiver = null;
    this.showAddEditModal = true;
  }

  openEditModal(receiver: Receiver): void {
    this.currentReceiver = { ...receiver };
    this.showAddEditModal = true;
  }

  closeAddEditModal(): void {
    this.showAddEditModal = false;
    this.currentReceiver = null;
  }

  openCsvImportModal(): void {
    this.showCsvImportModal = true;
  }

  closeCsvImportModal(): void {
    this.showCsvImportModal = false;
    this.loadReceivers();
  }

  onSaveReceiver(receiver: Receiver): void {
    this.loading = true;

    if (receiver.id) {
      // Update existing receiver
      console.log({ receiver });
      this.receiverService.updateReceiver(receiver).subscribe({
        next: (updatedReceiver) => {
          this.notificationService.showSuccess('Receiver updated successfully');
          this.loadReceivers();
          this.closeAddEditModal();
        },
        error: (error) => {
          this.notificationService.showError('Failed to update receiver');
          this.loading = false;
          this.closeAddEditModal();
        },
      });
    } else {
      // Add new receiver
      if (!receiver.userId) {
        receiver.userId = <string>this.authService.getUserId();
      }
      console.log('Adding receiver', receiver);
      this.receiverService.createReceiver(receiver).subscribe({
        next: (newReceiver) => {
          this.notificationService.showSuccess('Receiver added successfully');
          this.loadReceivers();
          this.closeAddEditModal();
        },
        error: (error) => {
          this.loading = false;
          console.log('Error adding receiver', { error });
          if (error.error && error.error.errorMessage) {
            console.log(error.error.errorMessage);
            const errorMessage = error.error.errorMessage;
            this.notificationService.showError(errorMessage);
          } else {
            this.notificationService.showError('Failed to add receiver');
          }
          this.closeAddEditModal();
        },
      });
    }
  }

  confirmDelete(receiver: Receiver): void {
    this.confirmationMessage = `Are you sure you want to delete "${receiver.name}"? This action cannot be undone.`;
    this.confirmationAction = () => {
      this.deleteReceiver(receiver.id!);
    };
    this.showConfirmationDialog = true;
  }

  confirmBatchDelete(): void {
    if (this.selectedReceivers.length === 0) {
      this.notificationService.showWarning('No receivers selected');
      return;
    }

    this.confirmationMessage = `Are you sure you want to delete ${this.selectedReceivers.length} receivers? This action cannot be undone.`;
    this.confirmationAction = () => {
      this.batchDeleteReceivers();
    };
    this.showConfirmationDialog = true;
  }

  cancelConfirmation(): void {
    this.showConfirmationDialog = false;
  }

  executeConfirmedAction(): void {
    this.confirmationAction();
    this.showConfirmationDialog = false;
  }

  deleteReceiver(id: number): void {
    this.loading = true;
    this.receiverService.deleteReceiver(id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Receiver deleted successfully');
        this.loadReceivers();
      },
      error: () => {
        this.notificationService.showError('Failed to delete receiver');
        this.loading = false;
      },
    });
  }

  batchDeleteReceivers(): void {
    this.loading = true;
    console.log(this.selectedReceivers);
    this.receiverService.batchDelete(this.selectedReceivers).subscribe({
      next: (count) => {
        // get count from header Deleted Count
        this.notificationService.showSuccess(
          `${count} receivers deleted successfully`
        );
        this.selectedReceivers = [];
        this.loadReceivers();
      },
      error: (error) => {
        this.notificationService.showError('Failed to delete receivers');
        this.loading = false;
      },
    });
  }

  onSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedReceivers = this.receivers.map((r) => r.id!);
    } else {
      this.selectedReceivers = [];
    }
  }

  onSelectReceiver(event: Event, id: number): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedReceivers.push(id);
    } else {
      this.selectedReceivers = this.selectedReceivers.filter((r) => r !== id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedReceivers.includes(id);
  }
}
