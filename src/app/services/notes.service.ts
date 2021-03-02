import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';

@Injectable()
export class NotesService {
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  bearerToken: string;
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
      this.bearerToken = authService.getBearerToken();
      this.notes = [];
      this.notesSubject = new BehaviorSubject([]);
      this.fetchNotesFromServer();
  }
  fetchNotesFromServer() {
    const headers = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
    };
    this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', headers).subscribe(
      response => {
        this.notes = response;
        this.notesSubject.next(this.notes);
      },
      error => {
        this.notesSubject.error(error);
      }
    );
    return this.notes;
  }
  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }
  addNote(note: Note): Observable<Note> {
    const headers = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
    };
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, headers).do(response => {
      this.notes.push(response);
      this.notesSubject.next(this.notes);
    });
  }
  editNote(note: Note): Observable<Note> {
    const headers = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
    };
    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, headers)
    .do(newNote => {
      const oldNote = this.notes.find(enote  => enote.id === newNote.id);
      Object.assign(oldNote, newNote);
      this.notesSubject.next(this.notes);
    });
  }
  getNoteById(noteId): Note {
    return this.fetchNotesFromServer().find(note => note.id === Number(noteId));
  }
}
