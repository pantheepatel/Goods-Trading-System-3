// notifications.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  email: string = '';

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('credentials');
    if (user) {
      const { email } = JSON.parse(user);
      this.email = email;

      this.notificationService.getNotifications(email).subscribe({
        next: (res) => {
          this.notifications = res;
        },
        error: (err) => {
          console.error('Failed to load notifications', err);
        }
      });
    }
  }

  approvePurchase(transactionId: string) {
    const transaction = this.notifications.find(n => n.transactionId === transactionId);
    if (!transaction) return;

    const payload = {
      productId: transaction.productId,
      sellerEmail: transaction.sellerEmail,
      buyerEmail: transaction.buyerEmail,
      status: 'Approved'
    };

    this.notificationService.sendBuyerResponse(payload).subscribe({
      next: () => {
        alert('Purchase approved!');
        this.refreshNotifications();
      },
      error: err => {
        window.location.reload();
        this.refreshNotifications();
        console.error('Approval failed', err);
      }
    });
  }

  sendBuyerResponse(n: any, status: 'Approved' | 'Rejected') {
    const payload = {
      productId: n.productId,
      buyerEmail: n.buyerEmail,
      sellerEmail: n.sellerEmail,
      status: status
    };
  
    this.notificationService.sendBuyerResponse(payload).subscribe({
      next: () => {
        // Refresh notifications
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Buyer response failed:', err);
      }
    });
  }
  

  rejectPurchase(transactionId: string) {
    const transaction = this.notifications.find(n => n.transactionId === transactionId);
    if (!transaction) return;

    const payload = {
      productId: transaction.productId,
      sellerEmail: transaction.sellerEmail,
      buyerEmail: transaction.buyerEmail,
      status: 'Rejected'
    };

    this.notificationService.sendBuyerResponse(payload).subscribe({
      
      next: () => {
        alert('Purchase rejected.');
        this.refreshNotifications();
      },
      error: err => {
        window.location.reload();
        this.refreshNotifications();
        console.error('Rejection failed', err);
      }
    });
  }

  refreshNotifications() {
    this.notificationService.getNotifications(this.email).subscribe({
      next: (res) => this.notifications = res,
      error: (err) => console.error('Reload failed', err)
    });
  }


  confirmPurchase(n: any) {
    this.notificationService.completeTransaction(n.productId, n.sellerEmail, n.buyerEmail).subscribe({
      next: () => {
        console.log('Transaction marked as completed!');
        // Refresh notifications or update UI accordingly
        this.notifications = this.notifications.map(item => {
          if (item.transactionId === n.transactionId) {
            return { ...item, status: 'Completed' };
          }
          return item;
        });
      },
      error: (err) => {
        window.location.reload();
        console.error('Error completing transaction:', err);
      }
    });
  }

}
