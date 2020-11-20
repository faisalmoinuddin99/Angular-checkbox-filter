import { Component } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Crop } from "./crop.model";
import { CropService } from "./crop.service";

interface Filter {
  name: string;
  checked: boolean;
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  crops$: Observable<Crop[]>;
  filteredCrops$: Observable<Crop[]>;
  nameFilters$ = new BehaviorSubject<Filter[]>([]);
  districtFilters$ = new BehaviorSubject<Filter[]>([]);

  constructor(private cropService: CropService) {}
  ngOnInit(): void {
    this.crops$ = this.cropService.getAllCrops().pipe(
      tap(crops => {
        const names = Array.from(new Set(crops.map(crop => crop.name)));
        this.nameFilters$.next(
          names.map(name => ({ name, checked: true } as Filter))
        );
        const dictricts = Array.from(new Set(crops.map(crop => crop.district)));
        this.districtFilters$.next(
          dictricts.map(name => ({ name, checked: true } as Filter))
        );
      })
    );
    this.filteredCrops$ = combineLatest(
      this.crops$,
      this.nameFilters$,
      this.districtFilters$
    ).pipe(
      map(
        ([crops, nameFilters, districtFilters]: [
          Crop[],
          Filter[],
          Filter[]
        ]) => {
          let items = [...crops];
          items = items.filter(item => {
            const associatedNameFilter = nameFilters.find(
              filter => filter.name === item.name
            );
            const associatedDistrictFilter = districtFilters.find(
              filter => filter.name === item.district
            );
            return (
              associatedNameFilter.checked && associatedDistrictFilter.checked
            );
          });
          return items;
        }
      )
    );
  }

  onNameFilterChange(item) {
    this.nameFilters$.value.find(
      filter => filter.name === item.name
    ).checked = !item.checked;
    this.nameFilters$.next([...this.nameFilters$.value]);
  }

  onDistrictFilterChange(item) {
    this.districtFilters$.value.find(
      filter => filter.name === item.name
    ).checked = !item.checked;
    this.districtFilters$.next([...this.districtFilters$.value]);
  }
}
