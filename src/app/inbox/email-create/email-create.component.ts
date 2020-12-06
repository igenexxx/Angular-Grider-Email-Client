import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;

  constructor(
    private authService: AuthService,
    private emailService: EmailService
  ) {
    this.email = {
      from: `${authService.username}@angular-email.com`,
      html: '',
      id: '',
      subject: '',
      text: '',
      to: '',
    };
  }

  ngOnInit(): void {}

  onEmailSubmit(email: Email) {
    this.emailService
      .sendEmail(email)
      .subscribe(() => (this.showModal = false));
  }
}
