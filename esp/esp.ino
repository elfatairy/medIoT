#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

// Define pins
#define DHTPIN 4          // Pin connected to the DHT11 sensor
#define DHTTYPE DHT11     // Define the type of DHT sensor
#define SOIL_MOISTURE_PIN 13 // Pin connected to the soil moisture sensor
#define VOC_PIN 12        // Pin connected to the VOC sensor
#define SDA_PIN 14        // I2C SDA pin
#define SCL_PIN  15        // I2C SCL pin

// Initialize DHT sensor
DHT dht(DHTPIN, DHTTYPE);

// Initialize LCD (assuming I2C address is 0x27 and a 16x2 display)
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  // Initialize serial communication
  Serial.begin(115200);

  // Initialize DHT sensor
  dht.begin();

  // Initialize I2C communication for the LCD
  Wire.begin(SDA_PIN, SCL_PIN);
  lcd.init(); // Initialize the LCD
  lcd.backlight(); // Turn on the backlight
  lcd.setCursor(0, 0);
  lcd.print("Initializing...");
  delay(2000);
}

void loop() {
  // Read temperature and humidity from DHT11
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Read soil moisture level
  int soilMoistureValue = analogRead(SOIL_MOISTURE_PIN);
  float soilMoisturePercentage = map(soilMoistureValue, 0, 4095, 0, 100);

  // Read VOC sensor value
  int vocValue = analogRead(VOC_PIN);
  float vocPPM = map(vocValue, 0, 4095, 0, 1000); // Example mapping, adjust as needed

  // Check if readings are valid
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    lcd.setCursor(0, 0);
    lcd.print("DHT Error!    ");
    delay(2000);
    return;
  }

  // Print readings to Serial Monitor
  Serial.print("Temp: ");
  Serial.print(temperature);
  Serial.println(" C");
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");
  Serial.print("Soil Moisture: ");
  Serial.print(soilMoisturePercentage);
  Serial.println(" %");
  Serial.print("VOC: ");
  Serial.println(vocPPM);

  // Display readings on LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(temperature);
  lcd.print("C H:");
  lcd.print(humidity);
  lcd.print("%");

  lcd.setCursor(0, 1);
  lcd.print("SM:");
  lcd.print(soilMoisturePercentage);
  lcd.print("% VOC:");
  lcd.print(vocPPM);

  // Wait 2 seconds before taking the next reading
  delay(2000);
}