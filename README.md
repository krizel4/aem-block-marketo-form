# AEM Block: Marketo Form
In the word document, the block name is "marketoform" and in the text content area, it takes in the Marketo form's ID.

<img width="601" alt="example of marketo form block with text content including form id" src="https://github.com/user-attachments/assets/d7849313-dc5d-43d1-b40b-1fd7d4292909" />


## Modifications
- [Munchkin ID](https://nation.marketo.com/t5/knowledgebase/how-to-find-your-munchkin-id-for-a-marketo-instance/ta-p/248432)
- Form Id: In the photo example below, you can see the 4-digit form ID after the Munchkin ID (162-LBR-557).
![Example of embed form code from Marketo](https://experienceleague.adobe.com/en/docs/marketo/using/product-docs/demand-generation/forms/form-actions/media_143d0c35a972b429e2ddb7dda1cda3cf22866e8ee.png)
- dataLayer.push for Google Tag Manager [Link to Add'l Info from Marketo Engage Community](https://nation.marketo.com/t5/product-discussions/how-to-track-marketo-forms-in-google-analytics-using-using-api/td-p/305735)
    - event: 'marketo.success'
    - 'marketo.timestamp': new Date().toLocaleTimeString()
    - 'marketo.form_id': formId
    - 'marketo.form_values': values
    - 'marketo.follow_up_url': followUpUrl
