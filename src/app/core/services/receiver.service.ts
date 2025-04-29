import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Receiver, ReceiverPage, SearchParams, CsvImportPreview } from '../models/receiver.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {
  private apiUrl = '/api/receivers';
  
  // Mock data for initial development
  private mockReceivers: Receiver[] = [
    { id: 1, name: 'John Doe', phoneNumber: '+1234567890', userId: 1, verified: true },
    { id: 2, name: 'Jane Smith', phoneNumber: '+0987654321', userId: 1, verified: false },
    { id: 3, name: 'Bob Johnson', phoneNumber: '+1122334455', userId: 2, verified: true },
  ];
  
  constructor(private http: HttpClient) { }
  
  getReceivers(params: SearchParams): Observable<ReceiverPage> {
    // Mock implementation
    const mockPage: ReceiverPage = {
      content: this.mockReceivers
        .filter(r => !params.userId || r.userId === params.userId)
        .filter(r => !params.query || 
          r.name.toLowerCase().includes(params.query.toLowerCase()) || 
          r.phoneNumber.includes(params.query))
        .slice(params.page * params.size, (params.page + 1) * params.size),
      totalElements: this.mockReceivers.length,
      totalPages: Math.ceil(this.mockReceivers.length / params.size),
      size: params.size,
      number: params.page
    };
    
    return of(mockPage);
    
    // Real implementation (commented)
    /*
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('size', params.size.toString());
    
    if (params.query) {
      httpParams = httpParams.set('query', params.query);
    }
    
    if (params.userId) {
      httpParams = httpParams.set('userId', params.userId.toString());
    }
    
    return this.http.get<ReceiverPage>(this.apiUrl, { params: httpParams });
    */
  }
  
  getReceiver(id: number): Observable<Receiver> {
    // Mock implementation
    const receiver = this.mockReceivers.find(r => r.id === id);
    return of(receiver || { id: 0, name: '', phoneNumber: '', userId: 0 });
    
    // Real implementation (commented)
    // return this.http.get<Receiver>(`${this.apiUrl}/${id}`);
  }
  
  createReceiver(receiver: Receiver): Observable<Receiver> {
    // Mock implementation
    const newReceiver = { ...receiver, id: this.mockReceivers.length + 1 };
    this.mockReceivers.push(newReceiver);
    return of(newReceiver);
    
    // Real implementation (commented)
    // return this.http.post<Receiver>(this.apiUrl, receiver);
  }
  
  updateReceiver(receiver: Receiver): Observable<Receiver> {
    // Mock implementation
    const index = this.mockReceivers.findIndex(r => r.id === receiver.id);
    if (index !== -1) {
      this.mockReceivers[index] = receiver;
    }
    return of(receiver);
    
    // Real implementation (commented)
    // return this.http.put<Receiver>(`${this.apiUrl}/${receiver.id}`, receiver);
  }
  
  deleteReceiver(id: number): Observable<void> {
    // Mock implementation
    const index = this.mockReceivers.findIndex(r => r.id === id);
    if (index !== -1) {
      this.mockReceivers.splice(index, 1);
    }
    return of(undefined);
    
    // Real implementation (commented)
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  verifyPhoneNumber(id: number, code: string): Observable<boolean> {
    // Mock implementation
    const index = this.mockReceivers.findIndex(r => r.id === id);
    if (index !== -1) {
      this.mockReceivers[index].verified = code === '123456'; // mock verification code
    }
    return of(code === '123456');
    
    // Real implementation (commented)
    // return this.http.post<boolean>(`${this.apiUrl}/${id}/verify`, { code });
  }
  
  sendVerificationCode(id: number): Observable<void> {
    // Mock implementation
    return of(undefined);
    
    // Real implementation (commented)
    // return this.http.post<void>(`${this.apiUrl}/${id}/send-verification`, {});
  }
  
  previewCsvImport(file: File): Observable<CsvImportPreview> {
    // Mock implementation
    const mockPreview: CsvImportPreview = {
      valid: [
        { name: 'CSV User 1', phoneNumber: '+1234567899', userId: 1 },
        { name: 'CSV User 2', phoneNumber: '+9876543210', userId: 1 }
      ],
      invalid: [
        { row: 3, data: { name: 'Invalid', phoneNumber: 'not-a-phone' }, errors: ['Invalid phone number format'] }
      ],
      totalValid: 2,
      totalInvalid: 1
    };
    return of(mockPreview);
    
    // Real implementation (commented)
    /*
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<CsvImportPreview>(`${this.apiUrl}/preview-csv`, formData);
    */
  }
  
  importCsvReceivers(receivers: Receiver[]): Observable<number> {
    // Mock implementation
    const newIds: number[] = [];
    receivers.forEach(receiver => {
      const newReceiver = { ...receiver, id: this.mockReceivers.length + 1, verified: false };
      this.mockReceivers.push(newReceiver);
      newIds.push(newReceiver.id!);
    });
    return of(receivers.length);
    
    // Real implementation (commented)
    // return this.http.post<number>(`${this.apiUrl}/import-csv`, { receivers });
  }
  
  batchDelete(ids: number[]): Observable<number> {
    // Mock implementation
    let deletedCount = 0;
    ids.forEach(id => {
      const index = this.mockReceivers.findIndex(r => r.id === id);
      if (index !== -1) {
        this.mockReceivers.splice(index, 1);
        deletedCount++;
      }
    });
    return of(deletedCount);
    
    // Real implementation (commented)
    // return this.http.post<number>(`${this.apiUrl}/batch-delete`, { ids });
  }
}
