const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add("modal__input_type_error");
};

const hideInputError = (formEl, inputEl) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorEl.textContent = "";
  inputEl.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEl, inputEL) => {
  if (!inputEL.validity.valid) {
    showInputError(formEl, inputEL, inputEL.validationMessage);
  } else {
    hideInputError(formEl, inputEL);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonSubmit) => {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.disabled = true;
    buttonSubmit.classList.add("modal__submit_btn_disabled");
  } else {
    buttonSubmit.disabled = false;
    buttonSubmit.classList.remove("modal__submit_btn_disabled");
  }
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonSubmit = formEl.querySelector(".modal__submit-btn");

  toggleButtonState(inputList, buttonSubmit);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputList, buttonSubmit);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();

const modalExit = Array.from(document.querySelectorAll(".modal"));
modalExit.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});
