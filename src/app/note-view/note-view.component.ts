import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  notes: Array<Note>;
  errMessage: string;
  constructor(private notesService: NotesService) {
    this.notes = [];
  }
  ngOnInit() {
    this.notesService.getNotes().subscribe(response => {
      if (response) {
        this.notes = response;
      } else {
        this.errMessage = 'We are unable to retreive notes list.';
      }
    }, error => {
      this.errMessage = error.message;
    });
  }
}
