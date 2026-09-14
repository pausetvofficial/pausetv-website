import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons/User";

export const newsletterSubscription = defineType({
  name: "newsletterSubscription",
  title: "Newsletter Subscription",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .email()
          .custom((email) => {
            if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
              return "Please enter a valid email address";
            }
            return true;
          }),
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Unsubscribed", value: "unsubscribed" },
          { title: "Bounced", value: "bounced" },
        ],
      },
      initialValue: "active",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Subscription Source",
      type: "string",
      options: {
        list: [
          { title: "Website", value: "website" },
          { title: "Import", value: "import" },
          { title: "Manual", value: "manual" },
        ],
      },
      initialValue: "website",
    }),
    defineField({
      name: "unsubscribeToken",
      title: "Unsubscribe Token",
      type: "string",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      email: "email",
      status: "status",
    },
    prepare(selection) {
      const { email, status } = selection;
      return {
        title: email,
        subtitle: status ? `Status: ${status}` : "No status",
      };
    },
  },
});
