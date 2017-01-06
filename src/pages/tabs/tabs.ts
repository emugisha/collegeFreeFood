import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {NewPostPage} from "../new-post/new-post";
import {ExplorePage} from "../explore/explore";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = NewPostPage;
  tab3Root: any = ExplorePage;

  constructor() {

  }
}
