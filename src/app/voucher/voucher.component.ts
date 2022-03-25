import { Component, OnInit } from '@angular/core';
import {  NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Voucher } from '../voucher.model';
import { fadeInAnimation } from '../_animation/fade-in.animation';
import { AuthguardServiceService } from '../authguard-service.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  voucherArr!: Voucher[]; //select option
  voucherTable: any[] = []; //display 
  voucher = new Voucher();
  select: any;
  search: any;
  curPage: any;
  pageSize: any;
  length: any;
  deleteConfirm = "none";
  todayDate = new Date() ;
  maxDate = {year: this.todayDate.getFullYear(), month: this.todayDate.getMonth(), day: this.todayDate.getDate()};

  constructor(public apiService: ApiService,
    public router: Router,
    public formBuilder: FormBuilder,
    public authguard: AuthguardServiceService) {

     }

  ngOnInit(): void {
    console.log( this.todayDate.getFullYear(),  this.todayDate.getMonth(),  this.todayDate.getDate());
    // this.voucherForm = this.formBuilder.group({
    //   no: ['',Validators.required]
    // })

    this.apiService.isSearch = false;
    this.apiService.isSelect = false;
    this.getVoucherTable(); //display 
    this.getVoucher(); //select option
    this.curPage = 1;
    this.pageSize = 3;
  }

  getVoucher() {
    this.apiService.getVoucher()
      .subscribe(data => {
        // console.log(data);
        this.voucherArr = data;
      })
  }

  getVoucherTable() {
    this.apiService.getVoucher()
      .subscribe(data => {
        this.voucherTable = data;
      })
  }

  onSelect(event: any) {
    this.apiService.isSelect = true;
    this.apiService.selectedOption = event.target.value;
    this.getVoucherTable();
  }

  // deleteVoucher(id: any){
  //   this.apiService.deleteVoucher()
  //   .subscribe( data =>{
  //     // console.log(data)
  //     this.getVoucherTable();
  //   }     
  //   );
  // }

  deleteVoucher(id: any) {
    this.apiService.deleteVoucher(id)
      .subscribe((data) => {
        console.log("Data deleted");
        this.getVoucherTable();
        this.getVoucher();
        this.closePopup();
      })
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    this.voucher.no = Number(this.voucher.no);
    this.voucher.debit = Number(this.voucher.debit);

    // temp = this.voucher.debit;
    this.apiService.addVoucher(this.voucher)
      .subscribe(data => {
        console.log(data);
        this.getVoucherTable();
        this.getVoucher();
        form.resetForm();
      })
  }

  searchVoucher(search: any) {
    this.apiService.isSearch = true;
    this.apiService.search = search;
    this.apiService.getVoucher()
      .subscribe(data => {
        this.voucherTable = data;
        console.log(data);
      })
  }

  numberOfPages() {
    this.length = this.voucherTable.length;
    return Math.ceil(this.length / this.pageSize);
  }

  openPopup() {
    this.deleteConfirm = "block";
  }

  closePopup() {
    this.deleteConfirm = "none";
  }

  sortVoucher(col: any) {
    this.apiService.sort = !this.apiService.sort
    this.apiService.sortBy = col
    this.getVoucherTable();
  }

  logout(){
    this.router.navigate(['/login']);
    this.authguard.logout();
  }

  public listItems: Array<string> = [
    'Baseball', 'Basketball', 'Cricket', 'Field Hockey',
    'Football', 'Table Tennis', 'Tennis', 'Volleyball'
  ];

}


