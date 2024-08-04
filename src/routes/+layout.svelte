<script lang="ts">
	import "$lib/root.css";

	import { QueryClientProvider, QueryClient } from "@tanstack/svelte-query";

	import dayjs from "dayjs";
	import weekYear from "dayjs/plugin/weekYear";
	import weekOfYear from 'dayjs/plugin/weekOfYear'
	import updateLocale from "dayjs/plugin/updateLocale";
	import relativeTime from "dayjs/plugin/relativeTime";
	
	const client = new QueryClient();

	
	/* Setup our own relativeTime configuration before svelte-time uses it. */
	const thresholds = [
		{ l: "s", r: 44, d: "second" },		/* 0 to 44 seconds = s (now) */
		{ l: "m", r: 89 },					/* 45 to 89 seconds = m (1m) */
		{ l: "mm", r: 44, d: "minute" },	/* 90 seconds to 44 minutes = mm (%dm) */
		{ l: "h", r: 89 },					/* 45 to 89 minutes = h (1h) */
		{ l: "hh", r: 21, d: "hour" },		/* 90 minutes to 21 hours = hh (%dh) */
		{ l: "d", r: 35 },					/* 22 to 35 hours = d (1d) */
		{ l: "dd", r: 14, d: "day" },		/* 36 hours to 14 days = dd (%dd) */
		{ l: "ww", r: 52, d: "week" },		/* 15 days to 52 weeks = ww (%dw) */
		{ l: "yy", d: "year"}				/* 53 weeks and older = yy (%dy) */
	];

	const relativeTimeLocale = {
		future: "in %s",
		past: "%s",
		s: "now",
		m: "1m",
		mm: "%dm",
		h: "1h",
		hh: "%dh",
		d: "1d",
		dd: "%dd",
		M: "1mo",
		MM: "%dmo",
		ww: "%dw",
		y: "1y",
		yy: "%dy"
	};
	
	// There seems to be an issue with how relativeTime updates "options" in the code, see https://github.com/iamkun/dayjs/issues/830#issuecomment-1914343619
	// @ts-ignore
	delete relativeTime.$i
	dayjs.extend(relativeTime, { thresholds });

	dayjs.extend(updateLocale);
	dayjs.updateLocale("en", {
		weekStart: 1,
		yearStart: 4, 
		relativeTime: relativeTimeLocale 
	});

	dayjs.extend(weekOfYear);
	dayjs.extend(weekYear);

	dayjs.locale('en');
</script>

<QueryClientProvider {client}>
	<slot />
</QueryClientProvider>
