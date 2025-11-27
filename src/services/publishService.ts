import { pub } from "../config/redis";
import { toInternalTopic } from "../core/topicManager";

export async function publishMessage(appId: string, topic: string, payload: any) {
  const namespaced = toInternalTopic(appId, topic);
  await pub.publish(namespaced, JSON.stringify(payload));
  return { ok: true, topic: namespaced };
}
