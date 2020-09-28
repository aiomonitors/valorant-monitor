export interface Valorant {
    data: Data;
}

export interface Data {
    matches:                    Match[];
    metadata:                   DataMetadata;
    paginationType:             number;
    requestingPlayerAttributes: RequestingPlayerAttributes;
}

export interface Match {
    attributes: MatchAttributes;
    metadata:   MatchMetadata;
    segments:   Segment[];
}

export interface MatchAttributes {
    id:     string;
    mapId:  number;
    modeId: number;
}

export interface MatchMetadata {
    modeKey:       ModeKey;
    modeName:      ModeName;
    modeImageUrl:  string;
    modeMaxRounds: number;
    hasWon:        boolean;
    timestamp:     string;
    result:        Result;
    map:           Map;
    mapName:       MapName;
    mapImageUrl:   string;
    agent:         Agent;
    agentName:     AgentName;
    agentImageUrl: string;
}

export enum Agent {
    Omen = "omen",
}

export enum AgentName {
    Omen = "Omen",
}

export enum Map {
    Ascent = "ascent",
    Bind = "bind",
    Haven = "haven",
    Split = "split",
}

export enum MapName {
    Ascent = "Ascent",
    Bind = "Bind",
    Haven = "Haven",
    Split = "Split",
}

export enum ModeKey {
    Bomb = "bomb",
}

export enum ModeName {
    Competitive = "Competitive",
    Normal = "Normal",
}

export enum Result {
    Defeat = "defeat",
    Victory = "victory",
}

export interface Segment {
    type:       Type;
    attributes: SegmentAttributes;
    metadata:   SegmentMetadata;
    expiryDate: string;
    stats:      { [key: string]: Stat };
}

export interface SegmentAttributes {
    platformSlug: PlatformSlug;
}

export enum PlatformSlug {
    Riot = "riot",
}

export interface SegmentMetadata {
    platformUserHandle: PlatformUser;
}

export enum PlatformUser {
    Aiomonitors1040 = "aiomonitors#1040",
}

export interface Stat {
    rank:            null;
    percentile:      null;
    displayName:     string;
    displayCategory: DisplayCategory | null;
    category:        Category | null;
    metadata:        StatMetadata;
    value:           number;
    displayValue:    string;
    displayType:     DisplayType;
}

export enum Category {
    Combat = "combat",
}

export enum DisplayCategory {
    Combat = "Combat",
}

export enum DisplayType {
    Number = "Number",
    NumberPrecision1 = "NumberPrecision1",
    TimeMilliseconds = "TimeMilliseconds",
}

export interface StatMetadata {
}

export enum Type {
    Overview = "overview",
}

export interface DataMetadata {
    schema: string;
    next:   number;
}

export interface RequestingPlayerAttributes {
    platformSlug:           PlatformSlug;
    platformUserIdentifier: PlatformUser;
}
