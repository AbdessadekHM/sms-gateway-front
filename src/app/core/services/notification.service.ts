import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  private idCounter = 0;
  private defaultDuration = 5000; // 5 seconds

  constructor() {}

  getToasts(): Observable<Toast[]> {
    return this.toastsSubject.asObservable();
  }

  showSuccess(message: string, duration?: number): void {
    console.log("Success message:", message);
    this.showToast(message, 'success', duration);
  }

  showError(message: string, duration?: number): void {
    console.log("Error message:", message);
    this.showToast(message, 'error', duration);
  }

  showInfo(message: string, duration?: number): void {
    this.showToast(message, 'info', duration);
  }

  showWarning(message: string, duration?: number): void {
    this.showToast(message, 'warning', duration);
  }

  private showToast(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    duration?: number
  ): void {
    const id = ++this.idCounter;
    const toast: Toast = {
      id,
      message,
      type,
      duration: duration || this.defaultDuration,
    };

    const currentToasts = this.toastsSubject.value;
    console.log("Current toasts:", currentToasts);
    this.toastsSubject.next([...currentToasts, toast]);

    // Auto-remove toast after duration
    setTimeout(() => {
      this.removeToast(id);
    }, toast.duration);
  }

  removeToast(id: number): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter((toast) => toast.id !== id));
  }

  clearAll(): void {
    this.toastsSubject.next([]);
  }
}
