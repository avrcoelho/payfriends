export type HttpRequest = {
  url: string;
  params?: unknown;
  headers?: unknown;
  body?: unknown;
};

export type HttpResponse<Data = any> = {
  status: number;
  data: Data;
};
