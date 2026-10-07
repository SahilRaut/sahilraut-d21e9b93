# Architecture rules

- The homepage owns the project listing; retain `/work/:slug` details and redirect legacy `/work` visits to `/#projects` so old links remain usable.
- The GitHub Pages publish workflow waits for the newest commit to reach the synced source repo before building, so a deploy always publishes the latest code; keep that wait when editing the workflow.