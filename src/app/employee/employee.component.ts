import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model'

declare var M :any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers : [EmployeeService]
})


export class EmployeeComponent implements OnInit {

  
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm){
    if(form)
    form.reset();
    this.employeeService.selectedEmployee = {
      _id:"",
      name :"",
      position :"",
      office :"",
      salary :null
    }
  }

  onEdit(emp : Employee){
    console.log(emp);
    this.employeeService.selectedEmployee = emp;

  }

  onSubmit(form : NgForm){
    if(form.value._id ==""){
    this.employeeService.postEmployee(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({ html : 'Saved Successfully', classes : "rounded"})
    });
  }
  else{
    this.employeeService.putEmployee(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({ html : 'Updated Successfully', classes : "rounded"})
    });

  }
  }

  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res)=>{
      this.employeeService.employees = res as Employee[];
    });
  }

  onDelete(_id:string, form :NgForm){
   if(confirm('Are you sure you want to delete this employee?')==true){
    this.employeeService.deleteEmployee(_id).subscribe((res)=>{
      this.refreshEmployeeList();
      this.resetForm(form);
      M.toast({html : 'Deleted Successfully', classes : 'rounded'});
    });
  }

   }
  }
