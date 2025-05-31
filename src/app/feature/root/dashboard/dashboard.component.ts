import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { format, subDays } from 'date-fns';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  // Dashboard statistics
  dashboardStats = {
    totalMessages: 1250,
    totalReceivers: 320,
    totalGroups: 15,
    deliveryRate: 0.92
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

  constructor() {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.initializeCharts();
  }

  private initializeCharts(): void {
    // Mock data for charts
    const days = Array.from({ length: 30 }, (_, i) => format(subDays(new Date(), 29 - i), 'MMM dd'));
    const messageData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50);
    const deliveryData = Array.from({ length: 30 }, () => Math.random() * (0.95 - 0.85) + 0.85);

    // Message Volume Chart
    const messageVolumeChart = new Chart('messageVolumeChart', {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Messages Sent',
          data: messageData,
          borderColor: '#3B82F6', // Tailwind's primary blue-500
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Messages'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    // Delivery Success Rate Chart
    const deliveryRateChart = new Chart('deliveryRateChart', {
      type: 'bar',
      data: {
        labels: days,
        datasets: [{
          label: 'Delivery Rate',
          data: deliveryData,
          backgroundColor: '#10B981', // Tailwind's green-500
          borderColor: '#10B981',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 1,
            ticks: {
              callback: (value) => `${(value)}%`
              // callback: (value) => `${(value * 100).toFixed(0)}%`
            },
            title: {
              display: true,
              text: 'Delivery Rate'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}