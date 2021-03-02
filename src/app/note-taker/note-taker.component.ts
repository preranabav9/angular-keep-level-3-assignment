import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {
  note: Note = new Note();
  notes: Array<Note> = [];
  errMessage: string;
  constructor(private notesService: NotesService) {
  }
  addNote() {
    if (!this.note.text || !this.note.title) {
      this.errMessage = 'Title and Text both are required fields';
      return;
    }
    this.notesService.addNote(this.note).subscribe(response => {
      if (response) {
        this.notes.push(response);
        this.note = new Note();
      } else {
        this.errMessage = 'We are unable to add the selected note.';
      }
    }, error => {
      this.errMessage = error.message;
    });
  }
}
