
export interface AppResource {
  location: string,
  hash: string,
  handle: string,
}

export interface AppCreationSpec {
  title: string,
  description: string,
  thumbnailUrl: string,
  homepageUrl: string,
  dnas: Array<AppResource>,
  ui: AppResource | null,
}

export const defaultAppCreationSpec = {
  title: '',
  description: '',
  thumbnailUrl: '',
  homepageUrl: '',
  dnas: [],
  ui: null,
}

export interface AppCreationSpecSnake {
  title: string,
  description: string,
  thumbnail_url: string,
  homepage_url: string,
  dnas: Array<AppResource>,
  ui: AppResource | null,
}

export interface App {
  address: string,
  author: string,
  upvotes: number,
  upvotedByMe: boolean,
  appEntry: AppCreationSpec,
  hashAddress:string
}
