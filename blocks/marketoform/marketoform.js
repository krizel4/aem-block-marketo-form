const loadScript = (src, block) => new Promise((resolve, reject) => {
  const marketoScript = document.createElement('script');
  marketoScript.src = src;
  marketoScript.onload = () => resolve();
  marketoScript.onerror = () => reject(new Error(`Failed to load script: ${src}`));
  block.appendChild(marketoScript);
});

const waitForMktoForms = () => new Promise((resolve) => {
  const checkMktoForms = () => {
    if (window.MktoForms2) {
      resolve(window.MktoForms2);
    } else {
      setTimeout(checkMktoForms, 100);
    }
  };
  checkMktoForms();
});

const embedMarketoForm = async (block, formId) => {
  await loadScript('//www.domainhere.com/js/forms2/js/forms2.min.js', block);
  await waitForMktoForms();

  const formElement = document.createElement('form');
  formElement.id = `mktoForm_${formId}`;
  block.appendChild(formElement);

  // Place your munchkin code in XXX-XXX-XXX
  window.MktoForms2.loadForm('//www.domainhere.com', 'XXX-XXX-XXX', formId);

  window.MktoForms2.whenReady((form) => {
    form.onSuccess((values, followUpUrl) => {
      // Define your followUpUrl in your Marketo form's settings
      window.location.href = followUpUrl;

      // If you're not tracking this information in GTM, this data layer push isn't necessary.
      dataLayer.push({
        event: 'marketo.success',
        'marketo.timestamp': new Date().toLocaleTimeString(),
        'marketo.form_id': formId,
        'marketo.form_values': values,
        'marketo.follow_up_url': followUpUrl,
        eventCallback() {
          form.getFormElem().hide();
          document.location.href = followUpUrl;
        },
      });
      return false;
    });
  });
};

export default async function decorate(block) {
  const formId = block.textContent.trim();
  block.textContent = '';
  embedMarketoForm(block, formId);
}