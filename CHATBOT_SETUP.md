# Alpen Maler Assistent

Der neue Website-Chatbot besteht aus:

- `chatbot.css` – Darstellung und responsive mobile Ansicht
- `chatbot.js` – Dialog, FAQ-Antworten, Sprachunterstützung und Kontaktaktionen
- `chatbot-preview.html` – eigenständige Vorschauseite

## Einbindung

Auf jeder gewünschten HTML-Seite wird vor `</head>` diese Zeile eingefügt:

```html
<link rel="stylesheet" href="chatbot.css">
```

Vor `</body>` wird diese Zeile eingefügt:

```html
<script src="chatbot.js" defer></script>
```

Der aktuelle Stand ist ein sicherer, regelbasierter Assistent ohne externen API-Schlüssel. Ein KI-Backend kann in einem weiteren Schritt ergänzt werden, ohne einen geheimen Schlüssel im Browser offenzulegen.
