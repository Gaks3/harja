import { useState, useEffect } from "react";
import mqtt from "mqtt";
import { env } from "@/env";
import { toast } from "./use-toast";

const setting = {
  url: `${env.NEXT_PUBLIC_MQTT_URL}:${env.NEXT_PUBLIC_MQTT_PORT}`,
  config: {
    username: env.NEXT_PUBLIC_MQTT_USERNAME,
    password: env.NEXT_PUBLIC_MQTT_PASSWORD,
  },
};

type Payload = {
  message?: string;
};

export default function useMqtt() {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [payload, setPayload] = useState<Payload>({});

  const getClientId = () => {
    console.log("Set MQTT Broker...");
    return `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`;
  };

  const mqttConnect = () => {
    const clientId = getClientId();

    const clientMqtt = mqtt.connect(setting.url, {
      clientId,
      keepalive: 60,
      ...setting.config,
    });
    setClient(clientMqtt);
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        console.log("MQTT Disconnected");
        setIsConnected(false);
      });
    }
  };

  const mqttSubscribe = (topic: string) => {
    if (client) {
      console.log("MQTT subscribe ", topic);
      const clientMqtt = client.subscribe(topic, (error) => {
        if (error) {
          console.log("MQTT Subscribe to topics error", error);
          toast({ variant: "destructive", title: "Failed to connect" });
          return;
        }
      });
      setClient(clientMqtt);
      toast({ title: `Success to connect` });
    }
  };

  const mqttUnSubscribe = (topic: string) => {
    if (client) {
      const clientMqtt = client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("MQTT Unsubscribe error", error);
          return;
        }
      });
      setClient(clientMqtt);
    }
  };

  const mqttPublish = (topic: string, message: string) => {
    if (client) {
      const clientMqtt = client.publish(topic, message, (error) => {
        if (error) {
          console.log("MQTT Publish error", error);
          return;
        }
      });
      setClient(clientMqtt);
    }
  };

  useEffect(() => {
    mqttConnect();
    return () => {
      mqttDisconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setIsConnected(true);
        console.log("MQTT Connected");
      });
      client.on("error", (err) => {
        console.error("MQTT Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setIsConnected(true);
        console.log("MQTT Reconnected");
      });
      client.on("message", (_topic, message) => {
        const payloadMessage = { message: message.toString() };
        setPayload(payloadMessage);
      });
    }
  }, [client]);

  return {
    mqttConnect,
    mqttDisconnect,
    mqttSubscribe,
    mqttUnSubscribe,
    mqttPublish,
    payload,
    isConnected,
  };
}
