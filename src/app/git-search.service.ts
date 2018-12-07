import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

import { GitSearch } from './git-search';
import { GitUsers } from './git-users';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedSearches: string;
  search: Observable<GitSearch>;
  cachedUsers: Array<{
    [query: string]: GitUsers
  }> = [];

  constructor(private http: HttpClient) { }

  gitSearch: Function = (query: string): Observable<GitSearch> => {
    if (!this.search) {
      this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query)
        .publishReplay(1)
        .refCount();
        this.cachedSearches = query;
    }
    else if (this.cachedSearches !== query) {
      this.search = null;
      this.gitSearch(query);
    }
    return this.search;
  }

  gitUsers = (query: string): Promise<GitUsers> => {
    let promise = new Promise<GitUsers>((resolve, reject) => {
      if (this.cachedUsers[query]) {
        resolve(this.cachedUsers[query])
      }
      else {
        this.http.get('https://api.github.com/search/users?q=' + query)
          .toPromise()
          .then((response) => {
            resolve(response as GitUsers)
          }, (error) => {
            reject(error);
          })
      }
    })
    return promise;
  }
}
