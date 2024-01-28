import { defaultValues, chromosome } from "./variables.js";

// const startChromosomes = chromosome;

const binToDec = (binaryChromosome) => {
  return parseInt(binaryChromosome, 2);
};

const functionCalculation = (x) => {
  return (
    defaultValues.a * Math.pow(x, 3) +
    defaultValues.b * Math.pow(x, 2) +
    defaultValues.c * x +
    defaultValues.d
  );
};

const rouletteWheel = (population, adaptationFun) => {
  const sumOfAdaptationFun = adaptationFun.reduce((sum, el) => sum + el);

  const drawnChance = adaptationFun.map((el) =>
    ((el / sumOfAdaptationFun) * 100).toFixed(1)
  );

  const newPopulation = [];

  for (let i = 0; i < population.length; i++) {
    const random = Math.random() * 100;

    let accumulateSum = 0;
    for (let j = 0; j < population.length; j++) {
      accumulateSum += parseFloat(drawnChance[j]);
      if (accumulateSum === 99.9) accumulateSum = Math.ceil(accumulateSum);

      if (random <= accumulateSum) {
        newPopulation.push(population[j]);
        break;
      }
    }
  }

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
      const locus = Math.floor(Math.random() * defaultValues.bits);
      chrom = [...chrom];
      chrom[locus] = chrom[locus] == "0" ? "1" : "0";
      chrom = chrom.join("");
    }
    return chrom;
  });
  return newPopulation;
};

export const evolve = () => {
  let genres = 0;
  let mainPopulation;

  const isEnteredChromosome = chromosome.some((ch) => ch.length > 0);

  console.log(chromosome);

  isEnteredChromosome
    ? (mainPopulation = chromosome)
    : (mainPopulation = ["01011", "01111", "11010", "10101", "11110", "11100"]);

  console.log(`Start main population: ${mainPopulation}`);

  const startChromDec = mainPopulation.map((ch) => binToDec(ch));

  const adaptationFun = startChromDec.map((el) => functionCalculation(el));
  console.log(adaptationFun);

  for (let i = 0; i < 1000; i++) {
    mainPopulation = rouletteWheel(mainPopulation, adaptationFun);
    mainPopulation = crossover(mainPopulation);
    mainPopulation = mutation(mainPopulation);
  }
  console.log(`End main population: ${mainPopulation}`);

  const bestChromosome = mainPopulation.reduce((best, current) => {
    const currentValue = functionCalculation(binToDec(current));

    return currentValue > functionCalculation(binToDec(best)) ? current : best;
  }, mainPopulation[0]);

  const bestYValue = binToDec(bestChromosome);

  console.log(`Genres: ${genres}`);
  console.log(`Best chromosome: ${bestChromosome}`);
  console.log(`Best y value: ${bestYValue}`);
};

// export const evolve = () => {
//   let generations = 0;
//   let mainPopulation;

//   const isEnteredChromosome = chromosome.some((ch) => ch.length > 0);

//   console.log(chromosome);

//   isEnteredChromosome
//     ? (mainPopulation = chromosome)
//     : (mainPopulation = ["01011", "01111", "11010", "10101", "11110", "11100"]);

//   console.log(`Start main population: ${mainPopulation}`);

//   let prevBestFitness = -Infinity;
//   let bestChromosome;

//   while (generations < 1000) {
//     const startChromDec = mainPopulation.map((ch) => binToDec(ch));

//     const adaptationFun = startChromDec.map((el) => functionCalculation(el));

//     mainPopulation = rouletteWheel(mainPopulation, adaptationFun);
//     mainPopulation = crossover(mainPopulation);
//     mainPopulation = mutation(mainPopulation);

//     bestChromosome = mainPopulation.reduce((best, current) => {
//       const currentValue = functionCalculation(binToDec(current));
//       const bestValue = functionCalculation(binToDec(best));
//       return currentValue > bestValue ? current : best;
//     }, mainPopulation[0]);

//     const bestFitness = functionCalculation(binToDec(bestChromosome));

//     // Warunek zakończenia: Przerwij pętlę, jeśli różnice w fitness są bardzo małe
//     if (Math.abs(bestFitness - prevBestFitness) < 1e-10) {
//       if (generations > 10) {
//         break;
//       }
//     }

//     prevBestFitness = bestFitness;
//     generations++;
//   }

//   const bestYValue = binToDec(bestChromosome);

//   console.log(`Generations: ${generations}`);
//   console.log(`Best chromosome: ${bestChromosome}`);
//   console.log(`Best y value: ${bestYValue}`);
// };
