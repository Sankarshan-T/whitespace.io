# whitespace.io
An all in one whiteboard, document editor and diagrams editor. Full of un-imaginabe features.

## Key features:
### Hybrid files: 
- **Side-by-Side Editing:** Use the Split View to sketch diagrams while writing technical specs.
- **Rich Text Editor:** Powered by BlockNote, featuring slash commands, drag-and-drop blocks, and real-time persistence.
- **Infinite Canvas:** Integrated Excalidraw instance that saves elements, app state (zoom/orientation), and images.

### Team + workspace management:
- **Multi-Team Support:** Create and switch between different team workspaces effortlessly.
- **Team Settings:** Rename your workspace or manage "Danger Zone" actions like team deletion through a secure interface.
- **File Management:** Organize, rename, and delete files with a clean table-view dashboard.

## Tech stack:
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **DB & Backend:** [Convex](https://www.convex.dev/) (Real-time sync)
- **Authentication:** [Kinde](https://kinde.com/)
- **Whiteboard + diagrams**: [Excalidraw](https://excalidraw.com/)
- **Editor:** [BlockNote](https://www.blocknotejs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/)
- **Theming:** [Next Themes](https://github.com/pacocoursey/next-themes)

## Running locally:
### 1. Clone the repository
~~~
bash
git clone [https://github.com/Sankashan-T/whitespace.io.git](https://github.com/Sankashan-T/whitespace.io.git)
cd whitespace.io
~~~

### 2. Install dependencies
~~~ 
npm install
~~~

### 3. Create an .env.local file with the needed keys:
~~~
# Kinde Auth
KINDE_CLIENT_ID=your_kinde_id
KINDE_CLIENT_SECRET=your_kinde_secret
KINDE_ISSUER_URL=https://your_domain.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

# Convex
CONVEX_DEPLOYMENT_KEY=your_convex_key
NEXT_PUBLIC_CONVEX_URL=your_convex_url
~~~

### 4. Run the dev server
~~~
# Start next js
npm run dev

# Start convex
npx convex dev
