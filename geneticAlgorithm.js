import { defaultValues, chromosome } from "./variables.js";

// const startChromosomes = chromosome;

const functionCalculation = (x) => {
  return (
    defaultValues.a * Math.pow(x, 3) +
    defaultValues.b * Math.pow(x, 2) +
    defaultValues.c * x +
    defaultValues.d
  );
};

const rouletteWheel = (population, adaptationFun) => {
  // console.log(`Before roulet wheel population ${population}`);
  const sumOfAdaptationFun = adaptationFun.reduce((sum, el) => sum + el);

  const drawnChance = adaptationFun.map(
    // (el) => el / sumOfAdaptationFun
    (el) => ((el / sumOfAdaptationFun) * 100).toFixed(1)
  );
  // console.log(`Drawn chances: ${drawnChance}`);

  const newPopulation = [];
  // for (let i = 0; i < population.length; i++) {
  //   let randomNumber = Math.random();
  //   let accumulateSum = 0;
  //   // if (accumulateSum == 99.9) accumulateSum = Math.ceil(accumulateSum);
  //   for (let j = 0; j < population.length; j++) {
  //     accumulateSum += drawnChance[j];
  //     if (randomNumber <= accumulateSum) {
  //       newPopulation.push(population[j]);
  //       break;
  //     }
  //   }
  //   console.log(`Roulet wheel population ${population}`);
  // }

  // console.log(`Population lengh in roulet: ${population.length}`);
  for (let i = 0; i < population.length; i++) {
    const random = Math.random() * 100;
    // console.log(`Random drawn chance number: ${random}`);
    let accumulateSum = 0;
    for (let j = 0; j < population.length; j++) {
      accumulateSum += parseFloat(drawnChance[j]);
      if (accumulateSum === 99.9) accumulateSum = Math.ceil(accumulateSum);

      // console.log(`Accumulated sum: ${accumulateSum}`);
      if (random <= accumulateSum) {
        // console.log(`Chromosome to change: ${population[j]}`);
        newPopulation.push(population[j]);
        break;
      }
    }
  }

  // console.log(`After roulet wheel population  ${newPopulation}`);
  return newPopulation;
};

const crossover = (population) => {
  const newPopulation = [];

  for (let i = 0; i < population.length; i += 2) {
    if (Math.random() < defaultValues.Pk) {
      const crossoverPoint =
        Math.floor(Math.random() * (population[i].length - 1)) + 1;
      const child1 = [
        ...population[i].slice(0, crossoverPoint),
        ...population[i + 1].slice(crossoverPoint),
      ].join("");
      const child2 = [
        ...population[i + 1].slice(0, crossoverPoint),
        ...population[i].slice(crossoverPoint),
      ].join("");
      newPopulation.push(child1, child2);
    } else {
      newPopulation.push(population[i], population[i + 1]);
    }
  }
  return newPopulation;
};

const mutation = (population) => {
  const newPopulation = population.map((chrom) => {
    if (Math.random() < defaultValues.Pm) {
      const locus = Math.floor(Math.random() * (population.length - 1));
      // console.log(`Chromosome before mu/tation: ${chrom}`);
      chrom = [...chrom];
      // console.log(`Chrom ${chrom}`);
      chrom[locus] = chrom[locus] == "0" ? "1" : "0";
      // console.log(`Chromosome after mutation: ${chrom}`);
      chrom = chrom.join("");
    }
    return chrom;
  });
  return newPopulation;
};

export const evolve = () => {
  let mainPopulation = ["01011", "01111", "11010", "10101", "11110", "11100"];

  const startChromDec = mainPopulation.map((ch) => parseInt(ch, 2));

  const adaptationFun = startChromDec.map((el) => functionCalculation(el));

  for (let i = 0; i < 1000; i++) {
    mainPopulation = rouletteWheel(mainPopulation, adaptationFun);
    mainPopulation = crossover(mainPopulation);
    mainPopulation = mutation(mainPopulation);
  }
  // console.log(`Main population: ${mainPopulation}`);

  const bestChromosome = mainPopulation.reduce((best, current) => {
    // console.log(`Best: ${best}`);
    // console.log(`Current: ${current}`);
    const currentValue = functionCalculation(current);
    // console.log(`Current Value: ${currentValue}`);
    return currentValue > functionCalculation(best) ? current : best;
  }, mainPopulation[0]);

  // const bestYValue = functionCalculation(bestChromosome);
  const bestYValue = parseInt(bestChromosome, 2);
  // bestYValue = functionCalculation(bestYValue);

  // console.log("siema");
  // console.log(mainPopulation);

  // console.log(typeof bestChromosome);
  console.log(`Best chromosome: ${bestChromosome}`);
  console.log(`Best y value: ${bestYValue}`);

  // return bestChromosome;
};
