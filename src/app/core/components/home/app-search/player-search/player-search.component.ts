import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  OnDestroy, OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

const defaultSearchParams = {
  hd: false,
  duration: false
};

@Component({
  selector: 'player-search',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./player-search.scss'],
  template: `
    <form class="navbar-form form-search is-flex-row"
      [formGroup]="searchForm"
      >
      <input
        [value]="query"
        placeholder="Search..."
        type="search"
        class="form-control"
        autocomplete="off"
        formControlName="query">
<!--        ngxTypeahead-->
<!--        [taUrl]=""-->
<!--        [taParams]="params"-->
<!--        [taAllowEmpty]="true"-->
<!--        (taSelected)="handleSelectSuggestion($event)"-->
      <button class="search btn btn-transparent btn-submit is-flex-row is-flex-valign" title="search with echoes">
        <icon name="search"></icon>
      </button>
    </form>
      `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerSearchComponent implements OnInit, OnChanges, OnDestroy {
  @Input() query;
  @Input() searchParams = { ...defaultSearchParams };
  @Output() queryChange = new EventEmitter<string>();
  @Output() paramsChange = new EventEmitter<ISearchFormParams>();
  @Output() search = new EventEmitter();

  searchForm: FormGroup;
  filtersForm: FormGroup;
  formState: Subscription;
  filtersChanged: Subscription;

  params = {
    hl: 'en',
    ds: 'yt',
    xhr: 't',
    client: 'youtube',
    q: this.query
  };

  constructor(private fb: FormBuilder) {
    this.searchForm = fb.group({
      query: this.query
    });
    this.filtersForm = fb.group({
      ...this.searchParams
    });

    this.formState = this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        filter(value => !value.hasOwnProperty('isTrusted'))
      )
      .subscribe(formState => {
        // console.log('formState', formState);
        this.onQueryChange(formState.query);
      });
    this.filtersChanged = this.filtersForm.valueChanges.subscribe(state => {
      this.paramsChange.emit(state);
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges({ query, searchParams }: SimpleChanges) {
    if (
      query &&
      query.currentValue &&
      query.currentValue.hasOwnProperty('length')
    ) {
      this.patchFormGroup(this.searchForm, { query: query.currentValue });
    }

    if (searchParams && searchParams.currentValue) {
      const { videoDuration, videoDefinition } = searchParams.currentValue;
      const values = {
        duration: videoDuration === 'long',
        hd: videoDefinition === 'high'
      };
      this.patchFormGroup(this.filtersForm, values);
    }
  }

  ngOnDestroy() {
    this.formState.unsubscribe();
  }

  patchFormGroup(form: FormGroup, values: { [key: string]: any }) {
    form.patchValue(values, { emitEvent: false });
  }

  onQueryChange(query: string) {
    this.queryChange.emit(query);
  }

  onSearch() {
    const searchFormState = this.searchForm.value;
    this.selectSuggestion(searchFormState.query);
  }

  handleSelectSuggestion(suggestion: string) {
    this.selectSuggestion(suggestion);
  }

  selectSuggestion(suggestion: string) {
    this.query = suggestion;
    // if (!suggestion.hasOwnProperty('isTrusted')) {
    //   this.profile.emit(suggestion);
    // }
  }

  clearFilters() {
    this.paramsChange.emit({ ...defaultSearchParams });
  }
}

export interface ISearchFormParams {
  duration: boolean;
  hd: boolean;
}
