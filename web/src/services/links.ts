import { api } from "./api";

export type Link = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: Date;
};

export async function getLink(shortUrl: string) {
  const res = await api.get<Link>(`/links/${shortUrl}`);
  return res.data;
}

export async function getLinks() {
  const res = await api.get<Link[]>("/links/");
  return res.data;
}

export async function postLink(body: {
  shortUrl: string;
  originalUrl: string;
}) {
  const res = await api.post<Link>("/links/", body);
  return res.data;
}

export async function deleteLink(linkId: string) {
  const res = await api.delete(`/links/${linkId}`);
  return res.data;
}

export async function exportLinks() {
  const res = await api.post<{ publicUrl: string }>("/links/export");
  return res.data;
}
