import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SmsService } from '../../../core/services/sms.service';


interface SmsHistory {
  id: number;
  label: string;
  message: string;
  phoneNumber: string;
  sendTime: string;
  status: string;
  toType: 'receiver' | 'group';
}
@Component({
  selector: 'app-history',
  imports: [CommonModule, RouterLink],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})







export class HistoryComponent implements OnInit {
  smsHistory: SmsHistory[] = [];
  activeTab: 'receiver' | 'group' = 'receiver';

  constructor(private smsService: SmsService) {}

  ngOnInit(): void {
    this.loadSmsHistory();
  }

  loadSmsHistory(): void {
    
    

    this.smsService.getHistory().subscribe({
      next: (history) => {
        this.smsHistory = history as SmsHistory[];
        console.log('SMS History:', this.smsHistory);
      },
      error: (error) => {
        console.error('Error fetching SMS history:', error);
      }
    });


  }




  setActiveTab(tab: 'receiver' | 'group'): void {
    this.activeTab = tab;
  }

  get filteredSms(): SmsHistory[] {
    return this.smsHistory.filter((sms:  SmsHistory) => sms.toType === this.activeTab);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
