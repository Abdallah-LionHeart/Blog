import { Image } from "./image";
import { Video } from "./video";

export class Article {
 id!: number;
 title!: string;
 headline!: string;
 content!: string;
 isEvent!: Boolean;
 publishDate!: Date;
 images!: Image[];
 videos!: Video[];
 youTubeLink!: string;
 facebookLink!: string;
 createdAt!: Date;
 updatedAt!: Date;
}