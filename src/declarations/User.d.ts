export interface User {
  id:                 string;
  username:           string;
  name:               string;
  portfolio_url:      string;
  bio:                string;
  location:           string;
  total_likes:        number;
  total_photos:       number;
  total_collections:  number;
  instagram_username: string;
  twitter_username:   string;
  profile_image:      ProfileImage;
  links:              UserLinks;
}

export interface UserLinks {
  self:      string;
  html:      string;
  photos:    string;
  likes:     string;
  portfolio: string;
}

export interface ProfileImage {
  small:  string;
  medium: string;
  large:  string;
}
