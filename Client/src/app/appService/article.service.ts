import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../appModels/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllArticles() {
    return this.http.get<Article[]>(`${this.baseUrl}/articles`);
  }

  getArticleById(id: number) {
    return this.http.get<Article>(`${this.baseUrl}/articles/${id}`);
  }

  addArticle(article: Article) {
    return this.http.post<Article>(`${this.baseUrl}/articles`, article);
  }

  updateArticle(id: number, article: Article) {
    return this.http.put<Article>(`${this.baseUrl}/articles/${id}`, article);
  }

  deleteArticle(id: number) {
    return this.http.delete(`${this.baseUrl}/articles/${id}`);
  }

  addImage(articleId: number, image: File) {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post(`${this.baseUrl}/articles/${articleId}/images`, formData);
  }

  addVideo(articleId: number, video: File) {
    const formData = new FormData();
    formData.append('file', video);
    return this.http.post(`${this.baseUrl}/articles/${articleId}/videos`, formData);
  }

  addYoutubeVideo(articleId: number, videoUrl: string) {
    return this.http.post(`${this.baseUrl}/articles/${articleId}/videos`, { url: videoUrl, isExternal: true });
  }
}
