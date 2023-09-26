type Input = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
};

type Network = {
  id: number;
  name: string;
  country: {
    name: string;
    code: string;
    timezone: string;
  };
  officialSite: string | null;
};

type WebChannel = {
  id: number;
  name: string;
  country: null | { name: string; code: string; timezone: string };
  officialSite: string | null;
};

type Movie = {
  id?: number;
  url: string;
  name: string;
  type?: string;
  summary?: string;
  language?: string;
  genres: string[];
  status?: string;
  runtime?: number | null;
  averageRuntime?: number;
  premiered: string;
  ended?: string | null;
  officialSite?: string | null;
  image?: {
    medium: string;
    original?: string;
  };
  schedule?: {
    time: string;
    days: string[];
  };
  rating?: {
    average: number | null;
  };
  weight?: number;
  network?: Network | WebChannel | null;
  webChannel?: WebChannel | null;
  dvdCountry?: null | { name: string; code: string; timezone: string };
  externals?: {
    tvrage: number;
    thetvdb: number | null;
    imdb: string | null;  // Updated type to string | null
  };
  updated?: number;
  _links?: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
    };
  };
};




