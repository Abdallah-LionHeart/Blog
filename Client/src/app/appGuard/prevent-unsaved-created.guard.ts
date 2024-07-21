import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { ArticleCreateComponent } from '../appArticle/article-create/article-create.component';
import { CacheService } from '../appService/cache.service';
import { ConfirmService } from '../appService/confirm.service';

export const preventUnsavedCreatedGuard: CanDeactivateFn<ArticleCreateComponent> = (component) => {
  const confirmService = inject(ConfirmService);
  const cacheService = inject(CacheService);
  const formData = cacheService.getData('articleForm')



  if (formData && (component.articleForm.dirty || component.articleForm.touched || Object.values(formData).some(value => typeof value === 'string' && value.trim() !== ''))) {
    return confirmService.confirm();
  }

  return true;
};