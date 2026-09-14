import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { UserIcon } from "@sanity/icons/User";
import { PlayIcon } from "@sanity/icons/Play";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { TagIcon } from "@sanity/icons/Tag";

const SINGLETONS = [
  { type: "siteSettings", title: "Site Settings", icon: CogIcon },
  { type: "host", title: "Host", icon: UserIcon },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("PauseTV")
    .items([
      ...SINGLETONS.map((singleton) =>
        S.listItem()
          .title(singleton.title)
          .icon(singleton.icon)
          .id(singleton.type)
          .child(
            S.document()
              .schemaType(singleton.type)
              .documentId(singleton.type)
              .title(singleton.title),
          ),
      ),
      S.divider(),
      S.listItem()
        .title("Videos")
        .icon(PlayIcon)
        .child(S.documentTypeList("video").title("Videos")),
      S.listItem()
        .title("News Posts")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("newsPost").title("News Posts")),
      S.listItem()
        .title("Events")
        .icon(CalendarIcon)
        .child(S.documentTypeList("event").title("Events")),
      S.listItem()
        .title("Categories")
        .icon(TagIcon)
        .child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .title("Newsletter Subscriptions")
        .icon(EnvelopeIcon)
        .child(
          S.documentTypeList("newsletterSubscription").title(
            "Newsletter Subscriptions",
          ),
        ),
    ]);
