import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../appModels/article';
import { ArticleCreateDto } from '../appModels/ArticleCreateDto';
import { ArticleDto } from '../appModels/articleDto';
import { ArticleParams } from '../appModels/articleParams';
import { ArticleUpdateDto } from '../appModels/ArticleUpdateDto';
import { PaginatedResult } from '../appModels/Pagination';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl = environment.apiUrl + 'articles/';
  articleParams = new ArticleParams();
  // productCache = new Map<string, Pagination<Product[]>>();

  constructor(private http: HttpClient) { }

  getAllArticles() {
    return this.http.get<Article[]>(this.baseUrl);
  }


  getPaginatedArticles(articleParams: ArticleParams) {
    let params = this.getPaginationHeaders(articleParams.pageNumber, articleParams.pageSize);
    params = params.append('orderBy', articleParams.orderBy);
    if (articleParams.search) params = params.append('search', articleParams.search)

    return this.getPaginatedResult<Article[]>(this.baseUrl + 'paginated', params)
  }


  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return params;
  }



  setArticleParams(params: ArticleParams) {
    this.articleParams = params;
  }
  getArticleParams() {
    return this.articleParams;
  }

  // getPaginatedArticles(page?: number, itemsPerPage?: number) {
  //   let params = new HttpParams();
  //   if (page && itemsPerPage) {
  //     params = params.append('pageNumber', page);
  //     params = params.append('pageSize', itemsPerPage);
  //   }
  //   return this.http.get<Article[]>(this.baseUrl + 'paginated', { observe: 'response', params }).pipe(
  //     map(response => {
  //       if (response.body) {
  //         this.paginatedResult.result = response.body;
  //       }
  //       const pagination = response.headers.get('Pagination');
  //       if (pagination) {
  //         this.paginatedResult.pagination = JSON.parse(pagination);
  //       }
  //       return this.paginatedResult;
  //     })
  //   )
  // }

  getAllEvents() {
    return this.http.get<ArticleDto[]>(this.baseUrl + 'events');
  }

  getArticleById(id: number) {
    return this.http.get<Article>(this.baseUrl + id);
  }

  // addArticle(article: ArticleCreateDto) {
  //   const formData = this.prepareFormData(article);
  //   return this.http.post<ArticleDto>(this.baseUrl + 'add-article', formData);
  // }

  addArticle(article: Article, images: File[], videos: File[]) {
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('content', article.content);
    formData.append('headline', article.headline);
    formData.append('isEvent', article.isEvent.toString());
    // formData.append('youTubeLink', article.youTubeLink);
    // formData.append('facebookLink', article.facebookLink);

    images.forEach((image, index) => {
      formData.append('images', image, `image_${index}`);
    });

    videos.forEach((video, index) => {
      formData.append('videos', video, `video_${index}`);
    });

    return this.http.post<Article>(this.baseUrl + 'add-article', formData);
  }

  // updateArticle(id: number, article: ArticleUpdateDto) {
  //   const formData = this.prepareFormData(article);
  //   return this.http.put<ArticleDto>(this.baseUrl + id, formData);
  // }

  updateArticle(id: number, article: Article, images: File[], videos: File[]) {
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('content', article.content);
    formData.append('headline', article.headline);
    formData.append('isEvent', article.isEvent.toString());
    // formData.append('youTubeLink', article.youTubeLink);
    // formData.append('facebookLink', article.facebookLink);

    images.forEach((image, index) => {
      formData.append('images', image, `image_${index}`);
    });

    videos.forEach((video, index) => {
      formData.append('videos', video, `video_${index}`);
    });

    return this.http.put<Article>(this.baseUrl + id, formData);
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
    return this.http.post(this.baseUrl + 'articleId ' + '/videos', { url: videoUrl, isExternal: true });
  }

  searchArticles(searchTerm: string, pageNumber: number, pageSize: number, filter: string) {
    return this.http.get<PaginatedResult<ArticleDto>>(this.baseUrl + 'search', {
      params: {
        searchTerm,
        pageNumber: pageNumber,
        pageSize: pageSize,
        filter
      }
    });
  }

  private prepareFormData(article: ArticleCreateDto | ArticleUpdateDto): FormData {
    const formData = new FormData();
    const articleEntries = article as unknown as { [key: string]: any };

    for (const key in articleEntries) {
      if (articleEntries.hasOwnProperty(key)) {
        const value = articleEntries[key];
        if (Array.isArray(value)) {
          value.forEach(file => formData.append(key, file));
        } else {
          formData.append(key, value);
        }
      }
    }
    return formData;
  }
}
