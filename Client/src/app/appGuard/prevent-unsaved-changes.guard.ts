import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { ArticleEditComponent } from '../appArticle/article-edit/article-edit.component';
import { ConfirmService } from '../appService/confirm.service';

export const preventUnsavedChangesGuard: CanDeactivateFn<ArticleEditComponent> = (component) => {
  const confirmService = inject(ConfirmService);

  if (component.articleForm?.dirty || component.articleForm.touched) {
    return confirmService.confirm();
  }

  return true;
};
