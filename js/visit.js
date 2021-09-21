import { Element, Select } from "./elements.js";
import { Form } from "./form.js";
import { createVisit } from "./API.js";
import { renderAllCards } from "./cards.js";
import { modal } from "./modal.js";

class Visit extends Element {
  constructor() {
    super();
    this.commonFields = [
      {
        typeField: "input",
        type: "text",
        name: "fullName",
        placeholder: "Full Name",
      },
      {
        typeField: "input",
        type: "text",
        name: "purposeOfVisit",
        placeholder: "Purpose of your visit",
      },
      {
        typeField: "select",
        name: "urgency",
        options: ["Normal", "Priority", "Emergency"],
      },
      {
        typeField: "textarea",
        type: "textarea",
        name: "description",
        placeholder: "Description",
      },
    ];
  }

  chooseTheDoctor = (e) => {
    let value = e.target.value;
    const form = document.querySelector("form");
    if (form) {
      this.createVisitForm.removeChild(form);
    }

    if (value === "Cardiologist") {
      this.currentDoctorForm = new VisitCardiologist(this.commonFields);
      return this.createVisitForm.append(this.currentDoctorForm.render());
    }
    if (value === "Dantist") {
      this.currentDoctorForm = new VisitDantist(this.commonFields);
      return this.createVisitForm.append(this.currentDoctorForm.render());
    }
    if (value === "Therapist") {
      this.currentDoctorForm = new VisitTherapist(this.commonFields);
      return this.createVisitForm.append(this.currentDoctorForm.render());
    }
  };

  render() {
    this.createVisitForm = this.createElement("div", ["create-visit"]);
    const select = new Select(
      ["Cardiologist", "Dantist", "Therapist"],
      "doctor",
      "",
      this.chooseTheDoctor
    );
    this.createVisitForm.append(select.render());
    return this.createVisitForm;
  }
}

class VisitCardiologist {
  constructor(commonFields) {
    this.commonFields = commonFields;
    this.createVisitForm = [
      ...this.commonFields,
      {
        typeField: "input",
        type: "text",
        name: "pressure",
        placeholder: "Normal pressure",
      },
      {
        typeField: "input",
        type: "text",
        name: "bodyMassIndex",
        placeholder: "Body Mass Index",
      },
      {
        typeField: "textarea",
        type: "textarea",
        name: "pastDiseases",
        placeholder: "Past diseases of the cardiovascular system",
      },
      { typeField: "input", type: "text", name: "age", placeholder: "Age" },
      {
        typeField: "button",
        type: "submit",
        text: "Create",
        functionClick: this.handlerCreateVisit,
      },
    ];
  }

  handlerCreateVisit = (e) => {
    const elements = e.target.elements;
    let formData = { doctor: "Cardiologist" };
    this.createVisitForm.forEach((el) => {
      if (el.name) {
        console.log(formData);
        formData = { ...formData, [el.name]: elements[el.name].value };
      }
    });
    createVisit(formData).then((response) => {
      if (response) {
        renderAllCards();
        modal.hide();
      }
    });
  };

  render() {
    this.visitCardiologist = new Form(this.createVisitForm);
    return this.visitCardiologist.render();
  }
}

class VisitDantist {
  constructor(commonFields) {
    this.commonFields = commonFields;
    this.createVisitForm = [
      ...this.commonFields,
      {
        typeField: "input",
        type: "text",
        name: "dateLastVisit",
        placeholder: "Date of your last visit",
      },
      {
        typeField: "button",
        type: "submit",
        text: "Create",
        functionClick: this.handlerCreateVisit,
      },
    ];
  }

  handlerCreateVisit = (e) => {
    const elements = e.target.elements;
    let formData = { doctor: "Dantist" };
    this.createVisitForm.forEach((el) => {
      if (el.name) {
        formData = { ...formData, [el.name]: elements[el.name].value };
      }
    });
    createVisit(formData).then((response) => {
      if (response) {
        renderAllCards();
        modal.hide();
      }
    });
  };

  render() {
    this.visitDantist = new Form(this.createVisitForm);
    return this.visitDantist.render();
  }
}

class VisitTherapist {
  constructor(commonFields) {
    this.commonFields = commonFields;
    this.createVisitForm = [
      ...this.commonFields,
      { typeField: "input", type: "text", name: "age", placeholder: "Age" },
      {
        typeField: "button",
        type: "submit",
        text: "Create",
        functionClick: this.handlerCreateVisit,
      },
    ];
  }

  handlerCreateVisit = (e) => {
    const elements = e.target.elements;
    let formData = { doctor: "Therapist" };
    this.createVisitForm.forEach((el) => {
      if (el.name) {
        formData = { ...formData, [el.name]: elements[el.name].value };
      }
    });
    createVisit(formData).then((response) => {
      if (response) {
        renderAllCards();
        modal.hide();
      }
    });
  };

  render() {
    this.visitTherapist = new Form(this.createVisitForm);
    return this.visitTherapist.render();
  }
}

export const visitForm = new Visit();
