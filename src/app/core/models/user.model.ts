export class FirebaseUserModel {
  image?: string;
  name?: string;
  provider?: string;

  constructor(image?: string, name?: string, provider?: string) {
    this.image = image;
    this.name = name;
    this.provider = provider;
  }
}
