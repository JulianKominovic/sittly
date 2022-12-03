export type Link = {
  title: string;
  url: string;
  icon: string;
  fav: boolean;
  id: string;
  category: string;
};

export type SavedLinks = Record<string, Link[]>;
