import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/types/user-interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('photoPicker') photoPicker: ElementRef;
  public form: FormGroup;
  private userData: UserInterface;

  constructor(private fb: FormBuilder, private router: Router) {}

  public ngOnInit(): void {
    this.initRegistrationForm();
  }

  public ngAfterViewInit(): void {
    if (this.userData.avatar) {
      this.photoPicker.nativeElement.style.background = `url(${this.userData.avatar}) no-repeat center`;
    }
  }

  private initRegistrationForm(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '');

    if (!!Object.keys(this.userData).length) {
      this.form = this.fb.group({
        avatar: this.userData.avatar,
        username: [
          this.userData.username,
          [Validators.required, Validators.maxLength(16)],
        ],
        email: [
          this.userData.email,
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        age: [
          this.userData.age,
          [Validators.required, Validators.maxLength(3)],
        ],
        country: [
          this.userData.country,
          [Validators.required, , Validators.maxLength(56)],
        ],
        phone: [
          this.userData.phone,
          [Validators.required, , Validators.maxLength(16)],
        ],
      });
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

  public fileUpload(e: any): void {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]); // read file as data url
      reader.onload = (event: any) => {
        this.form.get('avatar')?.patchValue(event.target.result);
        this.photoPicker.nativeElement.style.background = `url(${event.target.result}) no-repeat center`;
      };
    }
  }

  public save(): void {
    if (this.form.untouched && this.form.invalid) {
      return;
    }
    localStorage.setItem('user', JSON.stringify(this.form.value));
  }
}
