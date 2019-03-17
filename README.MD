# ngx-async

Bind observable to class property.
Unlike async pipe it works in component.


## Demo

[Live example on stackblitz](https://stackblitz.com/edit/angular-ngx-async-demo)


## Install

`npm install ngx-async`


## Usage

component.ts
```typescript
import { Component, OnDestroy } from '@angular/core';

import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

import { Async } from 'ngx-async';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy {
  @Async currentTime = interval(1000).pipe(
    map(() => Date.now()),
  );

  ngOnDestroy() {
    // assign null for unsubscribe
    this.currentTime = null;
  }
}
```

component.html
```html
   <p>Now {{ currentTime | date:'HH:mm:ss' }}</p>
```
