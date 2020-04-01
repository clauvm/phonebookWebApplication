import {Injectable} from '@angular/core';
import {Contact} from "./interfaces/contact";
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators'
import {PhoneNumber} from "./interfaces/phoneNumber";


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'http://localhost:3000/';
  private contactUrl = 'contact/';  // URL to web api
  private constructUrl = (url) => this.baseUrl + url;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getContacts(): Observable<Contact[]> {
    return new Observable<Contact[]>(subscriber => {
      this.http
        .get<{ message: string, data: Contact[] }>(this.constructUrl(this.contactUrl))
        .pipe(
          catchError(this.handleError<{ message: string, data: Contact[] }>('getHeroes', {message: "error", data: []}))
        )
        .subscribe((response) => {
          const contacts: Contact[] = response.data;
          subscriber.next(contacts)
        }, (error) => {
          subscriber.error(error)
        }, () => {
          subscriber.complete()
        })
    })
  }

  /**
   * Get the list of contacts stored in the database
   * @param id
   */
  getContact(id: number): Observable<Contact> {
    const url = `${this.constructUrl(this.contactUrl)}${id}`;
    return new Observable<Contact>(subscriber => {
      this.http
        .get<{ message: string, data: { contact: Contact, phoneNumbers: PhoneNumber[] } }>(url)
        .pipe(
          catchError(this.handleError<{ message: string, data: { contact: Contact, phoneNumbers: PhoneNumber[] } }>('getContacts', {
            message: "error",
            data: null
          }))
        )
        .subscribe((response) => {
          const contact: Contact = response.data.contact;
          subscriber.next({...contact, phoneNumbers: response.data.phoneNumbers})
        }, (error) => {
          subscriber.error(error)
        }, () => {
          subscriber.complete()
        })
    })
  }

  /**
   * Get the list of contacts that match the text inserted in the search field
   * @param key
   */
  getContactByKey(key: string): Observable<Contact[]> {
    const url = `${this.constructUrl(this.contactUrl)}key/${key}`;
    return new Observable<Contact[]>(subscriber => {
      this.http
        .get<{ message: string, data: Contact[] }>(url)
        .pipe(
          catchError(this.handleError<{ message: string, data: Contact[] }>('getContacts', {
            message: "error",
            data: null
          }))
        )
        .subscribe((response) => {
          const contacts: Contact[] = response.data;
          subscriber.next(contacts)
        }, (error) => {
          subscriber.error(error)
        }, () => {
          subscriber.complete()
        })
    })
  }

  /**
   * Update a contact's information
   * @param contact
   */
  updateContact(contact: Contact): Observable<any> {
    const url = `${this.constructUrl(this.contactUrl)}${contact.id}`;
    return new Observable<any>(subscriber => {
      return this.http.put(url, contact, this.httpOptions).pipe(
        catchError(this.handleError<any>('update contact'))
      )
        .subscribe(data => {
          subscriber.next(data.response)
        })
    })
  }

  /**
   * Add a new contact
   * @param contact
   */
  addContact(contact: Contact): Observable<any> {
    const url = `${this.constructUrl(this.contactUrl)}phoneNumbers`;
    return new Observable<any>(subscriber => {
      return this.http.post(url, contact, this.httpOptions).pipe(
        catchError(this.handleError<any>('create contact'))
      )
        .subscribe(data => {
          subscriber.next(data.response)
        })
    })
  }

}
