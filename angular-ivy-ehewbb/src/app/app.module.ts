import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatCheckboxModule,
    MatCardModule,
    RouterModule.forRoot([])
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
