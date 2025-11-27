import { Component } from '@angular/core';
import { Box } from '../../model/box';
import { BoxService } from '../../service/box.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [
    FormsModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  boxes: Box[] = [];
  newBox: Box = { label: '', color: '' };
  editBox: Box | null = null;

  constructor(private boxService: BoxService) {}

  ngOnInit() {
    this.load();
  }

  // Reloads the Box[] from the Backend
  load() {
    this.boxService.getAll().subscribe(data => this.boxes = data);
  }

  create() {

    // Return if the newBox is missing a Label
    if (!this.newBox.label) return;

    // After Box Creation, Reset the newBox to default values
    this.boxService.createBox(this.newBox).subscribe(() => this.resetNewBox());
  }

  // Reset the newBox to default values
  resetNewBox() {
    this.newBox = { label: '', color: '#ff0000' };
    this.load();
  }

  startEdit(b: Box) {
    this.editBox = { ...b };
  }

  saveEdit() {
    if (!this.editBox?.id) return;

    // After Update, Reset the editBox Object
    this.boxService.updateBox(this.editBox).subscribe(() => this.resetEditBox());
  }

  // Resets the editBox in preparation for the next potential edit
  resetEditBox() {
    this.editBox = null;
    this.load();
  }

  // Empties the editBox to remove the Edit Menu
  cancelEdit() {
    this.editBox = null;
  }

  deleteBox(id?: number) {
    if (!id) return;

    // After deletion, reload the Box[] Array
    this.boxService.deleteBox(id).subscribe(() => this.load());
  }
}
