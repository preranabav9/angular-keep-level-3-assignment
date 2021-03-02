import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  constructor(private notesService: NotesService) {
    this.notStartedNotes = [];
    this.startedNotes = [];
    this.completedNotes = [];
  }
  ngOnInit() {
    this.notesService.getNotes().subscribe(
      res => {
        this.filterNotes(res);
      }, error => {
        console.log(error.message);
      }
    );
  }
  filterNotes(allNotes: Array<Note>) {
    this.notStartedNotes = allNotes.filter(note => note.state === 'not-started');
    this.startedNotes = allNotes.filter(note => note.state === 'started');
    this.completedNotes = allNotes.filter(note => note.state === 'completed');
  }
}
