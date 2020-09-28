import request from 'request-promise-native';
import { Valorant, Match } from '../types';
import Embed from './embed';
require('dotenv').config();

export interface MatchData {
    mode: string;
    agent: string;
    map: string
    mapImage: string;
    agentImage: string;
    kills: number;
    deaths: number;
    score: string;
    assists: number;
    damagePerRound: number;
    result: string;
    placement: string;
}

const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:81.0) Gecko/20100101 Firefox/81.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en',
    'Referer': 'https://tracker.gg/valorant/profile/riot/aiomonitors%231040/overview',
    'Origin': 'https://tracker.gg',
    'Connection': 'keep-alive',
    'Cookie': process.env.COOKIES
};

export const getStatsResponse = async (): Promise<Valorant> => {
    const response = await request.get(`https://api.tracker.gg/api/v2/valorant/rap-matches/riot/${process.env.USERNAME}%23${process.env.TAGLINE}?type=unrated,competitive&next=null`, {
        headers,
        json: true,
        resolveWithFullResponse: true,
    });
    if ( response.statusCode !== 200 ) {
        throw new Error('Could not get response');
    }
    const body: Valorant = response.body;
    return body;
};

export const getIDS = (data: Valorant) => {
    return data.data.matches.map(d => d.attributes.id);
}

export const extractStats = (data: Match[]): MatchData[] => {
    return data.map(d => {
        const {
            modeName: mode,
            mapName: map,
            mapImageUrl: mapImage,
            agentName: agent,
            agentImageUrl: agentImage,
            result,
            timestamp,
        } = d.metadata;
        const { stats } = d.segments[0];
        const score = `${stats.roundsWon.value} - ${stats.roundsPlayed.value - stats.roundsWon.value}`;
        const kills = stats.kills.value;
        const assists = stats.assists.value;
        const placement = stats.placement.displayValue;
        const deaths = stats.deaths.value;
        const damagePerRound = stats.damage.value / stats.roundsPlayed.value;
        return {
            mode,
            agent,
            mapImage,
            agentImage,
            result,
            score,
            kills,
            deaths,
            assists,
            damagePerRound,
            placement,
            map,
        }
    });
};

export const getEmbed = (data: MatchData) => {
    return new Embed(`${data.agent} - Match ${data.result} - ${data.score}`, `Score: ${data.score}\nMap: ${data.map}\n`)
        .addField('Kills', data.kills.toString(), true)
        .addField('Assists', data.assists.toString(), true)
        .addField('Deaths', data.deaths.toString(), true)
        .addField('DPR', data.damagePerRound.toFixed(2), true)
        .addField('Placement', data.placement, true)
        .setImage(data.mapImage)
        .setThumbnail(data.agentImage)
        .setAuthor(data.mode)
        .setTimestamp();
}