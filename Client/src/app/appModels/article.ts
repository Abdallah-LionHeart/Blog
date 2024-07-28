import { ImageDto } from "./imageDto";
import { VideoDto } from "./videoDto";


export interface Article {
 id: number;
 title: string;
 headline: string;
 content: string;
 isEvent: Boolean;
 publishDate: string;
 images: ImageDto[];
 videos: VideoDto[];
 youTubeLink: string | null;
 facebookLink: string |null ;
}
