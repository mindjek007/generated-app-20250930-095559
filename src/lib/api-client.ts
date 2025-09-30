import { ApiResponse } from "../../shared/types"
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...init })
  const json = (await res.json()) as ApiResponse<T>
  if (!res.ok || !json.success) {
    const errorMessage = json.success === false ? json.error : 'Request failed';
    throw new Error(errorMessage);
  }
  return json.data
}