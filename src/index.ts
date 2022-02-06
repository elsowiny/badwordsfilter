import filterData from './data';
let filterList = filterData;

// create options config object
const globalOptions = {
  replacer: '*',
};

class FilterConfig {
  // used to manage global options

  // exclude a list of words from the profanity list
  static exclude(words: string[]) {
    // make sure the list coming in is an array and lowercase it
    words = words.map((word) => word.toLowerCase());

    // remove the words from the filterList
    filterList = filterList.filter((word) => !words.includes(word));
  }

  // add the values in the array to the excludeList
  static include(value: string[]) {
    filterList = filterList.concat(value);
  }
  // set the replacer value
  static replacer(value: string) {
    globalOptions.replacer = value;
  }
}

// checks if a given string is profane
// arrow function
const profane = (value: string): boolean => {
  // lowercase the value and check if it matches the filterList
  return filterList.indexOf(value.toLowerCase()) > -1;
};

// returns a filtered string so long a string is supplied
// and that that word is profane
const filter = (value: string): string => {
  // check if the value is profane
  // if so, replace that word with all asterisks in the same length
  // return the string
  if (profane(value)) {
    // return based on the replacer value
    return globalOptions.replacer.repeat(value.length);
  }
  return value;
};

// returns a filtered array where we check if any value in the array is profane
// if so, it is replaced where any profane word is now all asterisks in the same length
const filterArray = (value: string[]): string[] => {
  return value.map((word) => {
    if (profane(word)) {
      return globalOptions.replacer.repeat(word.length);
    }
    return word;
  });
};
// add a word to the filterList
const addWord = (word: string) => {
  filterList.push(word);
};

// remove a word from the filterList
const removeWord = (word: string) => {
  const index = filterList.indexOf(word);
  if (index > -1) {
    filterList.splice(index, 1);
  }
};

export { profane, filter, addWord, removeWord, filterArray, FilterConfig };
