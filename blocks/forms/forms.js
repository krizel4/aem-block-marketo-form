
const embedMarketoForm = (formId) =>`<script src="//www2.mammotome.com/js/forms2/js/forms2.min.js"></script> <form id="mktoForm_1063"></form> <script>MktoForms2.loadForm("//www2.mammotome.com","435-TDP-284",${formId});</script>`;


export default function decorate(block) {
  const formId = block.dataset.formId || '1063'; // default form is US-EN website form
  block.innerHTML = embedMarketoForm(formId);
}
