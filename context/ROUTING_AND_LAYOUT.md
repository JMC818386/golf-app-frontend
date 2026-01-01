# Routing + Layout Rules

## AppLayout
- Full height gradient shell
- TopNav pinned top
- BottomTabBar pinned bottom
- Main content scrolls between them

## Routes
- / redirects to /home
- /home renders UploadScorecard
- /stats renders stats dashboard components
- /schedule renders calendar + list
- /messages placeholder
- /events/:id route-based detail page (shareable link)

## Responsive
- Mobile-first
- On desktop, keep bottom tabs unless explicitly switching to side nav later
