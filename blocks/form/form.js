const embedMarketoForm = (block, formId) => {
  // Load the Marketo script
  const marketoScript = document.createElement('script');
  marketoScript.src = '//www2.mammotome.com/js/forms2/js/forms2.min.js';

  marketoScript.onload = () => {
    const formElement = document.createElement('form');
    formElement.id = `mktoForm_${formId}`;
    block.appendChild(formElement);
    if (window.MktoForms2) {
      MktoForms2.loadForm("//www2.mammotome.com", "435-TDP-284", formId);
    }
  };
  document.head.appendChild(marketoScript);
};

export default async function decorate(block) {
  const formId = block.textContent.trim();
  block.textContent = '';
  embedMarketoForm(block, formId);
}