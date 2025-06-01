import { Component, OnInit } from '@angular/core';
import { SmsService } from '../../../core/services/sms.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-schedule-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css'
})
export class ScheduleListComponent implements OnInit {
  scheduledSms: any[] = [];
  isLoading = true;
  isCanceling: { [key: number]: boolean } = {};

  constructor(private smsService: SmsService) {}

  ngOnInit(): void {
    this.loadScheduledMessages();
  }

  loadScheduledMessages(): void {
    this.smsService.getScheduledSms().subscribe(
      (data: any) => {
        this.scheduledSms = data || [];
        this.isLoading = false;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching scheduled messages:', error);
        this.isLoading = false;
      }
    );
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

  cancelSms(id: number): void {
    if (!this.isCanceling[id]) {
      this.isCanceling[id] = true;
      // Mock cancellation; replace with actual service call
      // setTimeout(() => {
      //   this.scheduledSms = this.scheduledSms.filter(sms => sms.id !== id);
      //   this.isCanceling[id] = false;
      //   console.log(`SMS ${id} canceled`);
      // }, 1000);

      // Uncomment to use actual service
      
      this.smsService.cancelScheduledSms(id).subscribe({
        next: () => {
          this.scheduledSms = this.scheduledSms.filter(sms => sms.id !== id);
          console.log(`SMS ${id} canceled`);
          this.isCanceling[id] = false;
        },
        error: (error) => {
          console.error(`Error canceling SMS ${id}:`, error);
          this.isCanceling[id] = false;
        }
      });
      
    }
  }

}
