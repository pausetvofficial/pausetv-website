import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow Text",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero Button Label",
      type: "string",
    }),
    defineField({
      name: "heroCtaUrl",
      title: "Hero Button Link",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "General Contact Email",
      type: "string",
    }),
    defineField({
      name: "bookingEmail",
      title: "Booking Email",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  "Instagram",
                  "X",
                  "YouTube",
                  "TikTok",
                  "Facebook",
                  "Spotify",
                ],
              },
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
    defineField({
      name: "footerNote",
      title: "Footer Note",
      type: "string",
    }),
  ],
});
