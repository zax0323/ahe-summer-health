import { request } from './http'

export function getProfile() {
  return request('/profile')
}
