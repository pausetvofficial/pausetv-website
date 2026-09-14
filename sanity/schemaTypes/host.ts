import { defineArrayMember, defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons/User";

export const host = defineType({
  name: "host",
  title: "Host",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: 'e.g. "Host & Executive Producer, PauseTV"',
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "longBio",
      title: "Full Bio",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "highlights",
      title: "Career Highlights",
      type: "array",
      of: [
        {
          type: "object",
          name: "highlight",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        },
      ],
    }),
  ],
});
