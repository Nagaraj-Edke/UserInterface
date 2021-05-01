import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/Service/database.service';
import { passwordValidators } from '../Validators/password.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:DatabaseService) { }
  registerForm:FormGroup;

  get firstname(){
    return this.registerForm.get('firstname')
  }
  get lastname(){
    return this.registerForm.get('lastname')
  }
  get email(){
    return this.registerForm.get('email')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get confirmPassword(){
    return this.registerForm.get('confirmPassword')
  }
  get register(){
    return this.registerForm;
  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname :new FormControl('',[Validators.required]),
      lastname:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmPassword:new FormControl('',[Validators.required]),
      phoneNo:new FormControl('')
    },{ validators: passwordValidators})
  }
  onSubmit(){

    if(this.registerForm.invalid){
      console.log("invalid");
      
    }
    else{
    console.log(this.registerForm.value);
    this.service.enroll(this.registerForm.value).subscribe(res=>{
      console.log(res);     
    },err=>{console.log(err);
    })

    }
    
  }

}
