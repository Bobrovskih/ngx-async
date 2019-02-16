# ngx-async

Bind observable to class property.
Unlike async pipe it works in component.


## Install
`npm install ngx-async`


## Demo
[Live example on stackblitz](https://stackblitz.com/edit/angular-msfh9g)


## Usage

component.ts
```typescript
import { Component } from '@angular/core';

import { interval } from 'rxjs';
import { map } from 'rxjs/operators'

import { Async } from 'ngx-async';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  @Async currentTime = interval(1000).pipe(
    map(() => Date.now()),
  )
}
```

component.html
```html
   <p>Now {{ currentTime | date:'HH:mm:ss' }}</p>
```
