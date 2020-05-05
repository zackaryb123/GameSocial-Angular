export class PostModel {
  name?: string;
  profileUrl?: string;
  date?: Date;
  post?: string;
  img?: string;
  postType?: string;
  liked?: boolean;

  constructor(name?: string, profileUrl?: string, date?: Date, post?: string, img?: string, postType?: string, liked?: boolean) {
    this.name = name;
    this.profileUrl = profileUrl;
    this.date = date;
    this.post = post;
    this.img = img;
    this.postType = postType;
    this.liked = liked;
  }
}
