import mongoose, { Document, Schema } from 'mongoose';

export interface IProperty extends Document {
  id: string; 
  title: string;
  type: string;
  price: number;
  state: string;
  city: string;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  furnished: string
  availableFrom: Date;
  listedBy: string;
  tags: string;
  colorTheme: string;
  rating: number;
  isVerified: boolean;
  listingType: string;
  createdBy: mongoose.Types.ObjectId;
}

const propertySchema = new Schema<IProperty>({
  id: { type: String, unique: true },
  title: { type: String,  },
  type: { type: String,  },
  price: { type: Number,  },
  state: { type: String,  },
  city: { type: String,  },
  areaSqFt: { type: Number,  },
  bedrooms: { type: Number,  },
  bathrooms: { type: Number,  },
  amenities: [{ type: String }],
  furnished: { type: String },
  availableFrom: { type: Date },
  listedBy: { type: String,  },
  tags: { type: String },
  colorTheme: { type: String },
  rating: { type: Number },
  isVerified: { type: Boolean, default: false },
  listingType: { type: String,  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User',  },
});

export default mongoose.model<IProperty>('Property', propertySchema);
