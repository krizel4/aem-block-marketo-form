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
  
  // UPDATE THE FOLLOWING LINE
  await loadScript('//MARKETO-URL-HERE/js/forms2/js/forms2.min.js', block);
  await waitForMktoForms();

  const formElement = document.createElement('form');
  formElement.id = `mktoForm_${formId}`;
  block.appendChild(formElement);

  // UPDATE THE FOLLOWING LINE
  window.MktoForms2.loadForm('//MARKETO-URL-HERE', 'YOUR-MUNCHKIN-CODE-HERE', formId);

  window.MktoForms2.whenReady((form) => {
    form.onSuccess((values, followUpUrl) => {
      window.location.href = followUpUrl;

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
