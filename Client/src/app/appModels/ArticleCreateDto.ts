export interface ArticleCreateDto {
 title: string;
 content: string;
 headline: string;
 isEvent: boolean;
 youTubeLink: string;
 facebookLink: string;
 images: File[];
 videos: File[];
}