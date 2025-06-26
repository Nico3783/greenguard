# GreenGuard: Real-Time Greenhouse Gas Monitoring System

> **A student-led project from the Federal University of Technology Akure (FUTA)**

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Motivation & Context](#motivation--context)
3. [Team Members](#team-members)
4. [Architecture & Components](#architecture--components)

   * [Hardware](#hardware)
   * [Firmware (ESP32)](#firmware-esp32)
   * [Dashboard (React)](#dashboard-react)
5. [Directory Structure](#directory-structure)
6. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Backend Setup (ESP32)](#backend-setup-esp32)
   * [Frontend Setup (Dashboard)](#frontend-setup-dashboard)
7. [Usage](#usage)
8. [Testing & Validation](#testing--validation)
9. [Future Enhancements](#future-enhancements)
10. [Contributing](#contributing)
11. [License](#license)

---

## Project Overview

GreenGuard is an IoT-based solution designed by FUTA students to monitor greenhouse gas emissions (CO₂, CH₄, etc.) in real time. Using an ESP32 microcontroller coupled with gas sensors and a beautiful React dashboard, GreenGuard empowers industries and researchers to:

* **Detect** and **display** current gas concentrations.
* **Alert** users via visual indicators when thresholds are exceeded.
* **Log** data remotely through MQTT for further analysis.

## Motivation & Context

Climate change poses growing risks to communities worldwide. According to the IPCC, global greenhouse gas emissions have risen by 45% since 1990, driving extreme weather events, health issues, and biodiversity loss. GreenGuard was conceived as part of a final-year capstone at FUTA to:

* Provide a **low-cost**, **scalable** monitoring platform.
* Foster **hands-on learning** in embedded systems and web development.
* Enable **data-driven decisions** for emission reduction.

## Team Members

| Name                         | Role                         |
| ---------------------------- | ---------------------------- |
|  ------   ----               | Hardware Design & Testing    |
| Chuk---  -----               | Embedded Firmware Engineer   |
|  **\*\*\*\*       \***\*\*\* | Frontend Dashboard Developer |
|  ------    -------           | Cloud & MQTT Integration     |
|  &&&&   &&&                  | Project Lead (Mentor & AI)   |

## Architecture & Components

### Hardware

* **ESP32 Dev Module**: Wi-Fi & Bluetooth connectivity
* **MH-Z19B Sensor**: Non-dispersive infrared (NDIR) CO₂ measurements
* **MQ-4 Sensor**: Analog CH₄ detection
* **RGB LED**: Visual traffic-light indicator (Green/Yellow/Red)
* **Power Supply**: 5V USB or battery pack

### Firmware (ESP32)

* Structured with **PlatformIO** (VS Code) and **Arduino framework**
* Modular headers:

  * `sensor_co2.h` (CO₂ readout)
  * `sensor_ch4.h` (CH₄ analog input)
  * `indicators.h` (LED logic)
  * `wifi_mqtt.h` (Wi-Fi & MQTT client)
* Configuration in `include/config.h`

### Dashboard (React)

* Built with **React**, **Vite**, **TailwindCSS**, and **Recharts**
* Real-time data via **MQTT** (`mqtt.js` client)
* Responsive & PWA-ready with manifest and service-worker

## Directory Structure

```
greenguard-system/
├── backend/                 # ESP32 firmware
│   ├── include/
│   │   └── config.h
│   ├── src/
│   │   ├── main.ino
│   │   ├── sensor_co2.h
│   │   ├── sensor_ch4.h
│   │   ├── indicators.h
│   │   └── wifi_mqtt.h
│   ├── platformio.ini
│   └── README.md            # Hardware wiring & upload guide
└── dashboard/               # React dashboard
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   ├── favicon.ico
    │   └── logo-*.png
    ├── src/
    │   ├── components/Charts.js
    │   ├── pages/Dashboard.js
    │   └── App.js
    ├── .env
    ├── package.json
    └── README.md            # Frontend setup & usage
```

## Getting Started

### Prerequisites

* **VS Code** with **PlatformIO IDE** extension
* **Node.js** (v16+)
* **npm** or **yarn**

### Backend Setup (ESP32)

1. **Open** VS Code, install **PlatformIO IDE**.
2. **Clone** the repo and open the `backend/` folder.
3. **Edit** `include/config.h`:

   ```cpp
   #define WIFI_SSID     "Your_SSID"
   #define WIFI_PASSWORD "Your_Password"
   #define MQTT_SERVER   "broker.hivemq.com"
   #define MQTT_PORT     1883
   #define MQTT_TOPIC    "greenguard/gases"
   ```
4. **Connect** ESP32 via USB.
5. In PlatformIO sidebar, click **Upload** to compile and flash.

### Frontend Setup (Dashboard)

1. **Navigate** to `dashboard/`:

   ```bash
   cd dashboard
   ```
2. **Install** dependencies:

   ```bash
   npm install
   ```
3. **Configure** `.env`:

   ```env
   VITE_MQTT_BROKER=wss://test.mosquitto.org:8081
   VITE_MQTT_TOPIC=greenguard/gases
   ```
4. **Run** the dashboard:

   ```bash
   npm run dev
   ```
5. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

* **Real-time Monitoring**: Observe live CO₂ & CH₄ levels on the bar chart.
* **Visual Alerts**: LED turns Yellow when levels approach thresholds, Red on danger.
* **PWA Features**: Install on mobile, receive push notifications (optional extension).

## Testing & Validation

1. **Sensor Calibration**: Burn in MQ-4 for 24h; verify MH-Z19 with known CO₂ source.
2. **Simulate Alerts**: Expose to CO₂ canisters or methane source safely.
3. **MQTT Debug**: Use MQTT Explorer to inspect published messages.

## Future Enhancements

* **Additional Gases**: N₂O, HFCs, PFCs via specialized sensors
* **Historical Dashboard**: Persist data in InfluxDB or Firebase for trend analysis
* **Mobile App**: React Native companion app with push alerts
* **Government Integration**: API endpoints for regulatory reporting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/XYZ`)
3. Commit changes (`git commit -m "Add XYZ feature"`)
4. Push to branch (`git push origin feature/XYZ`)
5. Open a Pull Request

## License

This project is released under the **MIT License**. See [LICENSE](LICENSE) for details.

---

*© 2025 FUTA GreenGuard Team*
