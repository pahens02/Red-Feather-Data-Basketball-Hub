## Prerequisites

Git: If you don't have Git installed, visit the official website and follow the installation instructions for your operating system.

Node.js: This project requires Node.js. If you don't have it installed, you can download it from nodejs.org.

## Steps to Run the Project
1. **Clone the GitHub Repository**
    
    - Open your terminal (or command prompt on Windows).

    - Navigate to the directory where you want to clone the repository. For example, if you want to clone it into a directory named "projects", you can use: 
    
        `cd path/to/projects`

    - Clone the repository by using the following command:
    
        `git clone [REPOSITORY_URL]`
    
        Replace *[REPOSITORY_URL]* with the actual URL of the GitHub repository. For example, if the repository URL is https://github.com/username/projectname.git , then the command becomes:

        `git clone https://github.com/username/projectname.git`

2. **Navigate to the Project Directory**

    Once you've cloned the repository, navigate to the project directory:

    `cd projectname`

    Replace *projectname* with the name of the directory that was created when you cloned the repository.


3. **Install the Dependencies**

    Before you can run the Next.js app, you need to install its dependencies. In the terminal, make sure you are inside the project directory and run:

    `npm install`

4. **Run the Development Server**

    With all dependencies installed, you can now start the development server:

    `npm run dev`

    Once the command completes, it should indicate that the server is running, usually with a message like:

        ready - started server on http://localhost:3000

5. **Access the App in Your Browser**
    
    Open your preferred web browser and navigate to:

    http://localhost:3000

    You should see the Next.js app running!

## Deploy your own

The Vercel deployment will guide you through creating a Supabase account and project. After installation of the Supabase integration, all relevant environment variables will be set up so that the project is usable immediately after deployment 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv)

## How to use

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

### Create a Supabase client

Check out the [`/app/_examples`](./app/_examples/) folder for an example of creating a Supabase client in:

- [Client Components](./app/_examples/client-component/page.tsx)
- [Server Components](./app/_examples/server-component/page.tsx)
- [Route Handlers](./app/_examples/route-handler/route.ts)
- [Server Actions](./app/_examples/server-action/page.tsx)

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
- [Next.js Auth Helpers Docs](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)