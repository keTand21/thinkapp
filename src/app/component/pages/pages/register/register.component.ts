import { Component, OnInit } from '@angular/core';

import { Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {MatChipInputEvent} from '@angular/material/chips';
import { HomeService } from 'src/app/component/service/home.service';
import {CustomValidation} from '../../../validation/validation-massages' ;
import { RegisterModel } from './register.model';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/component/validation/custom.validator';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

public massage:string = "Product Add Successfully "
  public url: any ;
  CustomValidator = CustomValidation ;
  registerForm: FormGroup;
  isFormSaving: boolean | undefined;
  openDialogInMode!: string;
  customerForm: any;
  public objCustomerModel :string | undefined ;
  public ObjRegisterModel = RegisterModel ;
  public stock:boolean |undefined ;

  constructor(public dialogRef: MatDialogRef<any> ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private homeService : HomeService ,
    private router: Router

  ) { 

    {
      this.registerForm = fb.group({
        id :  [  this.ObjRegisterModel.id ],
        ProductImage: [this.ObjRegisterModel.ProductImage, [Validators.required] ],
        ProductName: [this.ObjRegisterModel.ProductName,[Validators.required,
        Validators.minLength(2), Validators.maxLength(20)]],
        ProductDescription: [ this.ObjRegisterModel.ProductDescription, [Validators.required,
        Validators.minLength(2), Validators.maxLength(255)]],
        price: [ this.ObjRegisterModel.price,[Validators.required]],
        ProductStock : [ this.ObjRegisterModel.ProductStock,[Validators.required]],

      });
  }

  }

  ngOnInit(){
    if(this.data.ObjRegisterModel){
    this.openDialogInMode = this.data.openDialogInMode;
    this.ObjRegisterModel = this.data.ObjRegisterModel;
    console.log('edit==>',this.ObjRegisterModel);
    this.url = this.ObjRegisterModel.ProductImage;
    this.onBuildForm();
    }
  }

  onBuildForm(){

    this.registerForm = this.fb.group({
      id :  [  this.ObjRegisterModel.id ],
      ProductImage: [this.ObjRegisterModel.ProductImage, [Validators.required] ],
      ProductName: [this.ObjRegisterModel.ProductName,[Validators.required, 
      Validators.minLength(2), Validators.maxLength(20)]],
      ProductDescription: [ this.ObjRegisterModel.ProductDescription, [Validators.required,
      Validators.minLength(2), Validators.maxLength(255)]],
      price: [ this.ObjRegisterModel.price,[Validators.required]],
      ProductStock : [ this.ObjRegisterModel.ProductStock,[Validators.required]],

    });
 
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  onSelectFile(event :any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); 
      
      reader.onload = (event :any) => { 
        this.url = event.target.result;
     
      }
    }
  }
  onCancel(event :any){
    this.dialogRef.close();
  }
  productStock(event:any){
    if(event){
      this.stock = false ;
    }else{
      this.stock = true ;
    } 
  }

  onSave(){
    if(this.registerForm.value.ProductStock == null){
      this.stock = true ;
    }else {
      this.stock = false ;
    }
    this.homeService.markAsTouched(this.registerForm.controls);
      if (this.registerForm.valid) {
      const objParams = this.registerForm.value;
      objParams['ProductImage'] = this.url ;
      
      if(this.registerForm.value.id){

        this.homeService.updateProduct(objParams).subscribe((Response)=> {
          this.dialogRef.close(Response);
          alert(this.massage)
        
    
           this.router.navigate(['/productDetalis']);
           })

      }else{
      
       this.homeService.addProduct(objParams).subscribe((Response)=> {
         
        this.dialogRef.close(Response);
          alert(this.massage)

          
           this.router.navigate(['/productDetalis']);
           })

         }
        }
    }

}


