This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Facilitator Mapping

The app now maps user Profile URLs to their respective Facilitator codes.
Since the `.env.local` file is private (git-ignored), it safely holds this mapping.

To add new participants, open `.env.local` and add their URL to the `PARTICIPANT_MAPPING` JSON string.
For example:
```env
PARTICIPANT_MAPPING='{"https://www.cloudskillsboost.google/public_profiles/111": "GCAF26-IN-JYV-RMM", "https://www.cloudskillsboost.google/public_profiles/222": "GCAF26-IN-NQ3-CV4"}'
```

When a user calculates their points, the app will:
1. Lookup their URL in `PARTICIPANT_MAPPING` to find the Referral Code.
2. Lookup the Referral Code in `FACILITATORS_DATA` to get the Facilitator Names.
3. Save their Facilitator details to the Supabase Leaderboard table automatically!
