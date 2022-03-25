import { Component, OnInit } from '@angular/core';
import { Voucher } from '../voucher.model';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { VoucherComponent } from '../voucher/voucher.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {

  id = this.route.snapshot.paramMap.get('id');
  url = this.route.root.url;

  voucherObj = new Voucher();
  voucherTable!: Voucher[]

  constructor(public apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    console.log("abc ",this.url);
    this.apiService.selectedOption = this.id;
    this.apiService.isSelect = true;
    this.apiService.getVoucher()
      .subscribe(data => {
        this.voucherTable = data;
        // if (this.voucherTable.length == 0) {
        //   // console.log("Data not found");
        //   this.router.navigate([''])
        // } else {
        //   console.log(this.voucherTable);
        // }
      })
  }

  onUpdate(form: NgForm, data: any) {
    data.no = Number(data.no);
    data.debit = Number(data.debit);
    this.apiService.updateVoucher(data, this.id)
      .subscribe(data => {
        form.resetForm();
        this.router.navigate([''])
      })
  }
}
