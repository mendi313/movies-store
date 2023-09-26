import mongoose, { Document, Model, Schema } from 'mongoose';

interface IMovie extends Document {
  name: string;
  genres: string[];
  image: {
    medium: string;
    original: string;
  };
  premiered: string;
  ended: string | null;
  summary: string;
  language: string;
  status: string;
  runtime: number | null;
  averageRuntime: number;
  officialSite: string | null;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string | null;
  } | null;
  webChannel: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string | null;
  } | null;
  dvdCountry: {
    name: string;
    code: string;
    timezone: string;
  } | null;
  externals: {
    tvrage: number;
    thetvdb: number | null;
    imdb: string | null;
  };
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
    };
  };
}

const movieSchema: Schema<IMovie> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genres: {
      type: [String],
      default: [],
    },
    image: {
      type: {
        medium: String,
        original: String,
      },
      required: true,
    },
    premiered: String,
    ended: String,
    summary: String,
    language: String,
    status: String,
    runtime: Number,
    averageRuntime: Number,
    officialSite: String,
    schedule: {
      time: String,
      days: [String],
    },
    rating: {
      average: Number,
    },
    weight: Number,
    network: {
      id: Number,
      name: String,
      country: {
        name: String,
        code: String,
        timezone: String,
      },
      officialSite: String,
    },
    webChannel: {
      id: Number,
      name: String,
      country: {
        name: String,
        code: String,
        timezone: String,
      },
      officialSite: String,
    },
    dvdCountry: {
      name: String,
      code: String,
      timezone: String,
    },
    externals: {
      tvrage: Number,
      thetvdb: Number,
      imdb: String,
    },
    updated: Number,
    _links: {
      self: {
        href: String,
      },
      previousepisode: {
        href: String,
      },
    },
  },
  { timestamps: true }
);

const Movies: Model<IMovie> = mongoose.models.Movies || mongoose.model<IMovie>('Movies', movieSchema, 'Movies');

export default Movies;
