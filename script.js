const chromosomesNumber = 6;
const chromosomesDiv = document.querySelector(".chromosomes");

const addChromosomeInput = () => {
  for (let i = 1; i <= chromosomesNumber; i++) {
    const chromosome = document.createElement("div");
    chromosome.setAttribute("class", "chromosome");

    const chromosomeInput = document.createElement("input");
    chromosomeInput.setAttribute("type", "text");
    chromosomeInput.setAttribute("id", `ch${i}`);
    chromosomeInput.setAttribute("maxlength", 6);

    const chInputLabel = document.createElement("label");
    chInputLabel.setAttribute("for", `ch${i}`);
    chInputLabel.textContent = `Ch ${i}:`;

    chromosome.append(chInputLabel);
    chromosome.append(chromosomeInput);
    chromosomesDiv.append(chromosome);
  }
};

addChromosomeInput();
