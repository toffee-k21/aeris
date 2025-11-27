export function toInternalTopic(appId: string, topic: string) {
  return `app:${appId}:${topic}`;
}
// note : this resolves the issue of mixing the messages or cross topic message, by embedding appId internally 

// scenario : if client A uses my service and creates a topic chat:1 and subscribe to listen
// but another client B uses the same topic chat:1 and subscribe , as both have same topic redis pub/sub cant identify these two apps sapartly

// solution : to fix we use internal topic extender ** app:${appId}:${topic}** to make the topic isolated

// apiKey is hence required for both client (ws/...?apiKey=...) and for /publish