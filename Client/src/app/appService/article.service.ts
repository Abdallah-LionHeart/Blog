import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../appModels/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl = environment.apiUrl + 'articles';

  constructor(private http: HttpClient) { }

  getAllArticles() {
    return this.http.get<Article[]>(this.baseUrl);
  }

  getArticleById(id: number) {
    return this.http.get<Article>(this.baseUrl + id);
  }

  addArticle(article: Article) {
    return this.http.post<Article>(this.baseUrl, article);
  }

  updateArticle(id: number, article: Article) {
    return this.http.put<Article>(this.baseUrl + id, article);
  }

  deleteArticle(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

  addImage(articleId: number, image: File) {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post(this.baseUrl + articleId + '/images', formData);
  }

  addVideo(articleId: number, video: File) {
    const formData = new FormData();
    formData.append('file', video);
    return this.http.post(this.baseUrl + articleId + '/videos', formData);
  }

  addYoutubeVideo(articleId: number, videoUrl: string) {
    return this.http.post(`${this.baseUrl}/articles/${articleId}/videos`, { url: videoUrl, isExternal: true });
  }
}
