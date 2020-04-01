import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../interfaces/contact';
import {ContactService} from '../contact.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private searchUpdated: Subject<any> = new Subject();
  contacts: Contact[];
  searchWord: string;
  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.getContacts()
      .subscribe(() => {
        this.searchUpdated
          .pipe(
            debounceTime(300)
          )
          .subscribe((val: string) => {
            if(val === ''){
              this.getContacts().subscribe((contacts)=>{});
            }
            else{
              this.getContactsByKeyword(val).subscribe((contacts)=>{});
            }
          });
      });

  }

  /**
   * Updates the search field
   * @param value
   */
  onSearchType(value) {
    this.searchUpdated.next(value);
  }

  /**
   * Get the list of contacts in the database
   */
  getContacts(): Observable<any> {
    return new Observable<any>(observer => {
      this.contactService.getContacts().subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        observer.next();
      });
    });
  }

  /**
   * Get the list of contacts that match the text inserted in the search field
   * @param key
   */
  getContactsByKeyword(key: string): Observable<any> {
    return new Observable<any>(observer => {
      this.contactService
        .getContactByKey(key)
        .subscribe((contacts: Contact[]) => {
          this.contacts = contacts;
          observer.next();
        });
    });
  }
}
