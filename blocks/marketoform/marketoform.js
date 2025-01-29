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
  await loadScript('//www2.mammotome.com/js/forms2/js/forms2.min.js', block);
  await waitForMktoForms();
  const formElement = document.createElement('form');
  formElement.id = `mktoForm_${formId}`;
  block.appendChild(formElement);
  window.MktoForms2.loadForm('//www2.mammotome.com', '435-TDP-284', formId);
  window.MktoForms2.whenReady((form) => {
    form.onSuccess((values, followUpUrl) => {
      console.log('Form Submitted: ', values, followUpUrl);
      window.location.href = followUpUrl;
      if (!followUpUrl) {
        console.error('FollowUp URL is missing or invalid:', followUpUrl);
        return false;
      }
      dataLayer.push({
        event: 'marketo.success',
        'marketo.form_id': formId,
        'marketo.form_values': values,
        'marketo.follow_up_url': followUpUrl,
        eventCallback() {
          console.log('Working on the redirect...');
          form.getFormElem().hide();
          document.location.href = followUpUrl;
          console.log('Form submitted successfully');
        },
      });
    });
  });
};

export default async function decorate(block) {
  const formId = block.textContent.trim();
  block.textContent = '';
  embedMarketoForm(block, formId);
}
