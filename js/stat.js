'use strict';

const Cloud = {
  position: {
    X: 110,
    Y: 10
  },
  size: {
    WIDTH: 420,
    HEIGHT: 270,
    PADDING: 25,
    NEW_LINE: 20
  }
};

const Bar = {
  size: {
    MAX_HEIGHT: 150,
    WIDTH: 40,
    GAP: 50
  },
  fill: {
    ACCENT: `rgba(255, 0, 0, 1)`
  },
  value: {
    HEIGHT: 30,
    PADDING: 10
  }
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
  ctx.fillRect(cloudX, cloudY, Cloud.size.WIDTH, Cloud.size.HEIGHT);
}

function renderBar(ctx, barX, barY, barFill, barValue, maxValue) {
  const BAR_HEIGHT = (barValue * Bar.size.MAX_HEIGHT) / maxValue;
  ctx.fillStyle = barFill;
  ctx.fillRect(barX, barY + Bar.size.MAX_HEIGHT - BAR_HEIGHT, Bar.size.WIDTH, BAR_HEIGHT);
  ctx.fillStyle = `black`;
  ctx.fillText((barValue).toFixed(), barX, Cloud.size.HEIGHT - Bar.value.HEIGHT - BAR_HEIGHT - Bar.value.PADDING);
}
// s
function renderBars(ctx, names, times) {
  const bars = [];
  let barX = Cloud.position.X + Cloud.size.PADDING * 1.5;
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
      pushBarData(names[i], times[i], Bar.fill.ACCENT);
    }
  }

  for (let i = 0; i < names.length; i++) {
    if (names[i] !== `Вы`) {
      pushBarData(names[i], times[i], `#0000${randomHEXNum()}${randomHEXNum()}`);
    }
  }

  bars.forEach(function (bar) {
    ctx.fillStyle = `black`;
    ctx.fillText(bar.name, barX, Cloud.size.HEIGHT - Bar.value.PADDING);
    renderBar(ctx, barX, Cloud.position.Y + Cloud.size.PADDING + (Cloud.size.NEW_LINE * 3 - 5), bar.fill, bar.time, maxTimes);
    barX = barX + Bar.size.WIDTH + Bar.size.GAP;
  });
}

function renderStatistics(ctx, names, times) {
  renderCloud(ctx, Cloud.position.X + 10, Cloud.position.Y + 10, `rgb(0, 0, 0, .7)`);
  renderCloud(ctx, Cloud.position.X, Cloud.position.Y, `white`);

  ctx.fillStyle = `black`;
  ctx.fillText(`Ура вы победили!`, Cloud.position.X + Cloud.size.PADDING, Cloud.position.Y + Cloud.size.PADDING);
  ctx.fillText(`Список результатов: `, Cloud.position.X + Cloud.size.PADDING, Cloud.position.Y + Cloud.size.PADDING + Cloud.size.NEW_LINE);

  renderBars(ctx, names, times);
}
