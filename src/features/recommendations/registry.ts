import type { RecommendationDefinition } from './types';

const registry = new Map<string, RecommendationDefinition>();

export function registerRecommendation(def: RecommendationDefinition) {
  if (__DEV__ && registry.has(def.type)) {
    console.warn(`[recommendations] "${def.type}" registered twice — overriding.`);
  }
  registry.set(def.type, def);
}

export const getRecommendationDefinition = (type: string) => registry.get(type);

export const registeredRecommendationTypes = () => [...registry.keys()];
