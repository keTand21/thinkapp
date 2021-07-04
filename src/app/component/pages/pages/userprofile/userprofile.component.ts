import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../register/register.model';
import { HomeService } from 'src/app/component/service/home.service';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
 public arrProfile : any = [];
 public massage:string = "Delete Successfully "
 public data : any = [];
 public ObjRegisterModel = RegisterModel ;
 displayedColumns: string[] = ['ID','ProductImage','ProductName','price','ProductStock','Description','Actions'];
 public dataSource :any = [];
 @ViewChild(MatTable) table: MatTable<RegisterModel> | undefined;
  constructor(
    private homeService : HomeService ,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
    this.showuser()
  }

  showuser(){
    this.homeService.getallProduct().subscribe((Response)=> {   
      this.dataSource = Response ; 
      console.log('====>',this.dataSource);
      
     })
  }
  back(){
    this.router.navigate(['/home']);
  }

  editProduct( ObjRegisterModel = RegisterModel, openDialogInMode = 'edit'){ 
      const dialogRef = this.dialog.open(RegisterComponent,
        { data: { ObjRegisterModel, openDialogInMode }, width: '800px', disableClose: true });
      dialogRef.afterClosed().subscribe(resp => {

        if (!resp) {
          return;
        } else {
           this.showuser()
        }
      });
    }
    
    deleteProduct(objParams:any) {
      this.homeService.deleteProduct(objParams).subscribe((Response)=> {
     
        alert(this.massage)
      
        this.showuser()
    
         })
    }

}
