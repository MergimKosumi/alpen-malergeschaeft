(() => {
  if (window.__alpenChatLoaded) return;
  window.__alpenChatLoaded = true;

  const PHONE_DISPLAY = '+41 76 822 63 02';
  const PHONE_LINK = '41768226302';
  const OFFER_URL = 'offerte-anfordern.html';

  const root = document.createElement('div');
  root.className = 'alpen-chat';
  root.innerHTML = `
    <section class="alpen-chat__panel" role="dialog" aria-modal="false" aria-label="Alpen Maler Assistent">
      <header class="alpen-chat__header">
        <div class="alpen-chat__avatar" aria-hidden="true">A</div>
        <div class="alpen-chat__heading">
          <h2 class="alpen-chat__title">Alpen Maler Assistent</h2>
          <p class="alpen-chat__status"><span class="alpen-chat__status-dot"></span>Online für Ihre Anfrage</p>
        </div>
        <button class="alpen-chat__close" type="button" aria-label="Chat schliessen">×</button>
      </header>
      <div class="alpen-chat__messages" aria-live="polite"></div>
      <div class="alpen-chat__quick-list" aria-label="Schnellauswahl">
        <button class="alpen-chat__quick" type="button" data-question="Malerarbeiten innen">Innenarbeiten</button>
        <button class="alpen-chat__quick" type="button" data-question="Fugenlose Oberflächen">Fugenlos</button>
        <button class="alpen-chat__quick" type="button" data-question="Ich möchte eine Offerte">Offerte</button>
        <button class="alpen-chat__quick" type="button" data-question="Kontakt">Kontakt</button>
      </div>
      <form class="alpen-chat__composer">
        <textarea class="alpen-chat__input" rows="1" maxlength="600" placeholder="Schreiben Sie Ihre Frage …" aria-label="Nachricht"></textarea>
        <button class="alpen-chat__send" type="submit" aria-label="Nachricht senden">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </form>
      <div class="alpen-chat__footer">Unverbindliche Erstinformation. Verbindliche Preise nach Besichtigung oder Offerte.</div>
    </section>
    <button class="alpen-chat__launcher" type="button" aria-label="Chat öffnen" aria-expanded="false">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 11H6v-2h12v2zm0-3H6V8h12v2zm0-3H6V5h12v2z"/></svg>
      <span class="alpen-chat__badge">1</span>
    </button>`;

  document.body.appendChild(root);

  const launcher = root.querySelector('.alpen-chat__launcher');
  const closeButton = root.querySelector('.alpen-chat__close');
  const messages = root.querySelector('.alpen-chat__messages');
  const form = root.querySelector('.alpen-chat__composer');
  const input = root.querySelector('.alpen-chat__input');
  const badge = root.querySelector('.alpen-chat__badge');

  function addMessage(text, type = 'bot', actions = '') {
    const bubble = document.createElement('div');
    bubble.className = `alpen-chat__message alpen-chat__message--${type}`;
    bubble.textContent = text;
    if (actions) {
      const actionBox = document.createElement('div');
      actionBox.className = 'alpen-chat__actions';
      actionBox.innerHTML = actions;
      bubble.appendChild(actionBox);
    }
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  const offerActions = `
    <a class="alpen-chat__action alpen-chat__action--primary" href="${OFFER_URL}">Offerte anfordern</a>
    <a class="alpen-chat__action" href="https://wa.me/${PHONE_LINK}?text=${encodeURIComponent('Guten Tag, ich interessiere mich für eine Offerte von Alpen Malergeschäft.')}">WhatsApp</a>`;

  const contactActions = `
    <a class="alpen-chat__action alpen-chat__action--primary" href="tel:+${PHONE_LINK}">Anrufen</a>
    <a class="alpen-chat__action" href="https://wa.me/${PHONE_LINK}">WhatsApp</a>`;

  function detectLanguage(text) {
    const value = text.toLowerCase();
    if (/\b(përshëndetje|pershendetje|shqip|ofertë|oferte|lyerje|banes|shtëpi|shtepi)\b/.test(value)) return 'sq';
    if (/\b(hello|price|quote|painting|house|apartment)\b/.test(value)) return 'en';
    return 'de';
  }

  function answerFor(text) {
    const value = text.toLowerCase();
    const lang = detectLanguage(text);

    if (/offert|angebot|quote|preis|kosten|wieviel|sa kushton|çmim|cmim/.test(value)) {
      if (lang === 'sq') return ['Për një çmim të saktë na duhen lloji i punës, adresa, sipërfaqja e përafërt dhe disa fotografi. Mund ta dërgoni kërkesën përmes formularit ose WhatsApp-it.', offerActions];
      if (lang === 'en') return ['For an accurate price, we need the type of work, address, approximate area and a few photos. You can send the request using the quote form or WhatsApp.', offerActions];
      return ['Für einen genauen Preis benötigen wir die Art der Arbeiten, die Adresse, die ungefähre Fläche und möglichst einige Fotos. Senden Sie uns die Anfrage über das Formular oder per WhatsApp.', offerActions];
    }

    if (/fugenlos|hardrock|bad|badezimmer|küche|kueche|banjo|kuzhin/.test(value)) {
      if (lang === 'sq') return ['Ofrojmë sipërfaqe moderne pa fuga për banjo, kuzhina dhe hapësira banimi. Përgatitja e nënshtresës dhe sistemi i përshtatshëm përcaktohen pas kontrollit të objektit.', offerActions];
      if (lang === 'en') return ['We provide modern seamless surfaces for bathrooms, kitchens and living areas. The correct system and substrate preparation are determined after inspecting the property.', offerActions];
      return ['Wir erstellen moderne fugenlose Oberflächen für Bäder, Küchen und Wohnbereiche. Der passende Aufbau und die Untergrundvorbereitung werden nach Besichtigung festgelegt.', offerActions];
    }

    if (/innen|wohnung|zimmer|decke|wand|maler|lyerje|banes|painting/.test(value)) {
      if (lang === 'sq') return ['Kryejmë lyerje të brendshme, përgatitje të mureve, stuko, lëmim, grundim dhe punime me rul, brushë ose Airless. Punojmë pastër dhe me mbulim profesional.', offerActions];
      if (lang === 'en') return ['We provide interior painting, wall preparation, filling, sanding, priming and application by roller, brush or airless spraying.', offerActions];
      return ['Wir übernehmen Innenmalerarbeiten, Abdeckarbeiten, Spachteln, Schleifen, Grundierungen sowie Beschichtungen mit Rolle, Pinsel oder Airless.', offerActions];
    }

    if (/aussen|fassade|facade|jasht/.test(value)) {
      return ['Wir übernehmen Fassaden- und Aussenmalerarbeiten inklusive Vorbereitung, Ausbesserungen, Grundierung und wetterbeständiger Beschichtung. Für eine Beurteilung benötigen wir Fotos oder eine Besichtigung.', offerActions];
    }

    if (/kontakt|telefon|phone|whatsapp|anrufen|numri/.test(value)) {
      if (lang === 'sq') return [`Mund të na kontaktoni në ${PHONE_DISPLAY} ose përmes WhatsApp-it.`, contactActions];
      if (lang === 'en') return [`You can reach us at ${PHONE_DISPLAY} or by WhatsApp.`, contactActions];
      return [`Sie erreichen uns unter ${PHONE_DISPLAY} oder direkt per WhatsApp.`, contactActions];
    }

    if (/hallo|hoi|guten tag|grüezi|gruezi|pershendet|përshëndet|hello|hi\b/.test(value)) {
      if (lang === 'sq') return ['Përshëndetje! Si mund t’ju ndihmojmë? Mund të pyesni për lyerje, renovime, sipërfaqe pa fuga ose një ofertë.', ''];
      if (lang === 'en') return ['Hello! How can we help? You can ask about painting, renovations, seamless surfaces or a quotation.', ''];
      return ['Grüezi! Wie dürfen wir Ihnen helfen? Fragen Sie uns zu Malerarbeiten, Renovationen, fugenlosen Oberflächen oder einer Offerte.', ''];
    }

    if (lang === 'sq') return ['Faleminderit për mesazhin. Për një përgjigje të saktë, na shkruani çfarë pune nevojitet, ku ndodhet objekti dhe sa e madhe është sipërfaqja. Mund të dërgoni edhe fotografi në WhatsApp.', offerActions];
    if (lang === 'en') return ['Thank you for your message. Please tell us what work is required, where the property is located and the approximate size. You can also send photos by WhatsApp.', offerActions];
    return ['Vielen Dank für Ihre Nachricht. Teilen Sie uns bitte mit, welche Arbeiten gewünscht sind, wo sich das Objekt befindet und wie gross die ungefähre Fläche ist. Fotos können Sie auch per WhatsApp senden.', offerActions];
  }

  function handleMessage(raw) {
    const text = raw.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    input.style.height = 'auto';
    const [reply, actions] = answerFor(text);
    window.setTimeout(() => addMessage(reply, 'bot', actions), 250);
  }

  function openChat() {
    root.classList.add('alpen-chat--open');
    launcher.setAttribute('aria-expanded', 'true');
    badge.hidden = true;
    window.setTimeout(() => input.focus(), 180);
  }

  function closeChat() {
    root.classList.remove('alpen-chat--open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  }

  launcher.addEventListener('click', () => root.classList.contains('alpen-chat--open') ? closeChat() : openChat());
  closeButton.addEventListener('click', closeChat);
  form.addEventListener('submit', event => { event.preventDefault(); handleMessage(input.value); });
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); handleMessage(input.value); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 112)}px`;
  });
  root.querySelectorAll('.alpen-chat__quick').forEach(button => button.addEventListener('click', () => {
    openChat();
    handleMessage(button.dataset.question || button.textContent);
  }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && root.classList.contains('alpen-chat--open')) closeChat(); });

  addMessage('Grüezi! Ich bin der digitale Assistent von Alpen Malergeschäft. Wie kann ich Ihnen helfen? Sie können auch auf Albanisch oder Englisch schreiben.');
})();
