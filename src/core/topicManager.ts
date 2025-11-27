// src/core/topicManager.ts

export function toInternalTopic(appId: string, topic: string) {
  return `app:${appId}:${topic}`;
}
