import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import {IonReorderGroup, ModalController} from '@ionic/angular';
import {Observable, of} from 'rxjs';
import {Definition, DefinitionsService} from '../../services/definitions.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  public definitions$: Observable<Definition[]>;

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;


  constructor(
    private modalController: ModalController,
    private definitionsService: DefinitionsService,
  ) { }

  ngOnInit() {
    this.definitions$ = of(this.definitionsService.definitions);
  }


  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
