##  Todo list
- [x] Build better landing page to focus on new ideal customer (coaching businesses).
- [x] Add pricing page with panels to help onboard.
- [x] Create onboarding process to allow coaches a pathway to signup.
- [ ] Figure out stripe/clerk licensing i.e. an org has a certain amount of licenses (paid using stripe), organisations can add their students which uses up a license.
- [ ] Figure out better onboarding for students when invited.

# UpCoach
14/06/2025 Pivoting to a more traditional B2B model by onboarding coaching staff and allow them to manage their students.

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




