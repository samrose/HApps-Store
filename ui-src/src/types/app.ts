
export interface AppCreationSpec {
  title: string,
  description: string,
  thumbnailUrl: string,
  homepageUrl: string,
  dnaUrl: string,
  uiUrl: string,
}

export interface AppCreationSpecSnake {
  title: string,
  description: string,
  thumbnail_url: string,
  homepage_url: string,
  dna_url: string,
  ui_url: string,
}


export interface App extends AppCreationSpec {
  address: string,
  author: string,
  upvotes: number,
  upvotedByMe: boolean,
}