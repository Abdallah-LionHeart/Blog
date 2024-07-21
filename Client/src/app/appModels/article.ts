import { ImageDto } from "./imageDto";
import { VideoDto } from "./videoDto";


export interface Article {
 id: number;
 title: string;
 headline: string;
 content: string;
 isEvent: Boolean;
 publishDate: Date;
 images: ImageDto[];
 videos: VideoDto[];
 youTubeLink: string;
 facebookLink: string;
 createdAt: Date;
 updatedAt: Date;
}