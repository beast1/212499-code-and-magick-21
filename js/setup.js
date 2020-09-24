'use strict';

const data = {
  firstNames: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  secondNames: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  coatColor: [`rgb (101, 137, 164)`, `rgb (241, 43, 107)`, `rgb (146, 100, 161) `, `rgb (56, 159, 117)`, `rgb (215, 210, 55)`, `rgb (0, 0, 0)`],
  eyesColor: [`black`, `red`, `blue`, `yellow`, `green`]
};

const drawSetup = () => {
  const setupTemplate = document.querySelector(`.setup`);
  setupTemplate.classList.remove(`hidden`);
};

const structureCharactersData = (charactersRandomData, charactersCount = 1) => {
  const charactersStructuredData = [];
  for (let i = 0; i < charactersCount; i++) {
    charactersStructuredData.push({
      name: `${charactersRandomData.firstNames[window.randomInteger(0, charactersRandomData.firstNames.length - 1)]} ${charactersRandomData.secondNames[window.randomInteger(0, charactersRandomData.secondNames.length - 1)]}`,
      coatColor: charactersRandomData.coatColor[window.randomInteger(0, charactersRandomData.coatColor.length - 1)],
      eyesColor: charactersRandomData.eyesColor[window.randomInteger(0, charactersRandomData.eyesColor.length - 1)]
    });
  }
  return charactersStructuredData;
};

const drawCharacters = (charactersData) => {
  const characterTemplate = document.querySelector(`#similar-wizard-template`);
  const charactersFragment = document.createDocumentFragment();
  const charactersParent = document.querySelector(`.setup-similar-list`);
  const charactersParentContainer = document.querySelector(`.setup-similar`);

  charactersData.forEach((character) => {
    const currentCharacterTemplate = characterTemplate.content.querySelector(`.setup-similar-item`).cloneNode(true);
    const nameField = currentCharacterTemplate.querySelector(`.setup-similar-label`);
    const coat = currentCharacterTemplate.querySelector(`.wizard-coat`);
    const eyes = currentCharacterTemplate.querySelector(`.wizard-eyes`);

    nameField.textContent = character.name;
    coat.style.fill = character.coatColor;
    eyes.style.fill = character.eyesColor;

    charactersFragment.appendChild(currentCharacterTemplate);
  });

  charactersParent.appendChild(charactersFragment);
  charactersParentContainer.classList.remove(`hidden`);
};

drawSetup();
drawCharacters(structureCharactersData(data, 4));

