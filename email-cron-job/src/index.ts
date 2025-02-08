/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"` to see your Worker in action
 * - Run `npm run deploy` to publish your Worker
 *
 * Bind resources to your Worker in `wrangler.json`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { ScheduledController } from '@cloudflare/workers-types';

export default {
	// The scheduled handler is invoked at the interval set in our wrangler.json's
	// [[triggers]] configuration.
	async scheduled(controller: ScheduledController): Promise<void> {
		console.log(`trigger fired at ${controller.cron}`);

		const resp = await fetch('https://declutterspace.net/api/item-reminder');
		// const resp = await fetch('http://localhost:3000/api/item-reminder');
		const wasSuccessful = resp.ok ? 'success' : 'fail';
		console.log(`API call result: ${wasSuccessful}`);
	},
} satisfies ExportedHandler<Env>;
