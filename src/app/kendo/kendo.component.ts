import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { categories } from '../data.categories';
import { PageChangeEvent } from "@progress/kendo-angular-grid";
import { SortDescriptor } from "@progress/kendo-data-query";
import { ProductService } from "../product.service";
import { Observable } from "rxjs";
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { PopupService } from '@progress/kendo-angular-popup';
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import { NotificationService } from '@progress/kendo-angular-notification';
import { BottomNavigationSelectEvent } from '@progress/kendo-angular-navigation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kendo',
  templateUrl: './kendo.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./kendo.component.css'],
  providers: [ProductService
    // , {provide: RTL, useValue: true} // right to left 
  ]
})
export class KendoComponent implements OnInit {

  public gridItems!: Observable<any>;
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: any = null;
  public todayDate!: Date;

  constructor(private service: ProductService,
    private renderer: Renderer2,
    private notification: NotificationService,
    private popupService: PopupService,
    private router: Router) {
    this.loadGridItems();

    this.bottomArr = this.mapItems(router.config);
    this.bottomArr[0].selected = true;
  }

  ngOnInit(): void {
    this.todayDate = new Date();
  }

  //grid
  public dropDownItems = categories;
  public defaultItem = { text: "Filter by Category", value: null };

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadGridItems();
  }

  private loadGridItems(): void {
    this.gridItems = this.service.getProducts(
      this.skip,
      this.pageSize,
      this.sortDescriptor,
      this.filterTerm
    );
  }

  public handleSortChange(descriptor: SortDescriptor[]): void {
    this.sortDescriptor = descriptor;
    this.loadGridItems();
  }

  public handleFilterChange(item: {
    text: string;
    value: number | null;
  }): void {
    this.filterTerm = item.value;
    this.skip = 0;
    this.loadGridItems();
  }

  // datepicker
  public min: Date = new Date(2020, 1 - 1, 1);
  public max: Date = new Date(2030, 12 - 1, 31);
  public value: Date = (new Date(2022, 11, 3));

  public disabledDates = (date: Date): boolean => {
    return (date.getDate() > (new Date()).getDate());
    // return date.getDay() >
  };

  // popup
  public show = false;
  @ViewChild('abc') public abc!: ElementRef;
  @ViewChild('pop', { read: ElementRef }) public pop!: ElementRef;

  popup() {
    this.show = !this.show;
  }

  public get animate(): any {
    return {
      type: "zoom",
      direction: "left",
      duration: 300
    };
  }

  // on esc 
  @HostListener('keydown', ['$event'])
  public keydown(event: any): void {
    if (event.keyCode === 27) {
      this.show = false;
    }
  }

  // on mouse click
  @HostListener('document:click', ['$event'])
  public documentClick(event: any): void {
    if (!(this.abc.nativeElement.contains(event.target) || this.pop.nativeElement.contains(event.target))) {
      // if (!this.contains(event.target)) {
      this.show = false;
    }
  }

  // private contains(target: any): boolean {
  //   return (
  //     this.abc.nativeElement.contains(target) || this.pop.nativeElement.contains(target) 
  //   );
  // }
  // close(){
  //   this.show = false;
  // }

  // dropdown
  public listItems: Array<string> = [
    'Baseball', 'Basketball', 'Cricket', 'Field Hockey',
    'Football', 'Table Tennis', 'Tennis', 'Volleyball'
  ];

  // window and dialog
  public windowOpened = false;
  public dialogOpened = false;

  public open(comp: String) {
    if (comp == "dialog") {
      this.dialogOpened = true;
    }
    if (comp == "window") {
      this.windowOpened = true;
    }
  }
  close(comp: String) {
    if (comp == "dialog") {
      this.dialogOpened = false;
    }
    if (comp == "window") {
      this.windowOpened = false;
    }
  }
  action(action: String) {
    // console.log(action);
    this.dialogOpened = false;
  }

  // filesaver
  public name: String = ""

  download(name: String) {
    const dataURI = "data:text/plain;base64," + encodeBase64("Hello " + name);
    // saveAs(dataURI, name + ".txt");
    this.notification.show({
      content: "Your file has been saved.",
      cssClass: "button-notification",
      position: {horizontal: "center", vertical:"bottom"},
      animation: {type:"slide", duration: 300},
      type: {style:"success", icon: true},
      closable: true,
      width: 250,
    });
  }

  //option menu and context menu
  public items: any[] = items;

  //bottom navigation
  public bottomArr!: any[];

  public onSelect(ev: BottomNavigationSelectEvent): void {
    this.router.navigate([ ev.item.path ]); 
  }

  public mapItems(routes: any[]): any[] {
    return routes.map(item => {
        return {
            text: item.text,
            path: item.path ? item.path : ''
        };
    });
}

//sortable

public sortable: string[] = [
  'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'
];

//masked textbox
public maskedValue = ""
public mask = "(000)-000-000-000";

}

//option menu and context menu
export const items: any[] = [
  {
    text: 'Item1',
    items: [
      { text: 'Item1.1' },
      {
        text: 'Item1.2',
        items: [{ text: 'Item1.2.1' }, { text: 'Item1.2.2' }],
      },
    ],
  },
  {
    text: 'Item2',
    items: [{ text: 'Item2.1' }, { text: 'Item2.2' }, { text: 'Item2.3' }],
  },
  {
    text: 'Item3',
  },
];


