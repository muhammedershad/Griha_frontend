import axios from 'axios';
import { links } from './links'

const instance = axios.create({
  baseURL: links.BASE_URL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default instance;