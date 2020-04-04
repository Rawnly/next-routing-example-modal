import Axios from 'axios'
import querystring from 'querystring'
import { Photo } from '../declarations/Photo'

interface GetPhotosOptions {
  page?: number;
  per_page?: number;
  order_by?: 'latest' | 'oldest' | 'popular'; // default 'latest'
}

export const apiWrapper = Axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Authorization': 'Client-ID afd1ee27e27b7df65b5857dbc7c1e7071fe3110133b24483bb44aaf1553a92d7'
  }
});

export const getPhotos = ({ page = 1, per_page = 30, order_by = 'latest' }: GetPhotosOptions = {}) => apiWrapper.get<Photo[]>(`/photos?${querystring.stringify({ page, order_by, per_page })}`)
export const getPhoto = (id: string) => apiWrapper.get<Photo>(`/photos/${id}`)
