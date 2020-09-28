import logger from './utils/logger';
import { getStatsResponse, extractStats, getEmbed, getIDS } from './utils/valorant';
require('dotenv').config();

( async () => {
	const initStats = await getStatsResponse();
	let ids = getIDS(initStats)
	logger.info(`Initialized ${ids.length} matches`)
	setInterval(async  () => {
		logger.info('Monitoring');
		const stats = await getStatsResponse();
		const newStats = stats.data.matches.map(i => { return !ids.includes(i.attributes.id) ? i : null }).filter(Boolean);
		if ( newStats.length !== 0 ) {
			logger.info('New matches found')
			ids.push(...newStats.map(i => i.attributes.id));
			const formattedStats = extractStats(newStats);
			formattedStats.forEach(i => {
				getEmbed(i).send(process.env.WEBHOOK)
			});
		}
	}, 5000)
})();