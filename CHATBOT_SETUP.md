# Alpen Maler Assistent

Der neue Website-Chatbot besteht aus:

- `chatbot-loader.js` – lädt alle Erweiterungen sicher
- `branding-cleanup.js` – ersetzt nur sichtbare Webador-Spuren, ohne Webador-CSS oder -JavaScript zu entfernen
- `favicon.svg` – eigenes Alpen-Favicon für den Browser-Tab
- `chatbot.css` – Darstellung und responsive mobile Ansicht
- `chatbot.js` – Dialog, FAQ-Antworten, Sprachunterstützung und Kontaktaktionen
- `chatbot-preview.html` – eigenständige Vorschauseite

## Sichere Einbindung

Auf jeder gewünschten HTML-Seite wird nur diese Zeile vor `</body>` eingefügt:

```html
<script src="chatbot-loader.js" defer></script>
```

Der Loader bindet das Chatbot-Design, die Chatfunktion und die vorsichtige Branding-Bereinigung automatisch ein.

## Was bewusst nicht entfernt wird

Die bestehenden Webador-/JouwWeb-CSS- und JavaScript-Dateien bleiben unangetastet, weil sie derzeit Teile des Designs und der Navigation bereitstellen. Entfernt oder ersetzt werden nur sichtbare Branding-Elemente wie das Webador-Favicon und eindeutig sichtbare Webador-/JouwWeb-Hinweise.

Der aktuelle Chatbot ist ein sicherer, regelbasierter Assistent ohne externen API-Schlüssel. Ein KI-Backend kann später ergänzt werden, ohne einen geheimen Schlüssel im Browser offenzulegen.
