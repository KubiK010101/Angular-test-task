import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VerificationComponent } from '../verification/verification.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @ViewChild('photoPicker') photoPicker: ElementRef;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  private initRegistrationForm(): void {
    this.form = this.fb.group({
      avatar: '',
      username: ['MARK', [Validators.required, Validators.maxLength(16)]],
      email: [
        'm.ca@qwe.wqe',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      age: ['43', [Validators.required, Validators.maxLength(3)]],
      country: ['Ukraine', [Validators.required, , Validators.maxLength(56)]],
      phone: ['0677536881', [Validators.required, , Validators.maxLength(16)]],
    });
  }

  public fileUpload(e: any) {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]); // read file as data url
      reader.onload = (event: any) => {
        this.form.get('avatar')?.patchValue(event.target.result);
        this.photoPicker.nativeElement.style.background = `url(${event.target.result}) no-repeat center`;
      };
    }
  }

  public submitForm(): void {
    if (this.form.invalid) {
      return;
    }
    this.dialog
      .open(VerificationComponent, {
        width: '60%',
        data: this.form.value,
      })
      .afterClosed()
      .subscribe((data) => {
        this.userService.user$.next(this.form.value);
        localStorage.setItem('user', JSON.stringify(this.form.value));

        this.router.navigateByUrl('/profile');
      });
  }

  get formControls() {
    return this.form.controls;
  }
}
