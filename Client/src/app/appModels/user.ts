import { BackgroundImage } from "./BackgroundImage";
import { ProfileImage } from "./ProfileImage";

export interface User {
 id: number;
 firstName: string;
 lastName: string;
 email: string;
 education: string;
 experience: string;
 position: string;
 overview: string;
 phoneNumber: string;
 age: number;
 facebookLink: string;
 twitterLink: string;
 youTubeLink: string;
 profileImages: ProfileImage[];
 backgroundImages: BackgroundImage[];
}
