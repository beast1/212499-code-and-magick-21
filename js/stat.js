'use strict';

const Cloud = {
  X: 110,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  PADDING: 25,
  NEW_LINE: 20
};

const Bar = {
  MAX_HEIGHT: 150,
  WIDTH: 40,
  GAP: 50,
  FILL: `rgba(255, 0, 0, 1)`,
  VALUE_HEIGHT: 30,
  VALUE_PADDING: 10
};

const HEX = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `A`, `B`, `C`, `D`, `E`, `F`];

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomHEXNum() {
  return HEX[randomInteger(0, 16)];
}

function renderCloud(ctx, cloudX, cloudY, cloudFill) {
  ctx.fillStyle = cloudFill;
  ctx.fillRect(cloudX, cloudY, Cloud.WIDTH, Cloud.HEIGHT);
}

function renderBar(ctx, barX, barY, barFill, barValue, maxValue) {
  const BAR_HEIGHT = (barValue * Bar.MAX_HEIGHT) / maxValue;
  ctx.fillStyle = barFill;
  ctx.fillRect(barX, barY + Bar.MAX_HEIGHT - BAR_HEIGHT, Bar.WIDTH, BAR_HEIGHT);
  ctx.fillStyle = `black`;
  ctx.fillText((barValue).toFixed(), barX, Cloud.HEIGHT - Bar.VALUE_HEIGHT - BAR_HEIGHT - Bar.VALUE_PADDING);
}
// s
function renderBars(ctx, names, times) {
  const bars = [];
  let barX = Cloud.X + Cloud.PADDING * 1.5;
  let maxTimes = times[0];
  const pushBarData = (name, time, fill) => {
    bars.push({
      name,
      time,
      fill
    });
  };

  for (let i = 0; i < times.length; i++) {
    if (times[i] > maxTimes) {
      maxTimes = times[i];
    }

    if (names[i] === `Вы`) {
      pushBarData(names[i], times[i], Bar.FILL);
    }
  }

  for (let i = 0; i < names.length; i++) {
    if (names[i] !== `Вы`) {
      pushBarData(names[i], times[i], `#0000${randomHEXNum()}${randomHEXNum()}`);
    }
  }

  bars.forEach(function (bar) {
    ctx.fillStyle = `black`;
    ctx.fillText(bar.name, barX, Cloud.HEIGHT - Bar.VALUE_PADDING);
    renderBar(ctx, barX, Cloud.Y + Cloud.PADDING + (Cloud.NEW_LINE * 3 - 5), bar.fill, bar.time, maxTimes);
    barX = barX + Bar.WIDTH + Bar.GAP;
  });
}

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, Cloud.X + 10, Cloud.Y + 10, `rgb(0, 0, 0, .7)`);
  renderCloud(ctx, Cloud.X, Cloud.Y, `white`);

  ctx.fillStyle = `black`;
  ctx.fillText(`Ура вы победили!`, Cloud.X + Cloud.PADDING, Cloud.Y + Cloud.PADDING);
  ctx.fillText(`Список результатов: `, Cloud.X + Cloud.PADDING, Cloud.Y + Cloud.PADDING + Cloud.NEW_LINE);

  renderBars(ctx, names, times);
};
