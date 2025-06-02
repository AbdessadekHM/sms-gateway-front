import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { format, subDays } from 'date-fns';
import { SmsService } from '../../../core/services/sms.service';
import { GroupService } from '../../../core/services/group.service';
import { ReceiverService } from '../../../core/services/receiver.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit ,OnInit {
  // Dashboard statistics
  dashboardStats = {
    totalMessages: 0,
    totalReceivers: 0,
    totalGroups: 0,
    scheduledMessages: 0
  };

  // Recent activity data
  recentActivities = [
    { 
      description: 'Sent campaign "Welcome Offer" to Group A', 
      timestamp: new Date(), 
      status: 'success' 
    },
    { 
      description: 'Failed to send campaign "Promo" to Group B', 
      timestamp: subDays(new Date(), 1), 
      status: 'failed' 
    },
    { 
      description: 'Added 50 new receivers to Group C', 
      timestamp: subDays(new Date(), 2), 
      status: 'success' 
    }
  ];

  constructor(
    private smsService: SmsService,
    private groupService: GroupService,
    private receiverService: ReceiverService
  ) {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
      this.dashboardStats
      this.smsService.getHistory().subscribe(
        (data: any) => {
          this.dashboardStats.totalMessages = data?.length || 0;
        },
        (error)=>{
          console.log("error occured " + error)
        }
      );
      this.groupService.fetchGroups().subscribe(
        (data: any) => {

          console.log(data)
          this.dashboardStats.totalGroups = data.content?.length || 0
        },
        (error) =>{
          console.log(error)
        }
      );
      this.receiverService.fetchReceivers().subscribe(
        (data: any) => {
          
          this.dashboardStats.totalReceivers = data.content?.length || 0
        },
        (error) => {
          console.log(error)
        }
      );
      this.smsService.getScheduledSms().subscribe(
        (data: any) => {
          
          this.dashboardStats.scheduledMessages = data?.length || 0
        },
        (error) => {
          console.log(error)
        }
      )
  }

  ngAfterViewInit(): void {
    this.initializeCharts();
  }
  
  private initializeCharts(){

    const messageVolumeCtx = document.getElementById('messageVolumeChart') as HTMLCanvasElement;
      new Chart(messageVolumeCtx, {
        type: 'line',
        data: {
          labels: ['Day 1', 'Day 7', 'Day 14', 'Day 21', 'Day 30'],
          datasets: [{
            label: 'Messages Sent',
            data: [100, 300, 200, 400, 350],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false } // Disable tooltips to reduce hover effects
          },
          interaction: {
            mode: undefined // Disable all interactions
          },
          animation: false // Disable animations
        }
      });

      // Delivery Success Rate Chart
      const deliveryRateCtx = document.getElementById('deliveryRateChart') as HTMLCanvasElement;
      new Chart(deliveryRateCtx, {
        type: 'doughnut',
        data: {
          labels: ['Delivered', 'Failed'],
          datasets: [{
            data: [85, 15],
            backgroundColor: ['#3B82F6', '#EF4444'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
            tooltip: { enabled: false } // Disable tooltips
          },
          interaction: {
            mode: undefined // Disable all interactions
          },
          animation: false // Disable animations
        }
      });
  }
  }

  // private initializeCharts(): void {
  //   // Mock data for charts
  //   const days = Array.from({ length: 30 }, (_, i) => format(subDays(new Date(), 29 - i), 'MMM dd'));
  //   const messageData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50);
  //   const deliveryData = Array.from({ length: 30 }, () => Math.random() * (0.95 - 0.85) + 0.85);

  //   // Message Volume Chart
  //   const messageVolumeChart = new Chart('messageVolumeChart', {
  //     type: 'line',
  //     data: {
  //       labels: days,
  //       datasets: [{
  //         label: 'Messages Sent',
  //         data: messageData,
  //         borderColor: '#3B82F6', // Tailwind's primary blue-500
  //         backgroundColor: 'rgba(59, 130, 246, 0.1)',
  //         fill: true,
  //         tension: 0.4
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           title: {
  //             display: true,
  //             text: 'Messages'
  //           }
  //         },
  //         x: {
  //           title: {
  //             display: true,
  //             text: 'Date'
  //           }
  //         }
  //       },
  //       plugins: {
  //         legend: {
  //           display: false
  //         }
  //       }
  //     }
  //   });

  //   // Delivery Success Rate Chart
  //   const deliveryRateChart = new Chart('deliveryRateChart', {
  //     type: 'bar',
  //     data: {
  //       labels: days,
  //       datasets: [{
  //         label: 'Delivery Rate',
  //         data: deliveryData,
  //         backgroundColor: '#10B981', // Tailwind's green-500
  //         borderColor: '#10B981',
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           max: 1,
  //           ticks: {
  //             callback: (value) => `${(value)}%`
  //             // callback: (value) => `${(value * 100).toFixed(0)}%`
  //           },
  //           title: {
  //             display: true,
  //             text: 'Delivery Rate'
  //           }
  //         },
  //         x: {
  //           title: {
  //             display: true,
  //             text: 'Date'
  //           }
  //         }
  //       },
  //       plugins: {
  //         legend: {
  //           display: false
  //         }
  //       }
  //     }
  //   });
  // }

