const MUNCHKIN = '435-TDP-284';
const FORMS2 = '//www2.mammotome.com/js/forms2/js/forms2.min.js';

const embedForm = (formid) => {
  `<script src="${FORMS2}"></script>
      <form id="mktoForm_${formid}">
      </form>
      <script>MktoForms2.loadForm("//www2.mammotome.com", "${MUNCHKIN}", (${formid});</script>`;
    return embedForm;
};
