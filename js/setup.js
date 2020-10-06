'use strict';

const initSetup = () => {
  const modal = document.querySelector(`.setup`);
  const openBtn = document.querySelector(`.setup-open`);
  const openBtnIcon = document.querySelector(`.setup-open-icon`);
  const closeBtn = modal.querySelector(`.setup-close`);

  const nameInput = document.querySelector(`.setup-user-name`);
  const form = document.querySelector(`.setup-wizard-form`);
  const submitBtn = document.querySelector(`.setup-submit`);

  const openSetup = () => {
    modal.classList.remove(`hidden`);
    closeBtn.addEventListener(`click`, onCloseBtnClick);
    closeBtn.addEventListener(`keydown`, onCloseBtnKeydown);
    document.addEventListener(`keydown`, onModalKeydown);
    submitBtn.addEventListener(`click`, onSubmitBtnClick);
    submitBtn.addEventListener(`keydown`, onSubmitBtnKeydown);
  };
  const closeSetup = () => {
    modal.classList.add(`hidden`);
    closeBtn.removeEventListener(`click`, onCloseBtnClick);
    closeBtn.removeEventListener(`keydown`, onCloseBtnKeydown);
    document.removeEventListener(`keydown`, onModalKeydown);
    submitBtn.removeEventListener(`click`, onSubmitBtnClick);
    submitBtn.removeEventListener(`keydown`, onSubmitBtnKeydown);
  };

  const onOpenBtnClick = () => {
    openSetup();
  };
  const onCloseBtnClick = () => {
    closeSetup();
  };
  const onOpenBtnIconKeydown = (e) => {
    if (e.key === `Enter`) {
      openSetup();
    }
  };
  const onModalKeydown = (e) => {
    if (e.key === `Escape` && e.target !== nameInput) {
      closeSetup();
    }
  };
  const onCloseBtnKeydown = (e) => {
    if (e.key === `Enter`) {
      closeSetup();
    }
  };
  const onSubmitBtnClick = () => {
    form.submit();
  };
  const onSubmitBtnKeydown = (e) => {
    if (e.key === `Enter`) {
      form.submit();
    }
  };

  openBtn.addEventListener(`click`, onOpenBtnClick);
  openBtnIcon.addEventListener(`keydown`, onOpenBtnIconKeydown);
};

const initNameValidate = (parent) => {
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 25;
  const name = parent.querySelector(`.setup-user-name`);

  const onNameInput = () => {
    const valueLength = name.value.length;
    if (valueLength < MIN_NAME_LENGTH) {
      name.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      name.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
    } else {
      name.setCustomValidity(``);
    }
    name.reportValidity();
  };

  name.addEventListener(`input`, onNameInput);
};

const initCustomControl = (parent, customControlSelector, hiddenInputId, ruleToChange, stateArr) => {
  const control = parent.querySelector(customControlSelector);
  const input = parent.querySelector(hiddenInputId);
  const STATES = stateArr;
  const setNewState = () => {
    const newState = STATES[window.getRandomInteger(0, STATES.length - 1)];
    if (control.style[ruleToChange] !== newState) {
      control.style[ruleToChange] = newState;
      input.value = newState;
    } else {
      setNewState();
    }
  };
  const onControlClick = () => {
    setNewState();
  };
  control.addEventListener(`click`, onControlClick);
};

const initSetupForm = () => {
  const form = document.querySelector(`.setup-wizard-form`);

  initNameValidate(form);
  initCustomControl(form, `.setup-wizard .wizard-coat`, `#coat-color`, `fill`, [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`]);
  initCustomControl(form, `.setup-wizard .wizard-eyes`, `#eyes-color`, `fill`, [`black`, `red`, `blue`, `yellow`, `green`]);
  initCustomControl(form, `.setup-fireball-wrap`, `#fireball-color`, `background`, [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`]);
};

initSetup();
initSetupForm();
