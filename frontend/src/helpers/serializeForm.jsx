function SerializeForm(form) {

const formData = new FormData(form);

const completeObj = {};
console.log(formData);
for (let [name, value] of formData) {
   completeObj[name] = value;
}

return completeObj;


}

export default SerializeForm;