import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CsvImportPreview,
  Receiver,
  ReceiverPage,
  SearchParams,
} from '../models/receiver.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReceiverService {
  private apiUrl = `${environment.apiBaseUrl}/api/receivers`;

  constructor(private http: HttpClient) {}

  getReceivers(params: SearchParams): Observable<ReceiverPage> {
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
  }

  getReceiver(id: number): Observable<Receiver> {
    return this.http.get<Receiver>(`${this.apiUrl}/${id}`);
  }

  createReceiver(receiver: Receiver): Observable<Receiver> {
    return this.http.post<Receiver>(this.apiUrl, receiver);
  }

  updateReceiver(receiver: Receiver): Observable<Receiver> {
    return this.http.put<Receiver>(`${this.apiUrl}/${receiver.id}`, receiver);
  }

  deleteReceiver(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  verifyPhoneNumber(id: number, code: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${id}/verify`, { code });
  }

  sendVerificationCode(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/send-verification`, {});
  }

  previewCsvImport(file: File): Observable<CsvImportPreview> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<CsvImportPreview>(
      `${this.apiUrl}/preview-csv`,
      formData
    );
  }

  importCsvReceivers(receivers: Receiver[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/import-csv`, { receivers });
  }

  batchDelete(ids: number[]): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/batch-delete`, { ids });
  }
}
