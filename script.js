import { evolve } from "./geneticAlgorithm.js";
import { defaultValues, chromosome } from "./variables.js";

const calculateBtn = document.querySelector(".calculate");
const chromosomesDiv = document.querySelector(".chromosomes");

let chromosomesNumber = 6;

const addChromosomeInput = () => {
  for (let i = 1; i <= chromosomesNumber; i++) {
    const Singlechromosome = document.createElement("div");
    Singlechromosome.setAttribute("class", "chromosome");

    const chromosomeInput = document.createElement("input");
    chromosomeInput.setAttribute("type", "text");
    chromosomeInput.setAttribute("id", `ch${i}`);
    chromosomeInput.setAttribute("maxlength", 5);

    let randomChromosome = Math.floor(Math.random() * 32);
    chromosomeInput.setAttribute(
      "placeholder",
      randomChromosome.toString(2).padStart(5, "0")
    );

    const chInputLabel = document.createElement("label");
    chInputLabel.setAttribute("for", `ch${i}`);
    chInputLabel.textContent = `Ch ${i}:`;

    Singlechromosome.append(chInputLabel);
    Singlechromosome.append(chromosomeInput);
    chromosomesDiv.append(Singlechromosome);
  }
};

addChromosomeInput();

const downloadData = () => {
  // Event.preventDefault();

  defaultValues.Pk = parseFloat(document.getElementById("Pk").value || 0.8);
  defaultValues.Pm = parseFloat(document.getElementById("Pm").value || 0.2);
  defaultValues.a = parseFloat(document.getElementById("a").value || -1);
  defaultValues.b = parseFloat(document.getElementById("b").value || 32);
  defaultValues.c = parseFloat(document.getElementById("c").value || 0);
  defaultValues.d = parseFloat(document.getElementById("d").value || 5);

  for (let i = 1; i <= chromosomesNumber; i++) {
    const chromosomeValue = document.getElementById(`ch${i}`).value;
    chromosome.push(chromosomeValue);
  }

  evolve();
};

calculateBtn.addEventListener("click", downloadData);
