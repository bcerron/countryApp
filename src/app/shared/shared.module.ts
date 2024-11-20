import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

import { SearchBoxComponent } from './components/search-box/search-box.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [SidebarComponent, SearchBoxComponent, LoadingSpinnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, SearchBoxComponent, LoadingSpinnerComponent],
})
export class SharedModule {}
