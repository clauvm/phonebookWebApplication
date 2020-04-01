import {Component, OnInit, Input} from '@angular/core';
import {Contact} from "../interfaces/contact";
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ContactService} from "../contact.service";
import {Subscription} from "rxjs";
import {PhoneNumber} from "../interfaces/phoneNumber";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  @Input() contact: Contact = {
    name: '',
    last_name: '',
    phoneNumbers: []
  };
  @Input() edit: boolean;
  @Input() create: boolean;
  sub: Subscription;
  phoneNumbers: PhoneNumber[] = [];
  phoneNumberCreate: PhoneNumber = {number: ''};
  regexp = new RegExp('\\+[0-9]+\\s[0-9]+\\s[0-9]{6,}$'); //Regular expresion that matches th condition regarding the format of the phone number
  contactForm: FormGroup;
  checkPhonenumber: boolean = false;
  phone: any;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.sub = this.route
      .data
      .subscribe(v => {
        this.edit = v.edit;
        this.create = v.create;
        if (!this.create) {
          this.getContact();
        }
      });
  }

  /**
   * Get the list of contacts in the database
   */
  getContact(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.contactService.getContact(id)
      .subscribe(contact => {
        this.contact = contact;
      });
  }

  /**
   * Save the information in the form, it can create a new contact or update an existing one
   */
  save(): void {
    if (this.edit) {
      this.contactService.updateContact(this.contact)
        .subscribe(() => this.goBack());
    } else {
      this.addPhoneNumber();
      this.contactService.addContact(this.contact)
        .subscribe(() => this.goBack());
    }
  }

  /**
   * Go to the previous location
   */
  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Add a new contact
   * @param contact
   */
  addPhoneNumber() {
    let phoneToAdd: PhoneNumber = JSON.parse(JSON.stringify(this.phoneNumberCreate));
    if (this.edit) {
      phoneToAdd.contact_id = this.contact.id;
    }
    this.contact.phoneNumbers.push(phoneToAdd);
    this.phoneNumberCreate.number = '';
  }

  /**
   * Check whether the phone number inserted meets the established conditions
   */
  checkPhone() {
    this.checkPhonenumber = this.regexp.test(this.phoneNumberCreate.number);
  }
}
