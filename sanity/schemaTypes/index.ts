import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { host } from "./host";
import { video } from "./video";
import { newsPost } from "./newsPost";
import { event } from "./event";
import { newsletterSubscription } from "./newsletterSubscription";
import { category } from "./category";

export const schemaTypes = [
  siteSettings,
  host,
  video,
  newsPost,
  event,
  category,
  newsletterSubscription,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};
