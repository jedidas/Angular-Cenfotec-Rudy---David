import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CONFIG } from 'src/app/config';



export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, CONFIG.i18nPath, `.json?updated=${new Date().getTime()}`);
}
