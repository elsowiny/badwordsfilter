import {profane, filter, addWord, removeWord, filterArray, FilterConfig as fc} from "../src/index";




describe('filter', function(){
  it("Should return t/f depending on the string indicating profanity", function(){
    expect(profane("damn")).toBe(true);
    expect(profane("xxx")).toBe(true);
    expect(profane("arse")).toBe(true);

    expect(profane("hello")).toBe(false);
    expect(profane("hello world")).toBe(false);
  });

  it("Should censor the words replacing them with stars equal to the length of the original word, if it is profane", function(){
    expect(filter("damn")).toBe("****");
    expect(filter("xxx")).toBe("***");
    expect(filter("arse")).toBe("****");
    expect(filter("DAMN")).toBe("****");

    expect(filter("hello")).toBe("hello");
    expect(filter("hello world")).toBe("hello world");
    
 
  })

  it("Should censor an array of words replacing them with stars equal to the length of the original word, if it is profane", function(){
    expect(filterArray(["damn", "xxx", "arse"])).toEqual(["****", "***", "****"]);
    expect(filterArray(["hello", "hello world"])).toEqual(["hello", "hello world"]);
  })

  it("Should add a word to the profanity list", function(){
    addWord("noob");
    expect(profane("noob")).toBe(true);
  })

  it("Should remove a word from the profanity list", function(){
    removeWord("arse");
    expect(profane("arse")).toBe(false);

    //readd the word
    addWord("arse");
  })

  it("Should do nothing when trying to remove a word that doesn't exist", function(){
    removeWord("noob");
    expect(profane("noob")).toBe(false);
    removeWord("hello");
    expect(profane("hello")).toBe(false);
  })



  
  //testing speed no assertions
  it("Should run the profanity filter on a large string", function(){
    timetest(filter, "hello world this is a test of the profanity filter. It should take less than 1 second to run. If it takes longer than 1 second, it is probably broken.");
  })

  //run on a large string array
  it("Should run the profanity filter on a large array of strings", function(){
    timetest(filterArray, ["hello world this is a test of the profanity filter.", " It should take less than 1 second to run. If it takes longer than 1 second, it is probably broken.", "hello world this is a test of the profanity filter. It should take less than 1 second to run. If it takes longer than 1 second, it is probably broken."]);
  })


 


});


describe("configs", function(){
   //tests for the config
   it("should change the replacer value when supplied", function(){

    //change the replacer value
   
    fc.replacer("x");
    expect(filter("damn")).toBe("xxxx");

    fc.replacer("*");
    expect(filter("damn")).toBe("****");

    fc.replacer("");
    expect(filter("damn")).toBe("");
    expect(filter("xxx")).toBe("");
    expect(filter("arse")).toBe("");

    //check on the array
    expect(filterArray(["damn", "xxx", "arse"])).toEqual(["", "", ""]);

    //reset the replacer value
    fc.replacer("*");
    expect(filter("damn")).toBe("****");

    //test array
    expect(filterArray(["damn", "xxx", "arse"])).toEqual(["****", "***", "****"]);

    

  })
  
  
  //test adding new words via a string array e.g ['noob', 'noodle', 'badword']
  it("should add new words to the profanity list", function(){
    fc.include(["noob", "noodle", "badword"]);
    expect(profane("noob")).toBe(true);
    expect(profane("noodle")).toBe(true);
    expect(profane("badword")).toBe(true);
  })

  //test removing words from the profanity list
  it("should remove words from the profanity list", function(){
    fc.exclude(["damn", "xxx", "arse"]);
    expect(profane("damn")).toBe(false);
    expect(profane("xxx")).toBe(false);
    expect(profane("arse")).toBe(false);
  })
})



//create function to time functions
function timetest(func:Function, ...args:any[]){
  //print time in seconds or milliseconds
  let start = new Date().getTime();
  func(...args);
  let end = new Date().getTime();
  console.log("time taken: " + (end - start) + "ms");
}


