'use strict';
// Окно .setup должно открываться по нажатию на блок .setup-open. Открытие окна производится удалением класса hidden у блока.
const setupModal = document.querySelector(`.setup`);
const setupOpenBtn = document.querySelector(`.setup-open`);
const setupCloseBtn = setupModal.querySelector(`.setup-close`);

const setupNameInput = document.querySelector(`.setup-user-name`);
const setupForm = document.querySelector(`.setup-wizard-form`);
const setupSubmitBtn = document.querySelector(`.setup-submit`);

const openSetup = () => {
  setupModal.classList.remove(`hidden`);
};

const closeSetup = () => {
  setupModal.classList.add(`hidden`);
};

setupOpenBtn.addEventListener(`click`, () => {
  openSetup();
});
//   Окно .setup должно закрываться по нажатию на элемент .setup-close, расположенный внутри окна.
setupCloseBtn.addEventListener(`click`, () => {
  closeSetup();
});
//   Добавьте обработчики для альтернативного ввода с клавиатуры keydown для кнопок открытия/закрытия диалога настройки персонажа:
//   Когда иконка пользователя в фокусе .setup-open-icon, то окно настройки персонажа должно открываться по нажатию кнопки ENTER
const setupOpenBtnIcon = document.querySelector(`.setup-open-icon`);
setupOpenBtnIcon.addEventListener(`keydown`, (e) => {
  if (e.key === `Enter`) {
    openSetup();
  }
});
//   Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог.
document.addEventListener(`keydown`, (e) => {
  if (e.key === `Escape`) {
    closeSetup();
  }
});
//   Если фокус находится на форме ввода имени, то окно закрываться не должно.
setupNameInput.addEventListener(`keydown`, (e) => {
  if (e.key === `Escape`) {
    e.stopPropagation();
  }
});
//   Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога.
setupCloseBtn.addEventListener(`keydown`, (e) => {
  if (e.key === `Enter`) {
    closeSetup();
  }
});
//   Если диалог открыт, нажатие на кнопку «Сохранить» приводит к отправке формы.
setupSubmitBtn.addEventListener(`click`, () => {
  setupForm.submit();
});
//   Если диалог открыт и фокус находится на кнопке «Сохранить», нажатие на ENTER приводит к отправке формы.
setupSubmitBtn.addEventListener(`keydown`, (e) => {
  if (e.key === `Enter`) {
    setupForm.submit();
  }
});
