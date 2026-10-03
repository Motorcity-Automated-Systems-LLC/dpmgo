<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep transit route data and nearby place links in `src/data/transit.ts` so the map and station drawers share one station order.
- Render Mapbox only after browser hydration because Mapbox GL depends on browser APIs during module evaluation.
- Label animated vehicle positions as simulations until a verified live transit feed is connected, to avoid misleading riders.
