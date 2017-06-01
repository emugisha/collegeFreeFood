import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

/*
 app with chrome dev tools: chrome://inspect/#devices
 Launch the app via ionic run android --device
*/
