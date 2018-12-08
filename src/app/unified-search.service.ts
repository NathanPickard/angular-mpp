import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UnifiedSearch } from './unified-search';
import { GitSearchService } from './git-search.service';
import { GitCodeSearchService } from './git-code-search.service';

@Injectable({
  providedIn: 'root'
})
export class UnifiedSearchService {

  constructor(private searchService: GitSearchService, private codeSearchService: GitCodeSearchService) { }

  unifiedSearch: Function = (query: string): Observable<UnifiedSearch> => {

  }
}
