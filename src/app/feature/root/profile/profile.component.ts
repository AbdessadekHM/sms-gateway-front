import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { InputComponent } from "../../../shared/components/input/input.component";
import { CommonModule } from '@angular/common';

// Interfaces
interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  bio?: string;
  createdAt: string;
  totalMessages: number;
  totalReceivers: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  timezone: string;
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user?: UserProfile;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [InputComponent, ReactiveFormsModule, CommonModule],
  
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  profileForm: FormGroup;
  userProfile: UserProfile = {
    name: '',
    email: '',
    phone: '',
    company: '',
    bio: '',
    createdAt: '',
    totalMessages: 0,
    totalReceivers: 0,
    emailNotifications: true,
    smsNotifications: false,
    timezone: 'UTC'
  };
  
  isUpdating = false;
  hasUnsavedChanges = false;
  private originalFormValue: any;

  constructor(
    private formBuilder: FormBuilder,
    // Inject your services here
    // private userService: UserService,
    // private notificationService: NotificationService
  ) {
    this.profileForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadUserProfile();
    this.setupFormChangeListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      bio: ['', [Validators.maxLength(500)]],
      emailNotifications: [true],
      smsNotifications: [false],
      timezone: ['UTC']
    });
  }

  private setupFormChangeListener(): void {
    this.profileForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkForUnsavedChanges();
      });
  }

  private checkForUnsavedChanges(): void {
    if (this.originalFormValue) {
      this.hasUnsavedChanges = JSON.stringify(this.profileForm.value) !== JSON.stringify(this.originalFormValue);
    }
  }

  private loadUserProfile(): void {
    // Simulate loading user profile - replace with actual service call
    // this.userService.getCurrentUserProfile()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (profile) => {
    //       this.userProfile = profile;
    //       this.populateForm(profile);
    //     },
    //     error: (error) => {
    //       console.error('Error loading user profile:', error);
    //       this.notificationService.showError('Failed to load profile');
    //     }
    //   });

    // Mock data for demonstration
    setTimeout(() => {
      this.userProfile = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        company: 'Acme Corp',
        bio: 'Software developer with 5+ years of experience in web development.',
        createdAt: 'January 2023',
        totalMessages: 1247,
        totalReceivers: 89,
        emailNotifications: true,
        smsNotifications: false,
        timezone: 'EST'
      };
      this.populateForm(this.userProfile);
    }, 1000);
  }

  private populateForm(profile: UserProfile): void {
    this.profileForm.patchValue({
      name: profile.name,
      email: profile.email,
      phone: profile.phone || '',
      company: profile.company || '',
      bio: profile.bio || '',
      emailNotifications: profile.emailNotifications,
      smsNotifications: profile.smsNotifications,
      timezone: profile.timezone
    });
    
    // Store original values for change detection
    this.originalFormValue = { ...this.profileForm.value };
    this.hasUnsavedChanges = false;
  }

  onUpdateProfile(): void {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    this.isUpdating = true;
    const formData = this.profileForm.value;

    // Simulate API call - replace with actual service call
    // this.userService.updateProfile(formData)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (response: UpdateProfileResponse) => {
    //       this.handleUpdateSuccess(response);
    //     },
    //     error: (error) => {
    //       this.handleUpdateError(error);
    //     }
    //   });

    // Mock API call
    setTimeout(() => {
      try {
        // Update local profile data
        this.userProfile = {
          ...this.userProfile,
          ...formData
        };
        
        this.originalFormValue = { ...formData };
        this.hasUnsavedChanges = false;
        this.isUpdating = false;
        
        // Show success message
        // this.notificationService.showSuccess('Profile updated successfully!');
        console.log('Profile updated successfully!');
        
      } catch (error) {
        this.isUpdating = false;
        // this.notificationService.showError('Failed to update profile');
        console.error('Failed to update profile:', error);
      }
    }, 2000);
  }

  onResetForm(): void {
    if (this.originalFormValue) {
      this.profileForm.patchValue(this.originalFormValue);
      this.hasUnsavedChanges = false;
    }
  }

  onChangePassword(): void {
    // Implement password change functionality
    // This could open a modal or navigate to a password change page
    console.log('Change password clicked');
  }

  onDownloadData(): void {
    // Implement data download functionality
    console.log('Download data clicked');
    
    // Mock download functionality
    const userData = {
      profile: this.userProfile,
      exportDate: new Date().toISOString(),
      dataType: 'user-profile-export'
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `user-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  onDeleteAccount(): void {
    // Implement account deletion with confirmation
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (confirmed) {
      console.log('Delete account confirmed');
      // Implement actual deletion logic
      // this.userService.deleteAccount()
      //   .pipe(takeUntil(this.destroy$))
      //   .subscribe({
      //     next: () => {
      //       this.router.navigate(['/goodbye']);
      //     },
      //     error: (error) => {
      //       this.notificationService.showError('Failed to delete account');
      //     }
      //   });
    }
  }

  onProfilePictureChange(): void {
    // Implement profile picture upload functionality
    console.log('Profile picture change clicked');
    
    // Create file input programmatically
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        // Handle file upload
        console.log('Selected file:', file);
        // Implement actual upload logic here
        // this.userService.uploadProfilePicture(file)
        //   .subscribe(response => {
        //     this.userProfile.profilePicture = response.imageUrl;
        //   });
      }
    };
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      
      if (control && typeof control === 'object' && 'controls' in control) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  private handleUpdateSuccess(response: UpdateProfileResponse): void {
    this.isUpdating = false;
    if (response.success && response.user) {
      this.userProfile = response.user;
      this.originalFormValue = { ...this.profileForm.value };
      this.hasUnsavedChanges = false;
      // this.notificationService.showSuccess(response.message || 'Profile updated successfully!');
    }
  }

  private handleUpdateError(error: any): void {
    this.isUpdating = false;
    console.error('Update profile error:', error);
    // this.notificationService.showError('Failed to update profile. Please try again.');
  }

  // Getter methods for template convenience
  get nameControl() {
    return this.profileForm.get('name');
  }

  get emailControl() {
    return this.profileForm.get('email');
  }

  get bioControl() {
    return this.profileForm.get('bio');
  }

  // Utility method to get bio character count
  getBioCharacterCount(): number {
    return this.bioControl?.value?.length || 0;
  }
}