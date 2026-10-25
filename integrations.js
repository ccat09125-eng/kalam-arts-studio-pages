(() => {
  const CONFIG = {
        googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycbzRSW-ZSAHgnY_62YI3zcclxPF_Nj3yLJzl9Pvc7MyH1glemCbyUP9hv1T0fkCt4mN4/exec",
    whatsappNumber: "971564692102"
  };
  const responseOrigin = "https://script.googleusercontent.com";
  const pendingSubmissions = new Map();
  let frame;

  function createWhatsAppUrl(values) {
    const message = [
      "Hello KALAM ARTS STUDIO, I would like to discuss a creative project.",
      `Name: ${values.get("name") || "Not provided"}`,
      `Contact: ${values.get("contact") || "Not provided"}`,
      `Project: ${values.get("type") || "Not provided"}`,
      `Preferred contact: ${values.get("method") || "Not provided"}`,
      `Brief: ${values.get("brief") || "Not provided"}`,
      `Dimensions: ${values.get("dimensions") || "Not specified"}`,
      `Budget: ${values.get("budget") || "Prefer to discuss"}`,
      `Required date: ${values.get("date") || "Not specified"}`
    ].join("\n");
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function setStatus(status, message, whatsappUrl) {
    status.replaceChildren(document.createTextNode(message));
    if (!whatsappUrl) return;
    status.append(" ");
    const link = document.createElement("a");
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Continue in WhatsApp";
    status.append(link);
  }

  function ensureFrame() {
    if (frame) return frame;
    frame = document.createElement("iframe");
    frame.name = "kalam-google-sheet-submit";
    frame.title = "Enquiry submission response";
    frame.setAttribute("aria-hidden", "true");
    frame.tabIndex = -1;
    frame.className = "integration-frame";
    document.body.append(frame);
    return frame;
  }

  function addHiddenField(form, name, value) {
    let field = form.querySelector(`input[name="${name}"]`);
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      form.append(field);
    }
    field.value = value;
  }

  function makeRequestId() {
    return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function submit(form, status) {
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const whatsappUrl = createWhatsAppUrl(values);
    const secureOrigin = window.location.protocol === "https:" && window.location.origin !== "null";

    if (!CONFIG.googleAppsScriptUrl || !secureOrigin) {
      setStatus(status, "Google Sheets and Gmail are not connected in this preview. Your details have not been stored.", whatsappUrl);
      return;
    }

    const submitButton = form.querySelector("button[type=submit]");
    const requestId = makeRequestId();
    const targetFrame = ensureFrame();
    const originField = window.location.origin;
    addHiddenField(form, "requestId", requestId);
    addHiddenField(form, "origin", originField);
    addHiddenField(form, "page", window.location.pathname);
    addHiddenField(form, "website", "");
    form.action = CONFIG.googleAppsScriptUrl;
    form.method = "post";
    form.target = targetFrame.name;
    if (submitButton) submitButton.disabled = true;
    setStatus(status, "Sending your enquiry to the studio...", null);
    pendingSubmissions.set(requestId, { form, status, submitButton, whatsappUrl });
    form.submit();

    window.setTimeout(() => {
      const pending = pendingSubmissions.get(requestId);
      if (!pending) return;
      pendingSubmissions.delete(requestId);
      if (pending.submitButton) pending.submitButton.disabled = false;
      setStatus(pending.status, "We could not confirm the connection. Your details may not have been received.", pending.whatsappUrl);
    }, 30000);
  }

  window.addEventListener("message", (event) => {
    if (event.origin !== responseOrigin || !event.data || event.data.type !== "KALAM_ENQUIRY_RESULT") return;
    const pending = pendingSubmissions.get(event.data.requestId);
    if (!pending || event.source !== frame?.contentWindow) return;
    pendingSubmissions.delete(event.data.requestId);
    if (pending.submitButton) pending.submitButton.disabled = false;

    if (!event.data.success) {
      setStatus(pending.status, event.data.message || "The enquiry could not be saved.", pending.whatsappUrl);
      return;
    }

    const message = event.data.emailSent
      ? "Enquiry saved to the studio sheet and Gmail notification sent."
      : "Enquiry saved to the studio sheet, but the Gmail notification could not be sent.";
    setStatus(pending.status, message, pending.whatsappUrl);
    pending.form.reset();
  });

  window.KalamIntegrations = { submit };
})();
