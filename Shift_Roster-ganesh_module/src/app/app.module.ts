import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderComponent } from './header/header.component';
import { CalenderComponent } from './calender/calender.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import { DisplayComponent } from './display/display.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RosterComponent } from './components/roster/roster.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // a plugin!
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { FilterComponent } from './components/filter/filter.component';
import { MatMenuModule} from '@angular/material/menu';
import { UpdateRosterComponent } from './components/update-roster/update-roster.component';
import { MatCardModule } from "@angular/material/card";
import { MatTableUpdateComponent } from './components/mat-table-update/mat-table-update.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TitlePipe } from './utils/pipes/titlePipe';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './services/api-service.service';
import { ApiInterceptor } from './_helpers/api.interceptor';
@NgModule({
  declarations: [AppComponent,TitlePipe,FilterComponent,DisplayComponent,CalenderComponent,HeaderComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, HomeComponent, NotificationsComponent,DialogComponent, RosterComponent, UpdateRosterComponent, MatTableUpdateComponent, ProjectDialogComponent, UserDialogComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatAutocompleteModule,CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }), NgbModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    HttpClientModule,
    MatRadioModule
  ],
  providers: [ApiService, CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
},],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {}
