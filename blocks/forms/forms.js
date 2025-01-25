const loadScript = (url, callback, type) => {
  const head = document.querySelector('head');
  const script = document.createElement('script');
  script.src = url;
  if (type) {
    script.setAttribute('type', type);
  }
  script.onload = callback;
  head.append(script);
  return script;
};

const embedMarketoForm = (formId) => {
  const scriptUrl = '//www2.mammotome.com/js/forms2/js/forms2.min.js';
  loadScript(scriptUrl, () => {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `<form id="mktoForm_${formId}"></form>`;
    document.body.appendChild(formContainer);

    if (window.MktoForms2) {
      window.MktoForms2.loadForm('//www2.mammotome.com', '435-TDP-284', formId);
    } else {
      console.error('Marketo Forms library failed to load.');
    }
  });
  return `<div id="marketo-embed-container">
    <form id="mktoForm_${formId}"></form>
  </div>`;
};

const loadEmbed = (block, link, formId) => {
  if (block.classList.contains('embed-is-loaded')) {
    return;
  }

  if (link.includes('mammotome.com')) {
    block.innerHTML = embedMarketoForm(formId);
    block.classList.add('embed-is-loaded');
  } else {
    console.error('Invalid link for Marketo form.');
  }
};

export default function decorate(block) {
  const link = block.dataset.link; // Assume link is provided via a data attribute
  const formId = block.dataset.formId || '1063'; // Default to 1063 if no form ID provided
  block.textContent = ''; // Clear block content
  loadEmbed(block, link, formId);
}
