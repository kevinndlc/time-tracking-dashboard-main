import data from './data/data.json';

const periodButtons = [
  ...document.querySelectorAll('[name="tracking-period"]'),
];
const trackerSections = [...document.querySelectorAll('.tracker__section')];

function log(message: string) {
  console.log(
    `%c${message}`,
    `background:linear-gradient(cyan, darkcyan);
  color: #333;
  padding: 0.25rem 1rem;
  font-weight: 700;
  border-radius: 5px;`
  );
}

function getSelectedPeriod(): string {
  const selectedPeriod = periodButtons.find(
    (radio) => (radio as HTMLInputElement).checked
  ).id;
  log(`Selected period: ${selectedPeriod}`);

  return selectedPeriod;
}

function updateData() {
  trackerSections.forEach((section) => {
    const sectionTitle = section.querySelector('.section__title').textContent;
    const correspondingData = data.find((d) => d.title === sectionTitle);
    const correspondingTimeframe = correspondingData.timeframes[selectedPeriod];

    const currentDataElement = section.querySelector('.current-tracking-data');
    const previousDataElement = section.querySelector(
      '.previous-tracking-data'
    );

    currentDataElement.textContent =
      correspondingTimeframe.current +
      (correspondingTimeframe.current > 1 ? 'hrs' : 'hr');
    previousDataElement.textContent = `
      ${
        selectedPeriod === 'daily'
          ? 'Yesterday'
          : selectedPeriod === 'weekly'
          ? 'Last Week'
          : 'Last Month'
      } - ${correspondingTimeframe.previous}${
      correspondingTimeframe.previous > 1 ? 'hrs' : 'hr'
    }
    `;
  });
}

let selectedPeriod = getSelectedPeriod();
updateData();

periodButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    selectedPeriod = getSelectedPeriod();
    updateData();
  });
});
