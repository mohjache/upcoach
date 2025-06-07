# UpCoach
Building something to make review work outside of your coaching sessions so that drilling by myself becomes more efficient.

## Tech Stack
- Nextjs deployed on Vercel .
- Domains and DNS also through Vercel.
- Convex for state management, async tasks, db.
- Clerk for Auth.
- Shadcn for UI theming and components built on top of Tailwind

## Getting Started
You will need to setup your own convex and clerk instances locally and find the necessary variables used:

```
CONVEX_DEPLOYMENT=
CONVEX_DEPLOY_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_FRONTEND_API_URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_REDIRECT_AFTER_SIGNOUT_URL=/
```

You will need to store these env variables inside of convex
```
CLERK_FRONTEND_API_URL
CLERK_WEBHOOK_SECRET
```

Once setup you should be able to run ```pnpm run dev``` and start.

##  Todo list

- [x] Make it deploy.
- [x] Scaffold basic UI with mock data.
- [x] Attach database to UI.
- [x] Add authentication.
- [x] Add Top Nav.
- [x] Added landing page that doesn't need auth.
- [x] Create screens for user review. Includes loading youtube metadata from link.
- [x] Edit screens for review.
- [x] Add webhooks for clerk to lookup users without doing API calls to Clerk everytime.
- [ ] Add functionality to invite coach.
- [ ] Add summary to dashboard that collates feedback from coaching into a summary. Add gamification 1/3 reviews before this unlocks.
- [ ] As coach I can see my students reviews and add my own notes.
- [ ] As a student I can see when my coach has reviewed my work.


## Lessons Learnt

### Backend
- I will need to store env variables inside of two products still as convex acts as my backend and runs inside of a different environment to my next js app.

- Convex works in tandem with Clerk to ensure authenticated requests can be done on it's backend you will need to use Convex's Auth Components to ensure state is kept up to date. Refer to step 10 for more info [Convex/Clerk Docs]("https://docs.convex.dev/auth/clerk")

### UI
- I don't need to do any weird body hacks for background like
    ```css
    body {background-color: black;}
    ```
    nonsense as I can just ensure my theme is working for shadcn and apply 
    ```html
    <div className="bg-background text-foreground"></div>
    ```




