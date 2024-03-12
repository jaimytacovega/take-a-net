import * as RouterLib from '@scripts/lib/router.lib'
import * as CloudflareLib from '@scripts/lib/cloudflare.lib'

import { router, forbiddenURLs } from '@scripts/config'


const handleFetch = async ({ request, env, ctx }) => {
	const url = new URL(request.url)
	const { pathname } = url
	const pattern = RouterLib.findPatternFromUrl({ router, url })

	const redirectResult = RouterLib.getRedirectResponse({ pathname })
	if (redirectResult?.response) return redirectResult.response

	const forbiddenResult = RouterLib.getForbiddenResponse({ request, forbiddenURLs })
	if (forbiddenResult?.response) return forbiddenResult.response

	const pageCallback = router?.get(pattern?.pathname)?.getRoute
	const pageResult = pageCallback ? await pageCallback({ request, url, pattern, env }) : null
	if (pageResult?.response) return pageResult.response

	const staticResult = await CloudflareLib.getStaticResponse({ request, waitUntil: ctx.waitUntil.bind(ctx), env })
	if (staticResult?.response) return staticResult?.response

	const notFoundResult = await RouterLib.getNotFoundResponse({ router, request })
	return notFoundResult?.response
}

export default {
	fetch: (request, env, ctx) => handleFetch({ request, env, ctx })
}