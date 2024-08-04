import { BackgroundImage } from "./BackgroundImage";
import { ProfileImage } from "./ProfileImage";

export interface User {
 id: number;
 token: string;
 userName: string;
 email: string;
 firstName: string;
 lastName: string;
 publicEmail: string;
 education: string;
 experience: string;
 position: string;
 overview: string;
 publicPhoneNumber: string;
 age: number;
 facebookAccount: string;
 xAccount: string;
 youTubeAccount: string;
 whatsAppAccount: string;
 otherAccount: string;
 profileImages: ProfileImage[];
 backgroundImages: BackgroundImage[];
 profileImageUrl: string;
 backgroundImageUrl: string;

}
