"use client";
import Dropdown from "./Dropdown";
import Clusters from "./Clusters";
import { useState } from "react";
import Image from "next/image";
import { ALL_POKEMON, Pokemon, PokeDrinkData } from "./constants";
import DRINKS_TO_POKEMON from "./data/pokemon_to_drinks.json";
import FlavorTag from "./FlavorTag";
import { TabItem, Tabs } from "flowbite-react";
import Carousel from "./Carousel";

const customTheme = {
  base: "flex flex-col gap-2",
  tablist: {
    base: "flex text-center",
    variant: {
      fullWidth:
        "grid w-full grid-flow-col divide-x divide-[#A8B9C0] rounded-none shadow text-white",
    },
    tabitem: {
      base: "flex items-center justify-center p-4 text-3xl font-medium text-white text-shadow-3d first:ml-0 focus:outline-none focus:ring-none disabled:cursor-not-allowed disabled:text-gray-400 cursor-pointer",
      variant: {
        fullWidth: {
          base: "ml-0 flex w-full rounded-none first:ml-0",
          active: {
            on: "active bg-[#788798]/70 text-white text-shadow-3d p-4",
            off: "bg-[#788798] hover:bg-[#788798]/80 hover:text-white hover:text-shadow-3d",
          },
        },
      },
    },
  },
  tabitemcontainer: {
    base: "",
    variant: {
      default: "",
      underline: "",
      pills: "",
      fullWidth: "",
    },
  },
  tabpanel: "py-3",
};

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon>(ALL_POKEMON[24]);
  const [drink, setDrink] = useState<PokeDrinkData>(
    DRINKS_TO_POKEMON[pokemon.id - 1]
  );
  const [displayName, setDisplayName] = useState<string>(
    pokemon.name
  );

  function formatName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function getImageUrl(p: Pokemon) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;
  }

  function randomize() {
    const randomIndex = Math.floor(
      Math.random() * ALL_POKEMON.length
    );
    setPokemon(ALL_POKEMON[randomIndex]);
  }

  return (
    <div className="items-center justify-items-center min-h-screen gap-16 font-pixel bg-[#DFE8E8]">
      <main className="w-full flex flex-col gap-24 pb-24 items-center justify-center">
        <div className="w-full h-full flex flex-col">
          <div className="flex items-center justify-between w-full bg-[#4996FF] my-2 border-y-3 border-gray-700 text-white text-shadow-3d px-2.5 ">
            <p className="text-7xl">POKéMON DRINK GENERATOR</p>
            <div className="flex flex-row items-start gap-3">
              <p className="text-2xl">Go to:</p>
              <div className="text-2xl flex flex-col justify-center">
                <span>
                  <a
                    href="#hypothesis"
                    className="text-white text-shadow-3d cursor-pointer hover:text-[#FFCF52]"
                  >
                    {" "}
                    Data Analysis
                  </a>
                </span>
                <span>
                  <a
                    href="#ml"
                    className="text-white text-shadow-3d cursor-pointer hover:text-[#FFCF52]"
                  >
                    {" "}
                    Machine Learning
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-full flex flex-row items-stretch justify-center text-2xl gap-5 py-5 px-6">
            <div className="flex flex-col items-center justify-center w-2/5 h-full px-2">
              <div className="flex flex-col w-full h-full rounded-2xl border-gray-700 border-3">
                <div className="bg-[#FFCF52] rounded-t-xl px-1.5 text-white text-shadow-3d flex flex-row justify-center items-center gap-1 py-2">
                  <span className="relative w-12 h-12">
                    <Image
                      src={"/pokeball.png"}
                      alt={"pokeball"}
                      objectFit="contain"
                      fill
                    />
                  </span>
                  <Dropdown
                    selectedPokemon={pokemon}
                    setSelectedPokemon={setPokemon}
                  />
                </div>
                <div className="flex bg-white rounded-b-xl px-3 py-2 justify-center">
                  <button
                    className="text-3xl text-white bg-gray-700 py-2 px-3 rounded-xl cursor-pointer text-shadow-3d"
                    onClick={randomize}
                  >
                    Randomize
                  </button>
                </div>
              </div>
              <div className="flex flex-col h-full items-center justify-center disable-blur">
                <img
                  src={getImageUrl(pokemon)}
                  alt={pokemon.name}
                  className="w-svw"
                />
              </div>
            </div>
            <div className="flex w-2/3 flex-col h-auto items-center justify-center bg-[#4FCC64] rounded-2xl border-gray-700 border-3 p-6">
              <button
                onClick={() => {
                  setDrink(DRINKS_TO_POKEMON[pokemon.id - 1]),
                    setDisplayName(pokemon.name);
                }}
                className="text-white bg-gray-700 py-2 px-3 rounded-xl cursor-pointer text-shadow-3d text-4xl"
              >
                GENERATE DRINK
              </button>

              <div className="mt-6 flex flex-col w-full rounded-2xl h-full border-gray-700 border-3 bg-[#DFE8E8]">
                <div className=" flex justify-center items-center text-center py-2.5 px-3 bg-white rounded-t-xl">
                  <div className="flex flex-col justify-center gap-2">
                    <div className="text-4xl">
                      <span className="pr-2">
                        {formatName(displayName)} is:
                      </span>{" "}
                      <span>{drink.drink_name}!</span>
                    </div>
                    <div className="flex w-full h-24 justify-center items-center relative ">
                      <Image
                        src={`/drink_imgs/${drink.color}.png`}
                        alt={"pokeball"}
                        objectFit="contain"
                        fill
                      />
                    </div>

                    <div className="text-2xl flex flex-row items-center justify-center gap-2.5">
                      Flavors:
                      {drink.flavors
                        .split(",")
                        .map((flavor: string, index: number) => (
                          <FlavorTag
                            key={index}
                            flavor={flavor.trim()}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                {/** tabs from flowbite */}
                <div className="border-t-3 border-gray-700 text-2xl">
                  <Tabs
                    aria-label="Default tabs"
                    variant="fullWidth"
                    theme={customTheme}
                  >
                    <TabItem active title="Description">
                      <div className="flex flex-col justify-center items-center gap-8 leading-6 py-4 px-5">
                        {drink.description
                          .split("\n")
                          .map((line, index) => (
                            <span key={index} className="text-center">
                              {line}
                            </span>
                          ))}
                        Alcohol percentage: {drink.alc_perc}%
                      </div>
                    </TabItem>
                    <TabItem title="Ingredients">
                      <div className="py-4 px-5 text-2xl">
                        <ol className="pl-5 list-decimal">
                          {drink.ingredients
                            .split(",")
                            .map((ingredient, index) => (
                              <li key={index} className="pl-2">
                                {ingredient.trim()}
                              </li>
                            ))}
                        </ol>
                      </div>
                    </TabItem>
                    <TabItem title="Instructions">
                      <div className="py-4 px-5 text-2xl">
                        <ol className="pl-5 list-decimal">
                          {drink.instructions
                            .split(";")
                            .map((ingredient, index) => (
                              <li key={index} className="pl-2">
                                {ingredient.trim()}
                              </li>
                            ))}
                        </ol>
                      </div>
                    </TabItem>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col gap-5 ">
          <div
            id="hypothesis"
            className="bg-[#4996FF] my-2 border-y-3 border-gray-700 text-white text-shadow-3d text-7xl px-2.5"
          >
            DATA ANALYSIS
          </div>

          <div className="w-full h-full flex flex-row items-stretch justify-center text-2xl  px-12 gap-6">
            <div className="flex flex-col items-center justify-center w-2/5 h-full">
              <div className="flex flex-col w-full rounded-2xl h-full border-gray-700 border-3">
                <p className="bg-[#FFCF52] rounded-t-xl py-1 px-5 text-gray-700 text-shadow-3d-white flex items-center text-5xl">
                  HYPOTHESIS 1
                </p>
                <div className="flex bg-white rounded-b-xl p-5 justify-center text-3xl">
                  Pokémon with higher base stat totals are more likely
                  to have a slower growth rate.
                </div>
              </div>
              <div className="mt-5 flex flex-row w-full rounded-2xl h-full border-gray-700 border-3 bg-[#FFCF52] px-2.5 py-1.5 items-stretch">
                <p className=" rounded-t-xl py-1 px-2.5 text-gray-700 text-shadow-3d-white flex items-center text-4xl">
                  TEST:
                </p>
                <div className="flex items-center justify-center bg-white rounded-xl px-2  border-3 border-gray-700 text-2xl text-shadow-3d-yellow">
                  Ordinal Logistic Regression
                </div>
              </div>
            </div>
            <div className="flex flex-col h-auto w-full items-center justify-center bg-[#4FCC64] rounded-2xl border-gray-700 border-3 p-5">
              <p className="text-5xl text-shadow-3d-white text-gray-700">
                RESULTS
              </p>

              <div className="mt-4 flex flex-col w-full rounded-2xl h-full border-gray-700 border-3 bg-white p-5 text-3xl">
                <p>Ordinal Logistic Regression Output:</p>
                <ul className="pl-12 list-disc list-outside">
                  <li>Coefficient for base_stat_total: 0.0057</li>
                  <li>P-value: 7.57e-27</li>
                  <li>
                    Odds ratio (exponentiated coefficient): ~1.0058
                  </li>
                </ul>
                <p className="mt-6">
                  The results indicate a very strong linear
                  correlation between a Pokémon's base stat total and
                  its growth rate classification. Specifically, for
                  every one-point increase in base stats, the odds of
                  being in a slower growth category increase by about
                  0.58%. The p-value of under 0.05 tells us this is a
                  very strong and statistically significant
                  relationship. However the effect size per point is
                  small, shown by the odds ratio which tells us that
                  for every +1 increase in base stat total, the odds
                  of a Pokémon being in a slower growth rate category
                  increases by a factor of 1.006. While this is a
                  small factor, it seems to compound meaningfully over
                  larger differences in base stats (e.g. +100 base
                  stat points) which significantly increase odds of
                  slower growth.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-full flex flex-row items-stretch justify-center text-2xl  px-12 gap-6 mt-20">
            <div className="flex flex-col items-center justify-center w-2/5 h-full">
              <div className="flex flex-col w-full rounded-2xl h-full border-gray-700 border-3">
                <p className="bg-[#FFCF52] rounded-t-xl py-1 px-5 text-gray-700 text-shadow-3d-white flex items-center text-5xl">
                  HYPOTHESIS 2
                </p>

                <div className="flex bg-white rounded-b-xl p-5 justify-center text-3xl">
                  In each habitat, the most frequent Pokémon type (the
                  dominant type) appears in more than 50% of the
                  Pokémon present.
                </div>
              </div>
              <div className="mt-5 flex flex-row w-full rounded-2xl h-full border-gray-700 border-3 bg-[#FFCF52] px-2.5 py-1.5 items-stretch">
                <p className=" rounded-t-xl py-1 px-2.5 text-gray-700 text-shadow-3d-white flex items-center text-4xl">
                  TEST:
                </p>
                <div className="flex items-center justify-center bg-white rounded-xl px-2.5  border-3 border-gray-700 text-2xl text-shadow-3d-yellow">
                  One-Proportion Z-Test
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-auto items-center justify-center bg-[#4FCC64] rounded-2xl border-gray-700 border-3 p-5">
              <p className="text-5xl text-shadow-3d-white text-gray-700">
                RESULTS
              </p>
              <div className="mt-4 flex flex-col w-full h-full gap-5">
                <div className="flex rounded-2xl w-full h-full border-gray-700 border-3 bg-white p-5 text-3xl">
                  Only the waters-edge and sea habitats showed
                  statistically significant dominance by one type
                  (both water-type). In these habitats, the dominant
                  type constituted over 80% and 95% of the Pokémon,
                  respectively, with p-values far below the
                  significance threshold. For all other habitats, the
                  dominant type did not significantly surpass the 50%
                  threshold. Thus, we reject the null hypothesis only
                  for waters-edge and sea, and fail to reject it for
                  all other habitats.
                </div>
                <div className="flex relative justify-center items-center">
                  <Image
                    src={"/tables/habitat_findings.png"}
                    alt={"habitat table"}
                    width={900}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full flex flex-row items-stretch justify-center text-2xl  px-12 gap-6 mt-20">
            <div className="flex flex-col items-center justify-center w-2/5 h-full">
              <div className="flex flex-col w-full rounded-2xl h-full border-gray-700 border-3">
                <p className="bg-[#FFCF52] rounded-t-xl py-1 px-5 text-gray-700 text-shadow-3d-white flex items-center text-5xl">
                  HYPOTHESIS 3
                </p>
                <div className="flex bg-white rounded-b-xl p-5 justify-center text-3xl">
                  There is a significant association between a
                  Pokémon's type and its color. Specifically, certain
                  types are more likely to appear with specific colors
                  (e.g., Fire-type Pokémon are more likely to be red,
                  Water-type more likely to be blue, etc.).
                </div>
              </div>
              <div className="mt-5 flex flex-row w-full rounded-2xl h-full border-gray-700 border-3 bg-[#FFCF52] px-2.5 py-1.5 items-stretch">
                <p className=" rounded-t-xl py-1 px-2.5 text-gray-700 text-shadow-3d-white flex items-center text-4xl">
                  TEST:
                </p>
                <div className="flex items-center justify-center bg-white rounded-xl px-2.5  border-3 border-gray-700 text-2xl text-shadow-3d-yellow">
                  Chi-Squared
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col h-auto items-center justify-center bg-[#4FCC64] rounded-2xl border-gray-700 border-3 p-5">
              <p className="text-5xl text-shadow-3d-white text-gray-700">
                RESULTS
              </p>
              <div className="grid grid-flow-row grid-rows-2 gap-5 mt-4">
                <div className="flex flex-row w-full gap-5">
                  <div className="flex h-full w-full rounded-2xl border-gray-700 border-3 bg-white p-5 text-3xl">
                    As we can see, all of the types except for
                    fighting and flying have p-values less than 0.05,
                    indicating association to a dominant color. So, we
                    can reject the null hypothesis for all types
                    except for fighting and flying. We are satisfied
                    with our accuracies since most of the p-values are
                    nearly 0. This indicates that the correlation is
                    stronger, as opposed to it being closer to 0.05.
                  </div>
                  <div className="flex relative">
                    <Image
                      src={"/tables/color_findings.png"}
                      alt={"colors table"}
                      width={600}
                      height={600}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full rounded-2xl h-full border-gray-700 border-3 bg-white px-5 text-3xl">
                  <Carousel />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full flex flex-row items-stretch justify-center text-2xl  px-12 gap-6 mt-20">
            <div className="flex flex-col items-center justify-center w-2/5 h-full">
              <div className="flex flex-col w-full rounded-2xl h-full border-gray-700 border-3">
                <p className="bg-[#FFCF52] rounded-t-xl py-1 px-5 text-gray-700 text-shadow-3d-white flex items-center text-5xl">
                  HYPOTHESIS 4
                </p>
                <div className="flex bg-white rounded-b-xl p-5 justify-center text-3xl">
                  There is a significant correlation between Pokémon
                  type and berry flavor.
                </div>
              </div>
              <div className="mt-5 flex flex-row w-full rounded-2xl h-full border-gray-700 border-3 bg-[#FFCF52] px-2.5 py-1.5 items-stretch">
                <p className=" rounded-t-xl py-1 px-2.5 text-gray-700 text-shadow-3d-white flex items-center text-4xl">
                  TEST:
                </p>
                <div className="flex items-center justify-center bg-white rounded-xl px-2.5  border-3 border-gray-700 text-2xl text-shadow-3d-yellow">
                  Chi-Squared
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col h-auto items-center justify-center bg-[#4FCC64] rounded-2xl border-gray-700 border-3 p-5">
              <p className="text-5xl text-shadow-3d-white text-gray-700">
                RESULTS
              </p>

              <div className="mt-4 flex flex-col w-full rounded-2xl h-full border-gray-700 border-3 bg-white p-5 text-3xl">
                <p>
                  The p-value is greater than 0.05, meaning we fail to
                  reject the null hypothesis and cannot derive a
                  correlation between Pokémon type and berry flavor.
                  We were curious about this relationship to see if we
                  could associate flavor preferences to Pokémon type
                  and use this to assign each Pokémon to a drink. The
                  resulting data shows some Pokémon types have a
                  stronger correlation to a specific flavor, but not
                  all types have this correlation. This is very
                  insightful to our project as we had originally
                  planned to match Pokémon to drinks through berry
                  flavor preference, and the insight of this test
                  showing there is not a significant relationship
                  between type and berry flavor preference means we
                  should consider other metrics related to specific
                  Pokémon for matching them to certain drinks, such as
                  weight or battle stats.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col gap-5 ">
          <div
            id="ml"
            className="bg-[#4996FF] my-2 border-y-3 border-gray-700 text-white text-shadow-3d text-7xl px-2.5"
          >
            MACHINE LEARNING
          </div>
          <div className="w-full h-full flex flex-row items-stretch justify-center text-2xl px-12 gap-6">
            <div className="flex flex-col items-center justify-center w-5/12 h-full">
              <div className="flex flex-col w-full rounded-2xl h-full border-gray-700 border-3">
                <p className="bg-[#FFCF52] rounded-t-xl py-1 px-5 text-gray-700 text-shadow-3d-white flex items-center text-5xl">
                  SUPERVISED LEARNING
                </p>
                <div className="flex bg-white rounded-b-xl p-5 justify-center text-3xl">
                  Given the insights from our statistical tests, we
                  wanted to explore whether we could predict if a
                  Pokémon is legendary, mythical, or baby using
                  patterns in the data.
                </div>
              </div>
              <div className="mt-5 flex flex-row w-full rounded-2xl h-full border-gray-700 border-3 bg-[#FFCF52] px-2.5 py-1.5 items-stretch">
                <p className=" rounded-t-xl py-1 px-2.5 text-gray-700 text-shadow-3d-white flex items-center text-4xl">
                  TECHNIQUE:
                </p>
                <div className="flex items-center justify-center bg-white rounded-xl px-2  border-3 border-gray-700 text-2xl text-shadow-3d-yellow">
                  Decision Tree Classifier
                </div>
              </div>
            </div>
            <div className="flex flex-col h-auto w-full items-center justify-center bg-[#4FCC64] rounded-2xl border-gray-700 border-3 p-5">
              <p className="text-5xl text-shadow-3d-white text-gray-700">
                RESULTS
              </p>

              <div className="mt-4 flex flex-col w-full h-full gap-5">
                <div className="flex relative justify-center items-center">
                  <Image
                    src={"/tables/classifier_findings.png"}
                    alt={"classifier accuracies table"}
                    width={900}
                    height={300}
                  />
                </div>
                <div className="flex rounded-2xl w-full h-full border-gray-700 border-3 bg-white p-5 text-3xl">
                  Our model performed well on the is_legendary and
                  is_mythical classifications, achieving high accuracy
                  and F1 scores above 0.7. So we conclude that our
                  classifier is effective at identifying legendary and
                  mythical Pokémon. However, for the label is_baby,
                  the test and validation accuracies are actually
                  lower than the all false negatives case and the F1
                  score is very low. Then, our classifer cannot
                  accurately predict baby Pokémon and is also
                  predicting false positives. We theorize that this is
                  because baby Pokémon have the least amount of data
                  to train on and there is too much noise around the
                  features. Looking at the Pokémon database, baby
                  Pokémon are relatively weak and frail, and weak
                  Pokémon are more common in contrast to legendary and
                  mythical Pokémon who are selectively strong or
                  excellent -- if all Pokémon were as strong, then the
                  games would not be as interesting! There is nothing
                  we can do to further clean the data for our specific
                  model, as this noise is built into the dataset
                  itself, but adding regularization methods would
                  probably improve the performance.
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full flex flex-row items-stretch justify-center text-2xl  px-12 gap-6 mt-20">
            <div className="flex flex-col items-center justify-center w-5/12 h-full">
              <div className="flex flex-col w-full rounded-2xl h-full border-gray-700 border-3">
                <p className="bg-[#FFCF52] rounded-t-xl py-1 px-5 text-gray-700 text-shadow-3d-white flex items-center text-[44px]">
                  UNSUPERVISED LEARNING
                </p>

                <div className="flex bg-white rounded-b-xl p-5 justify-center text-3xl">
                  For our interactive component, we want to assign
                  Pokémon to drinks and thought that flavors would be
                  a unique connection. However, as discussed in our
                  Hypothesis 1, there is not a strong relationship
                  between Pokémon and berry preference, which is an
                  indicator of flavor preference. So, we decided on
                  the unsupervised learning algorithm, KMeans to
                  divide our dataset into 5 clusters in order to
                  correspond to the 5 flavors (spicy, dry, sweet,
                  bitter, sour). We chose KMeans because it is
                  relatively simple and we can define the number of
                  clusters.
                </div>
              </div>
              <div className="mt-5 flex flex-row w-full rounded-2xl h-full border-gray-700 border-3 bg-[#FFCF52] px-2.5 py-1.5 items-stretch">
                <p className=" rounded-t-xl py-1 px-2.5 text-gray-700 text-shadow-3d-white flex items-center text-4xl">
                  TECHNIQUE:
                </p>
                <div className="flex items-center justify-center bg-white rounded-xl px-2.5  border-3 border-gray-700 text-2xl text-shadow-3d-yellow">
                  KMeans Clustering
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-auto items-center justify-center bg-[#4FCC64] rounded-2xl border-gray-700 border-3 p-5">
              <p className="text-5xl text-shadow-3d-white text-gray-700">
                RESULTS
              </p>
              <div className="mt-4 flex flex-col items-center justify-center w-full gap-5">
                <Clusters />
                <div className="flex flex-col rounded-2xl w-full border-gray-700 border-3 bg-white p-5 text-3xl">
                  Since there are no objective labels, there are no
                  accuracy/success metrics beyond our own personal
                  observations. Additionally, since there is no
                  "ground-truth" classification between Pokémon and
                  flavor, we decided to assign our own labels for the
                  produced clusters based on general patterns in the
                  data:
                  <ul className="my-4 pl-12 list-disc list-outside">
                    <li>
                      Cluster 1 = dry: Consists of mostly Steel,
                      Ground, and Rock types and "bulkier" (higher
                      base stats, higher height / weight) Pokémon.
                    </li>
                    <li>
                      Cluster 2 = sour: Consists of weaker (lower base
                      stats, smaller height / weight) Pokémon that are
                      primarily first stages of an evolution.
                    </li>
                    <li>
                      Cluster 3 = spicy: Consists of legendary,
                      mythical and a handful of "pseudo legendary"
                      (very powerful but not legendary) Pokémon.
                    </li>
                    <li>
                      Cluster 4 = sweet: Consists of all baby Pokémon.
                    </li>
                    <li>
                      Cluster 5 = bitter: Consists of "mid-power"
                      Pokémon (medium base stats, medium height /
                      weight) that are primarily second stages of an
                      evolution.
                    </li>
                  </ul>
                  We thought that these assignments were most fitting
                  as sweet and sour flavors are more palettable
                  whereas dry and bitter flavors are more "mature",
                  and the spicy flavor being very powerful. Overall,
                  we are satisfied with the clustering and think that
                  the categorizations are super interesting! Something
                  that is also interesting to note is that the
                  clustering was able to group baby Pokémon more
                  accurately than our supervised learning method. We
                  reason that this is again because there is a limited
                  number of baby Pokémon, such that it would be
                  difficult to train on the data as the baby Pokémon
                  would be split across the training, test, and
                  validation sets. However, with clustering, the model
                  is able to train on the entire dataset, giving it
                  more context to create natural groupings.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
