import { User } from './User'

export interface Photo {
  id:                       string;
  created_at:               Date;
  updated_at:               Date;
  width:                    number;
  height:                   number;
  color:                    string;
  likes:                    number;
  liked_by_user:            boolean;
  description:              string;
  user:                     User;
  current_user_collections: CurrentUserCollection[];
  urls:                     Urls;
  links:                    PhotoLinks;
}

export interface CurrentUserCollection {
  id:           number;
  title:        string;
  published_at: Date;
  updated_at:   Date;
  cover_photo?: Photo;
  user?:        User;
}

export interface PhotoLinks {
  self:              string;
  html:              string;
  download:          string;
  download_location: string;
}

export interface Urls {
  raw:     string;
  full:    string;
  regular: string;
  small:   string;
  thumb:   string;
}
