import { Component, OnInit } from '@angular/core';

interface Definition {
  title: string;
  description: string;
  fullText: string[];
}


@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
})
export class FrontpageComponent implements OnInit {

  public definitions: Definition[] = [
    {
      title: 'FALKUSE',
      description: 'Klar til kamp',
      fullText: [
        '<b>F</b>unktionering',
        '<b>A</b>mmunition',
        '<b>L</b>ad gevær',
        '<b>K</b>ampvisir',
        '<b>U</b>drustning',
        '<b>S</b>løring',
        '<b>E</b>kstra udstyr',
      ]
    },
    {
      title: 'RAOFORM',
      description: 'Måludpegning',
      fullText: [
        '<b>R</b>etning',
        '<b>A</b>fstand',
        '<b>O</b>bjekt',
        'I <b>FOR</b>hold til',
        '<b>M</b>ål',
      ]
    },
    {
      title: 'VAMUK',
      description: 'Efter angreb.',
      fullText: [
        '<b>V</b>åben',
        '<b>A</b>mmunition',
        '<b>M</b>anden',
        '<b>U</b>drustning',
        '<b>K</b>larmelding',
      ]
    },
    {
      title: 'FADSUM',
      description: 'Optælling efter kamp',
      fullText: [
        '<b>F</b>anger',
        '<b>A</b>mmunition',
        '<b>D</b>øde',
        '<b>S</b>årede',
        '<b>U</b>drustning',
        '<b>M</b>ateriel',
      ]
    }
  ];

  constructor() { }

  ngOnInit() {}

}
