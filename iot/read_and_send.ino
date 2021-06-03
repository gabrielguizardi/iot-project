#include<ESP8266WiFi.h>
#include<DHT.h>
#include<ThingSpeak.h>

#define SSID "REDE"
#define SENHA "SENHA"

#define CHANNEL_ID 1375804
#define WRITE_API_KEY "VQJFWGOIRUUHXIA9"

#define PINO_DHT11 2 

DHT dht(PINO_DHT11, DHT11);
WiFiClient client;

void setup() {
  Serial.begin(9600);
  Serial.println("Conectando-se a rede WiFi");
  Serial.println(SSID);

  WiFi.begin(SSID, SENHA);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }
  Serial.println("Conectado com sucesso!");
  Serial.println("IP da placa:");
  Serial.println(WiFi.localIP());

  dht.begin();
  ThingSpeak.begin(client);
}

void loop() {
  int valorAnalogicoUmidadeSolo = analogRead(0);
  float umidadeSolo = 100 * ((1024 - (float)valorAnalogicoUmidadeSolo) / 1024);
  float temperatura = dht.readTemperature();
  float umidadeAr = dht.readHumidity();

  Serial.println("Temperatura: ");
  Serial.print(temperatura);
  Serial.println("ºc");

  Serial.println("Umidade do ar: ");
  Serial.print(umidadeAr);
  Serial.println("%");

  Serial.println("Umidade do solo: ");
  Serial.print(umidadeSolo);
  Serial.println("%");
  Serial.println("---------------------------------------");

  ThingSpeak.setField(1, umidadeAr);
  ThingSpeak.setField(2, temperatura);
  ThingSpeak.setField(3, umidadeSolo);

  ThingSpeak.writeFields(CHANNEL_ID, WRITE_API_KEY);

  delay(20000);
}
