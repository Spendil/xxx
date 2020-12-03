import { getValueFrom } from '../../utils/common'
import vega from 'vega'
import vegaLite from 'vega-lite'
import vegaEmbed from 'vega-embed'

const fetcher = (graphQLParams) => {
	return fetch(
		'https://graphql.bitquery.io',
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(graphQLParams),
			credentials: 'same-origin',
		},
	)
}

export const create = async (query, variables, config) => {
	let queryResult = ''
	let cfg = {}
	const data = await fetcher({query, variables})
	data.json().then(json => {
		if ('data' in json) {
			queryResult = json.data
		} else {
			console.log(JSON.stringify(json.errors, null, 2))
		}
	})
	let values = getValueFrom(queryResult, config.data)
	cfg = {
		...config,
		data: {
			values
		}
	}
	vegaEmbed('#vis', cfg)
}
