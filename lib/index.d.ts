declare class filterConfig {
    static exclude(words: string[]): void;
    static include(value: string[]): void;
    static replacer(value: string): void;
}
declare const profane: (value: string) => boolean;
declare const filter: (value: string) => string;
declare const filterArray: (value: string[]) => string[];
declare const addWord: (word: string) => void;
declare const removeWord: (word: string) => void;
export { profane, filter, addWord, removeWord, filterArray, filterConfig, };
