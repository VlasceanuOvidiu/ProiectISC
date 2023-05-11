#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"
#include <WiFi.h>
#include <ThingSpeak.h>

MAX30105 particleSensor;
#define MAX_BRIGHTNESS 255

#if defined(__AVR_ATmega328P__) || defined(__AVR_ATmega168__)
uint16_t irBuffer[100]; // datele senzorului LED infraroșu
uint16_t redBuffer[100];  // datele senzorului LED roșu
#else
  uint32_t irBuffer[100]; // datele senzorului LED infraroșu
  uint32_t redBuffer[100];  // datele senzorului LED roșu
#endif

int32_t bufferLength; // lungimea datelor
int32_t spo2; // valoarea SPO2
int8_t validSPO2; // indicator pentru validitatea calculului SPO2
int32_t heartRate; // valoarea ritmului cardiac
int8_t validHeartRate; // indicator pentru validitatea calculului ritmului cardiac
byte pulseLED = 11; // trebuie să fie un pin PWM
byte readLED = 13; // clipește la fiecare citire de date

long prevMillisSensor = 0;
int intervalSensor = 1000;
long prevMillisThingSpeak = 10000;
int intervalThingSpeak = 15000; // Intervalul minim de scriere în ThingSpeak este de 15 secunde

const char* ssid = "402"; // numele rețelei Wi-Fi (SSID)
const char* password = "faraparola"; // parola rețelei Wi-Fi
const long CHANNEL = 2132916;
const char *WRITE_API = "CIA2ZBO9VHDVS7BO";

WiFiClient client;

void setup() {
  Serial.begin(115200); // inițializează comunicarea serială la 115200 biți pe secundă
  pinMode(pulseLED, OUTPUT);
  pinMode(readLED, OUTPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectare la Wi-Fi...");
  }
  Serial.println("Conectat la Wi-Fi");

  ThingSpeak.begin(client);
  
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) // utilizează portul I2C implicit și viteză de 400kHz
  {
    Serial.println(F("MAX30105 nu a fost găsit. Verificați conexiunile și alimentarea."));
    while (1);
  }

  Serial.println(F("Fixați senzorul pe deget cu o bandă elastică. Apăsați orice tastă pentru a începe "));
  while (Serial.available() == 0); // așteaptă până când utilizatorul apasă o tastă
  Serial.read();

  byte ledBrightness = 150; // Opțiuni: 0=Oprit, 255=50mA
  byte sampleAverage = 8; // Opțiuni: 1, 2, 4, 8, 16, 32
  byte ledMode = 2; // Opțiuni: 1 = Doar roșu, 2 = Roșu + infraroșu, 3 = Roșu + infraroșu + verde
  byte sampleRate =400; // Opțiuni: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411; // Opțiuni: 69, 118, 215, 411
  int adcRange = 4096; // Opțiuni: 2048, 4096, 8192, 16384
  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange); // Configurează senzorul cu aceste setări
}

void loop()
{
  bufferLength = 100; // lungimea bufferului de 100 stochează 4 secunde de eșantioane la 25sps
  for (byte i = 0 ; i < bufferLength ; i++)
  {
    while (particleSensor.available() == false) // avem date noi?
      particleSensor.check(); // Verifică dacă există date noi de la senzor
    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample(); // Am terminat cu acest eșantion, trecem la următorul eșantion
    Serial.print(F("red="));
    Serial.print(redBuffer[i], DEC);
    Serial.print(F(", ir="));
    Serial.println(irBuffer[i], DEC);
  }

  maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

  while (1)
  {
    // Eliminăm primele 25 de seturi de eșantioane din memorie și deplasăm ultimele 75 de seturi de eșantioane în partea de sus
    for (byte i = 25; i < 100; i++)
    {
      redBuffer[i - 25] = redBuffer[i];
      irBuffer[i - 25] = irBuffer[i];
    }
    for (byte i = 75; i < 100; i++)
    {
      while (particleSensor.available() == false) // avem date noi?
        particleSensor.check(); // Verifică dacă există date noi de la senzor
      digitalWrite(readLED, !digitalRead(readLED)); // Clipește LED-ul încorporat la fiecare citire de date
      redBuffer[i] = particleSensor.getRed();
      irBuffer[i] = particleSensor.getIR();
      particleSensor.nextSample(); // Am terminat cu acest eșantion, trecem la următorul eșantion
      Serial.print(F("  HR="));
      Serial.print(heartRate, DEC);
      Serial.print(F(", HRvalid="));
      Serial.print(validHeartRate, DEC);
      Serial.print(F(", SPO2="));
      Serial.print(spo2, DEC);
      Serial.print(F(", SPO2Valid="));
      Serial.println(validSPO2, DEC);
    }

    maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

    if (validSPO2 == 1 && validHeartRate == 1)
    {
      if (millis() - prevMillisThingSpeak > intervalThingSpeak)
      {
      // Setăm câmpurile cu valorile
      ThingSpeak.setField(1, spo2);
      ThingSpeak.setField(2, heartRate);

      // Scriem în canalul ThingSpeak
      int x = ThingSpeak.writeFields(CHANNEL, WRITE_API);
      if (x == 200)
      {
        Serial.println("Actualizare canal cu succes.");
      }
      else
      {
        Serial.println("Problemă la actualizarea canalului. Cod de eroare HTTP " + String(x));
      }

      prevMillisThingSpeak = millis();
      }
    }
  }
}


