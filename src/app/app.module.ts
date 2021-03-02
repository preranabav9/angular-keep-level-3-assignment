import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { NotesService } from './services/notes.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteComponent } from './note/note.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { RouterModule, Routes } from '@angular/router';
import {
      MatToolbarModule,
      MatInputModule,
      MatButtonModule,
      MatExpansionModule,
      MatIconModule,
      MatCardModule,
      MatFormFieldModule,
      MatSidenavModule,
      MatListModule,
      MatDialogModule,
      MatOptionModule,
      MatSelectModule
    } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/noteview', component: NoteViewComponent
      },
      {
        path: 'view/listview', component: ListViewComponent
      },
      {
        path: '', redirectTo: 'view/noteview', pathMatch: 'full'
      },
      {
        path: 'note/:noteId/edit', component: EditNoteOpenerComponent,
        outlet : 'noteEditOutlet'
      }
    ]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    NoteComponent
  ],
  imports: [
    RouterModule.forRoot(routes,
      { enableTracing: false }
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    AuthenticationService,
    RouterService,
    NotesService,
    CanActivateRouteGuard
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ EditNoteViewComponent ]
})

export class AppModule { }
