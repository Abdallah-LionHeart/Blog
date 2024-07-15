import { AppUserImage } from "./app-user-image";

export class User {
 id!: string;
 firstName!: string;
 lastName!: string;
 businessEmail!: string;
 education!: string;
 experience!: string;
 position!: string;
 overview!: string;
 publicPhoneNumber!: string;
 age!: number;
 facebookLink!: string;
 twitterLink!: string;
 youTubeLink!: string;
 profileImages!: AppUserImage[];
 backgroundImages!: AppUserImage[];
}