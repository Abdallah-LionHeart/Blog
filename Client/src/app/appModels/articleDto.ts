import { ImageDto } from "./imageDto";
import { VideoDto } from "./videoDto";

export interface ArticleDto {
 id: number;
 title: string;
 content: string;
 publishDate: Date;
 headline: string;
 isEvent: boolean;
 youTubeLink: string;
 facebookLink: string;
 images: ImageDto[];
 videos: VideoDto[];
}