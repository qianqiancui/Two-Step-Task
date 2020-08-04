/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* Author: Lee Qianqian Cui
* Email: qc697@nyu.edu
* Website: https://qianqiancui.github.io/
* Two Step Task
* New York University
* Summer 2020
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

/*  Don't delete 
 * Requires: 
 *     psiturk.js
 *     utils.js
 */


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
                             * Attention*
 *   to quickly test a certain phase (e.g., step two practice, main trials, etc)
 *   scroll down to the very end of this script (run task section) and follow
 *   the insturctions
 *   part of the code looks terrible, but it somehow works ...
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/



// Initalize psiturk object, do not delete
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

// new finding: delete will cause diability to record data
var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you


// load all the necessary pages before the experiment
var pages = [

    "stage.html", // the page that displays the experiment

    //instruction pages for different phases
    "instructions/step_two_prac_stock1.html",
    "instructions/step_two_prac_stock2.html",
    "instructions/step_one_prac_stock1_reminder.html",
    "instructions/step_one_prac_stock2_reminder.html",
    "instructions/step_one_prac_stock1.html",
    "instructions/step_one_prac_stock2.html",
    "instructions/main_trials.html",

    //postquestionnaire pages. 
    "postquestionnaire1.html"
];


psiTurk.preloadPages(pages);

var step_two_prac_stock1_pages = [ // add as a list as many pages as you like
    "instructions/step_two_prac_stock1.html"
];
var step_two_prac_stock2_pages = [ // add as a list as many pages as you like

    "instructions/step_two_prac_stock2.html"
];

var step_one_prac_stock1_reminder_pages = [ // add as a list as many pages as you like

    "instructions/step_one_prac_stock1_reminder.html"
];
var step_one_prac_stock2_reminder_pages = [ // add as a list as many pages as you like

    "instructions/step_one_prac_stock2_reminder.html"
];

var step_one_prac_stock1_pages = [ // add as a list as many pages as you like

    "instructions/step_one_prac_stock1.html"
];
var step_one_prac_stock2_pages = [ // add as a list as many pages as you like

    "instructions/step_one_prac_stock2.html"
];

var main_trials_pages = [ // add as a list as many pages as you like

    "instructions/main_trials.html"
];



/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* TASK STRUCTURE
   PsiTurk do instruction (step_two_prac_stock1_pages)
                ↓
   phase function: step_two_practice_stock1()
                ↓
   PsiTurk do instruction (step_two_prac_stock2_pages)
                ↓
   phase function: step_two_practice_stock2()
                ↓
   PsiTurk do instruction (step_one_prac_stock1_pages)
                ↓
   phase function: step_one_practice_stock1()
                ↓
   PsiTurk do instruction (step_one_prac_stock2_pages)
                ↓
   phase function: step_one_practice_stock1()
                ↓
   PsiTurk do instruction (main_trials_pages)
                ↓
   phase function:  main_trials()
                ↓
   "postquestionnaire1.html"

* NOTE
  agent 1/agent 3 will always select stock 1
  agent 2/agent 4 will always select stock 2
  only the image changes


 * Inside each phase, the common struction would be function next()
  + response_handler(). check each phase function for detailed info
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/





/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
◢◤                                                                                                                                ◢◤
◢◤                                                    * Global Variables *                                                        ◢◤
◢◤                                                                                                                                ◢◤
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var stimFolder = "/static/images/";

/*◢◤◢◤◢◤◢◤ * variables for step two practice * ◢◤◢◤◢◤◢◤*/
var stock_value, stock_name; //get the value & name of the stock in each trial (see variable stock1_list, stock2_list;
                            // will record them in response_handler() function)

/*◢◤◢◤◢◤◢◤ * variables for step one practice * ◢◤◢◤◢◤◢◤*/
// get the name of left agent/right agent, selected agent, name of selected stock (see function load_trial())
// will record them in response_handler() function)
var left_target, right_target,
    chosen_target, chosen_stock; 


var stock1, stock2, // will randomly assign axiom/zephyr into the role of stock1/stock2 (see variable decider)
    stock1_img, stock2_img, // get the image for stock 1/stock 2 after random assignment (see )
    stim1_img, stim2_img, stim1_name, stim2_name;

//change # of step one practice trials here
var step_one_practice_trial_num = 16;

//change # of main trials here
var main_tirals_before_1st_break = 52; // # of trials before the first break
    // per the request, in the first 52 trials, each agent should appear 13 times ob both sides of the screen
                                       // see section trial for detailed info
var main_tirals_after_1st_break = 104; // # of trials after the first break


var break_session_length = 15; //(seconds); change the number if you want a longer/shorter break; see function break_session()
var response_deadline = 3000; //(milliseconds); change the number if you want a longer/shorter presonse deadline
var warning = false;  // warning text not show → warning = false; warning text is shown → warning = true

var listening = false; //not recording the response. Will record when the trial strats


var correct_num; // get # of correct answers in step one practices (step_one_practice_stock1() & step_one_practice_stock2() )
                 // go to zero at the begining of each phase
                 // go to zero after the same phase restarts (when accuracy is below 13/16)
                 // will record it in response_handler() function


var stim_on; // time stimulus is presented, will calculate the reaction time in response_handler() function
var current_step; // record the step (one or two)

var phase, // record current phase (5 in total, refer to task structure)
    trials, // an array records all the trial information
            // example: [[stock1_img, "1.jpg", stock1, "agent1", stock2_img, "2.jpg", stock2, "agent2"], [...], .....]
    current_trial; // example: [stock1_img, "1.jpg", stock1, "agent1", stock2_img, "2.jpg", stock2, "agent2"]
                   // function show_stim() reads variables (stim1_img, stim2_img, stim1_name, stim2_name, etc) from current trial

var trial_id; // reset to one and trial_id ++ after entering a new phase (or restart a phase in the step_one_practice)
var timer_step1, timer_step2, timer_break; // (1), (2) → timer for "too slow" warning in step 1 & step; (3) → timer for break session;


// below are varibles used in debugging process
// purpose: check if one image appear on each side of the screen with the exact same frequencies 
var a1_left, a1_right, a2_right, a2_left, a3_left, a3_right, a4_right, a4_left;



/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
◢◤                                                                                                                                ◢◤
◢◤                                                     * assigning stocks *                                                       ◢◤
◢◤                                                                                                                                ◢◤
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* decide which stock should be stock1/stock2 randomly *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
// 50% of chance axiom - stock1; zephyr - stock2
// 50% of chance axiom - stock2; zephyr - stock1
// will pass the variables; function response_handler() will record which is which
var decider = Math.random();
if (decider <= 0.5) {
    stock1 = "axiom";
    stock1_img = "axiom.jpg";
    stock2 = "zephyr";
    stock2_img = "zephyr.jpg";
} else {
    stock2 = "axiom";
    stock2_img = "axiom.jpg";
    stock1 = "zephyr";
    stock1_img = "zephyr.jpg";
}
console.log("stock1", stock1, "stock2", stock2);




/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
◢◤                                                                                                                                ◢◤
◢◤                                                        * Trial section  *                                                      ◢◤
◢◤                                                                                                                                ◢◤
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

// provide: name of the image, value, name of the stock after assigning which stock is stock
// show_stim_step_two_practice() will read the one element (like [stock1_img, "+8", stock1]) in the array each time
// and pass the variable to response_handler() to record response
// the javaScript function .shift will help remove one element from the array. See load_trial() function for more info

var stock1_list = [[stock1_img, "+8", stock1], [stock1_img, "+9", stock1], [stock1_img, "+7", stock1],
[stock1_img, "+5", stock1], [stock1_img, "+3", stock1]];
var stock2_list = [[stock2_img, "+1", stock2], [stock2_img, "+0", stock2], [stock2_img, "+2", stock2],
    [stock2_img, "+5", stock1], [stock2_img, "+6", stock2]];


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* prepare stimulus on both sides of the screen (in a balanced way) *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
//  take [stock1_img, "1.jpg", stock1, "agent1", stock2_img, "2.jpg", stock2, "agent2"] for example, 
// stock1_img, "1.jpg", stock1, "agent1" represent the infomation that will appear on the right side of the screen;
// stock2_img, "2.jpg", stock2, "agent2" represent the infomationthat will appear on the left side of the screen.
// show_stim() function will read it,  find the agent image and have it displayed on the screen (e.g., present "1.jpg" on the left and present "2.jpg on the right)
// Also, it will get the stock information. Later the stock info will be transported to response_handler() fucntion and be recorded


// i don't know how to name following arrays properly in english. My idea is like this:
// include all the possible combinations and put them altogether in two arrays.
// like for 1.jpg, find out all the combinations that it would appear on the left screen like (1-2, 3-4), throw them into one array
// then, find out all the combinations that it would appear on the right screen like (2-1, 4-3), throw them into the same array
// each combinations (e.g., 1 on the left- 2 on the right) actually represents one trial
// do the same thing for the other images and you will get 4 "essential trials"
// Note: in the 4 "essential trials", 1.jpg appears on the left for 1 times and on the right for 1 times. so do other images. Quite balanced.
// then go to the balanced_trials() function for further steps

var essential_trials = [
    [[stock1_img, "1.jpg", stock1, "agent1", stock2_img, "2.jpg", stock2, "agent2"]],
    [[stock1_img, "3.jpg", stock1, "agent3", stock2_img, "4.jpg", stock2, "agent4"]],
    [[stock2_img, "2.jpg", stock2, "agent2", stock1_img, "1.jpg", stock1, "agent1"]],
    [[stock2_img, "4.jpg", stock2, "agent4", stock1_img, "3.jpg", stock1, "agent3"]]
];

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* prepare balanced trials for step one tasks (practice & main trials) *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
// for example, 16 trials are wanted. So far, we already have 4 "essential trials",
// each "essential trial" x 4, and you will get 16 trials.
// 1.jpg appears on the left for 4 times and on the right for 4 times. so do other images.
// balanced √

// same idea: using this function, i'm able to make balanced trials in a dynamic way.
var balanced_trials = function (essentials, trial_num) {

 
    var trial_container = []; // create an empty array to store all trials
    // put all trials (containing stimuli information) into trial_container array based on desired number of trials
    for (var x = 0; x < trial_num; x++) {
        trial_container = trial_container.concat(essentials[x % 4]);
    };

    trial_container = _.shuffle(trial_container); // shuffle the elements in the array ( == shuffle the trial order)

    console.log(trial_container, 'preview trials'); // debugging purpose, ok to delete

    return trial_container;  // will pass the trial_container to the global variable trials. See each phase function for more info

};



/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
 ◢◤                                                                                                                                           ◢◤
 ◢◤                                                * display stim for each trial *                                                            ◢◤
 ◢◤                                                                                                                                           ◢◤
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

/*◢◤◢◤◢◤◢◤ * display 2 or 2+ stimuli each time * ◢◤◢◤◢◤◢◤*/
// used in step one practices & main trials
var show_stim = function (image1, image2) {
    //load image1 (on the left)
    d3.select("#stim1") //#stim1: the area in the stage.html where the stock image will be displayed
        .append("img") // define the type of file 
        .attr("src", stimFolder + image1)
        .attr("id", 'pic1') // image path
        .style("width", "100%")  // looks like the id of the stim, remove_stim() function need to use this to clear 
        .style("height", "100%") // image size
        .style("border", "initial") // no border when the stim first appears
        .style("top", "40%");
    //load image1 (on the right)

    d3.select("#stim2")
        .append("img") 
        .attr("src", stimFolder + image2)
        .attr("id", 'pic2')
        .style("width", "100%")
        .style("height", "100%")
        .style("border", "initial")
        .style("top", "40%");
};

/*◢◤◢◤◢◤◢◤ * remove two stimuli * ◢◤◢◤◢◤◢◤*/
var remove_stim = function () {
    //remove images;

    d3.select("#pic1").remove(); // remove left agent image, "#pic1" functions like the id of the stim
    d3.select("#pic2").remove(); //remove right agent image
    d3.select("#pic").remove(); //remove stock image

    document.getElementById('stim').style.border = "initial"; //remove border for stock image 
    document.getElementById('stim1').style.border = "initial"; //remove border for left agent image
    document.getElementById('stim2').style.border = "initial"; //remove border for right agent image

    d3.select('#stock_value').html(''); //remove stock value 



    //back to original positions
    // change the number if you want
    document.getElementById('stim1').style.top = "40%";
    document.getElementById('stim2').style.top = "40%";
    document.getElementById('stim1').style.left = "20%";
    document.getElementById('stim2').style.left = "80%";

    // back to orignial size
    document.getElementById('stim1').style.width = "";
    document.getElementById('stim1').style.height = "";
    document.getElementById('stim2').style.width = "";
    document.getElementById('stim2').style.height= "";

    //opacity of each agent image (0: transparent; 1: solid);
    document.getElementById('stim1').style.opacity = 1;
    document.getElementById('stim2').style.opacity = 1;

    //clear "too slow" text
    d3.select('#warning').html('');
};



/*◢◤◢◤◢◤◢◤ * display one stimulus each time * ◢◤◢◤◢◤◢◤*/
// used in step two practices 
var show_stim_step_two_practice = function (image) {
    d3.select("#stim") //#stim: the area in the stage.html where the stock image will be displayed
        .append("img") // define the type of file 
        .attr("src", stimFolder + image) // image path
        .attr("id", 'pic')  // id of the stim, remove_stim() function need to use this to clear 
        .style("width", "300px") // image size
        .style("height", "300px")
        .style("border", "initial"); // no border when the stim first appears
};


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* load information for a single trial *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var load_trial = function () {
    /*◢◤◢◤◢◤◢◤ trial interval: 500ms  ◢◤◢◤◢◤◢◤*/
    setTimeout(function () {

        
        stim_on = new Date().getTime();//record when stim is displayed, will calculate reaction time in respones_handler() function
        listening = true; // start to record key press events

        //if step two practices, call related functions to display stimuli and pass variables

        if (phase === "step_two_practice_stock1" || phase === "step_two_practice_stock2") {


            // The shift() method removes the first element from an array. https://www.w3schools.com/jsref/jsref_shift.asp
            // that's how i get the trial information one by one
            current_trial = trials.shift();

            //call show_stim_step_two_practice() to display stock image
            show_stim_step_two_practice(current_trial[0]);
            // get value & name and pass to respones_handler() function

            stock_value = current_trial[1];
            stock_name = current_trial[2];

            //set current step
            current_step = "two";
        } else {
        /*◢◤◢◤◢◤◢◤ start practice ◢◤◢◤◢◤◢◤*/


        // The shift() method removes the first item of an array. https://www.w3schools.com/jsref/jsref_shift.asp
        // that's how i get the trial information one by one
        current_trial = trials.shift();

        //for debug purpose; 
        //console.log(trials, 'trials', trial_id);
        console.log(current_trial, 'trial_id', trial_id);

            // reminder: a current_trial element goes like this:
            // ["axiom.jpg", "1.jpg", "axiom", "agent1", "zephyr.jpg", "2.jpg", "zephyr", "agent2"]
        //find images for left / right agent
        stim1_img = current_trial[1];
        stim2_img = current_trial[5];


        // get agents' names in this trial and pass to respones_handler() function

        stim1_name = current_trial[3];
        stim2_name = current_trial[7];
        // display two agents image
        show_stim(stim1_img, stim2_img);

        // get left/right agents' names and pass to respones_handler() function
        left_target = stim1_name;
        right_target = stim2_name;

        // set current step
            current_step = "one";



        //debug, record the position (left/right side of the screen) of the image each time
            switch (stim1_name) {
                case "agent1":
                    a1_left++;
                    break;
                case "agent2":
                    a2_left++;
                    break;
                case "agent3":
                    a3_left++;
                    break;
                case "agent4":
                    a4_left++;
                    break;
            }

            switch (stim2_name) {
                case "agent1":
                    a1_right++;
                    break;
                case "agent2":
                    a2_right++;
                    break;
                case "agent3":
                    a3_right++;
                    break;
                case "agent4":
                    a4_right++;
                    break;
            }
            console.log("a1 left:", a1_left, "a1 right:", a1_right, "a2 left", a2_left, "a2 right", a2_right, "a3 left", a3_left, "a3 right", a3_right, "a4 left", a4_left, "a4 right", a4_right);
         // debug part for recording stim position ends here

        }

    /*◢◤◢◤◢◤◢◤ record trial id ◢◤◢◤◢◤◢◤*/
        console.log("trial id", trial_id);
        trial_id++;

    }, 500);
};

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* record response & show animation effects *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var response_handler = function (e) {
    //if not recording the response, return
    if (!listening) return

    /*◢◤◢◤◢◤◢◤ record key pressing event & display animation effect ◢◤◢◤◢◤◢◤*/

    var response_1step = -1; // default value
    var response_2step = -1; // default value
    if (e === undefined) keyCode = 0;  // When this is a timeout, e will be undefined.
    else keyCode = e.keyCode;


    console.log("current step:", current_step);  //check which step; for debugging purpose; ok to delete


    if (current_step === "one") { // check phase and only allow certain keys to be pressed during that phase

        switch (keyCode) { // switch stucture, similar to if/else statement. 
            /*◢◤◢◤◢◤◢◤ press [J]; target on the RIGHT ◢◤◢◤◢◤◢◤*/
            case 74:
                /*◢◤◢◤◢◤◢◤ record resoponse ◢◤◢◤◢◤◢◤*/
                response_1step = "right";
                chosen_target = stim2_name; //record agent name, like agent1, agent2, etc

                /*◢◤◢◤◢◤◢◤ display animation effect ◢◤◢◤◢◤◢◤*/
                document.getElementById('stim2').style.border = "5px solid yellow"; //add solid yellow box

                // move to the left & top within 300 ms
                //// alternative animation effect: stimulus becomes around 75% of its orignal size
                //$("#stim2").animate({ top: '-=20%', left: '-=24.6%', width: '-=11%', height: '-=15%' }, 300);

                //stimulus becomes around 60% of its orignal size
                $("#stim2").animate({ top: '-=23%', left: '-=25.5%', width: '-=15%', height: '-=20%' }, 300);

                //hide the other agent after pressing j
                document.getElementById('stim1').style.opacity = 0;


                break;
            /*◢◤◢◤◢◤◢◤ press [F]; target on the LEFT ◢◤◢◤◢◤◢◤*/
            case 70:
                /*◢◤◢◤◢◤◢◤ record resoponse ◢◤◢◤◢◤◢◤*/
                response_1step = "left";

                chosen_target = stim1_name;
                /*◢◤◢◤◢◤◢◤ display animation effect ◢◤◢◤◢◤◢◤*/
                //add solid box
                document.getElementById('stim1').style.border = "5px solid yellow";
                // move to the right & top in 300 ms
                //// alternative animation effect: stimulus becomes around 75% of its orignal size
                //$("#stim1").animate({ top: '-=20%', left: '+=24.6%', width: '-=11%', height: '-=15%' }, 300);

                 //stimulus becomes around 60% of its orignal size
                $("#stim1").animate({ top: '-=23%', left: '+=25.5%', width: '-=15%', height: '-=20%' }, 300);
                //hide the other agent after pressing f
                document.getElementById('stim2').style.opacity = 0;
                break;

            case 0: // when time out
                response_1step = 'none';
                break;


            default:   //default value, when no keys other than [F/J] are pressed
                response_1step = -1;
                //response_2step = -1;
                break;
        }
    } else if (current_step === "two") {
        switch (keyCode) {
            case 32: //space bar
                response_2step = "space";
                document.getElementById('stim').style.border = "5px solid white";  // add border to stock image
               
                break;
            case 0: // when time out
                response_2step = 'none';
                break;
            default: //default value
                response_2step = -1;
                break;

        }
    } 


    switch (phase) {

        case "step_two_practice_stock1":
        case "step_two_practice_stock2":

            if (response_2step !== -1) {
                document.getElementById('stim').style.border = "5px solid white";
                console.log(stock_value);
                setTimeout(function () {
                    d3.select('#stock_value').html(stock_value);

                }, 500);


                listening = false;

                var rt = new Date().getTime() - stim_on; // calculate response time
                //psiturk record all the data
                psiTurk.recordTrialData({
                    'phase': phase,
                    'current_step': current_step,
                    'trial': trial_id,
                    'stock_name': stock_name,
                    'stock_value': stock_value,
                    'left_target': left_target,
                    'right_target': right_target,
                    'chosen_target': chosen_target,
                    'chosen_stock': chosen_stock,
                    'rt': rt,
                    'stock1_name': stock1,
                    'stock2_name': stock2,
                    'correct_num': correct_num
                });



                setTimeout(function () {
                    remove_stim();
                    next();
                }, 1500);

            }
            break;

        case "step_one_practice_stock1":
        case "step_one_practice_stock2":
            if (response_1step != -1) {
                listening = false;
                show_step2_stock(); // display stock images. See show_step2_stock() section for detailed infomation
                // this fuction also alfters the step (step 1 to step 2)


                var rt = new Date().getTime() - stim_on; // calculate response time
                //psiturk record all the data
                psiTurk.recordTrialData({
                    'phase': phase,
                    'current_step': current_step,
                    'trial': trial_id,
                    'stock_name': stock_name,
                    'stock_value': stock_value,
                    'left_target': left_target,
                    'right_target': right_target,
                    'chosen_target': chosen_target,
                    'chosen_stock': chosen_stock,
                    'rt': rt,
                    'stock1_name': stock1,
                    'stock2_name': stock2,
                    'correct_num': correct_num
                });

                setTimeout(function () {
                    remove_stim();
                    next();
                }, 1500);

            };
            break;

        case "main_trials":
            if (response_1step != -1 && response_2step === -1) { // if pressing [F/J] during stage one
                
                show_step2_stock(); // display stock images. See show_step2_stock() section for detailed infomation
                // this fuction also alfters the step (step 1 to step 2)
                correct_num = "null";
                if (timer_step1) // check if too slow timer for step one exists
                {
                    clearTimeout(timer_step1); //kill the timer since the subject has responded
                    warning = false;
                };

 

                //console.log(response_1step, response_2step); //for debug process. Ok to delete

                if (current_step === "two") { // check current step
                    timer_step2 = setTimeout(function () {  // prepare too slow timer for step 2 
                        d3.select('#warning').html('TOO SLOW!'); // display text

                        warning = true;
                        listening = false; // if too slow, response won't be recorded
                        setTimeout(function () { // do things after 500 ms
                            remove_stim(); // remove current stim
                            next(); // go to next trial 
                        }, 500);

                    }, response_deadline); // too slow timer for step 2 will appear after deadline
                };


            } else if (response_2step != -1) { // if entering step 2 and responding

                listening = false; // stop recording key events

                if (response_2step === "space") { // check if response in this step is space
                    /*◢◤◢◤◢◤◢◤ cancel the step 2 "too slow" warning if press [SPACE] bar before the response deadline ◢◤◢◤◢◤◢◤*/
                    if (timer_step2) {  // check if too slow timer for step two exists
                        clearTimeout(timer_step2); // cancel the timer since the subject has responded
                        warning = false;

                    };

                    if (chosen_stock === "stock1") {
                        stock_value = stock1_reward.shift();
                    } else { stock_value = stock2_reward.shift(); }
                    console.log(stock_value, "current stock value"); //for debugging, ok to delete
                    setTimeout(function () {
                        d3.select('#stock_value').html("+" + stock_value);
                    }, 500);
  


                    var rt = new Date().getTime() - stim_on; // calculate response time
                    //psiturk record all the data
                    psiTurk.recordTrialData({
                        'phase': phase,
                        'current_step': current_step,
                        'trial': trial_id,
                        'stock_name': stock_name,
                        'stock_value': stock_value,
                        'left_target': left_target,
                        'right_target': right_target,
                        'chosen_target': chosen_target,
                        'chosen_stock': chosen_stock,
                        'rt': rt,
                        'stock1_name': stock1,
                        'stock2_name': stock2,
                        'correct_num': correct_num
                    });


                    setTimeout(function () {
                        remove_stim();
                        next();
                    }, 1500);
                };


            };
            break;
    }; //switch (phase){} func ends here


    console.log(response_1step, response_2step, rt);

};


var show_step2_stock = function () {  //display stock image after an agent is selected 
    current_step = "two"; // set step to two
    /*◢◤◢◤◢◤◢◤ display stocks based on the chosen target ◢◤◢◤◢◤◢◤*/
    if (chosen_target === "agent1" || chosen_target === "agent3") {
        setTimeout(function () { // display stock 1 image after 600 ms (after the agent image goes to the top of the screen)
            d3.select("#stim")
                .append("img")
                .attr("src", stimFolder + stock1_img)
                .attr("id", 'pic')
                .style("width", "100%")
                .style("height", "100%");
        }, 600);
        chosen_stock = "stock1"; // define chosen_stock, function response_handler() will record it.


        /*◢◤◢◤◢◤◢◤ check if it is the correct answer for step one practice ◢◤◢◤◢◤◢◤*/
        if (phase === "step_one_practice_stock1") {
            correct_num++; // correct_num +1 when selecting stock 1 in phase "step_one_practice_stock1"
        }
    } else if (chosen_target === "agent2" || chosen_target === "agent4") { 
        setTimeout(function () { // display stock 2 image after 600 ms (after the agent image goes to the top of the screen)
            d3.select("#stim")
                .append("img")
                .attr("src", stimFolder + stock2_img)
                .attr("id", 'pic')
                .style("width", "100%")
                .style("height", "100%");
        }, 600);
        chosen_stock = "stock2"; // define chosen_stock, function response_handler() will record it.
        /*◢◤◢◤◢◤◢◤ check if it is the correct answer for step one practice ◢◤◢◤◢◤◢◤*/
        if (phase === "step_one_practice_stock2") {
            correct_num++; // correct_num +1 when selecting stock 2 in phase "step_one_practice_stock2"
        };
    };
};




/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* break session *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var break_session = function () {
/*◢◤◢◤◢◤◢◤ main_trials ◢◤◢◤◢◤◢◤*/
    var timeleft = break_session_length;
/*◢◤◢◤◢◤◢◤ break sessions  ◢◤◢◤◢◤◢◤*/
    // setInterval) usage: https://stackoverflow.com/questions/5978519/how-to-use-setinterval-and-clearinterval
    timer_break = setInterval(function () {

        console.log('break session'); // debug purpose, ok to delete
        //display the instructions for break sessions
        // "#pause_instruction" is the position in the page to display the text
        // check stage.html & style.css for more info
        d3.select("#pause_instruction").html('<p>You have finished a round of this task.</p><p>You will now take a break for 15 seconds.</p> <p>A 3 - second countdown will signal the start of the next round.</p>');
        // count down

        timeleft -= 1;
        if (timeleft < 5) {
                        // display countdown text (from 5 -1 sec). "#countdown" is the position in the page to display the text
            // check stage.html & style.css for more info
            d3.select("#countdown").html(timeleft);
        };


        if (timeleft <= 0) { // 0 sec left, end break session
            clearInterval(timer_break); // clear the interval
            //clear count down and break session instructions
            d3.select("#countdown").html(''); 
            d3.select("#pause_instruction").html('');

            load_trial(); // call load_trial() to prepare next trial

            timer_step1 = setTimeout(function () { // load timer for next trial 
                d3.select('#warning').html('TOO SLOW!'); // show too slow text 
                document.getElementById('stim2').style.opacity = 0.6; // make stimuli darker when showing too slow
                document.getElementById('stim1').style.opacity = 0.6; // make stimuli darker when showing too slow
                warning = true;
                setTimeout(function () {
                    // go to next trial automatically if not responding
                    // if responding, the timer will be killed in response_handler() function
                    remove_stim(); 
                    next();
                }, 500);
            }, response_deadline);
        }
    }, 500);

};


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
 ◢◤                                                                                                                                           ◢◤
 ◢◤                                                        * Reward Section *                                                                 ◢◤
 ◢◤                                                                                                                                           ◢◤
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
  * Gaussian stuff *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
// return random number from Gaussian distribution (mean = 0) with specified standard deviation
var return_Gaussian_withSD = function (mean, std_dev) {
    return mean + (return_Gaussian() * std_dev);
}

// returns random number from Gaussian distribution (mean = 0, SD = 1)
// ~95% of numbers returned should fall between -2 and 2
// uses Box-Muller transform to convert from uniform distribution to Gaussian distribution
// taken from https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
var return_Gaussian = function () {
    var u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// returns a random integer between min (inclusive) and max (inclusive)
// the value is no lower than the min (or the next integer greater than min
// if min isn't an integer) and no greater than the max (or the next integer
// lower than max if max isn't an integer)
var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
    // one stock should start between +0 and +4 points; other stock should start between +5 and +9 points
    // then each fluctuate according to a Gaussian random walk with SD = 2
    // with bounds at +0 and +9
/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* reward calculator *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var calculate_reward = function (start_min, start_max, std_dev, lower_bound, higher_bound, list_length) {
    var reward_list = [];
    var reward = getRandomInt(start_min, start_max); //starting point
    reward_list.push(reward); // make this the first element in the list
    for (i = 0; i < list_length; i++) {
        reward += return_Gaussian_withSD(0, std_dev); // Gaussian random walk with SD = 2, change based on previous value
        reward = Math.max(lower_bound, reward); reward = Math.min(reward, higher_bound); // check if the value is located in [0,9]
        reward_list.push(Math.floor(reward)); // make each reward value an integer and add to list
    };
    return reward_list;
};

// start_min, start_max, std_dev, lower_bound, higher_bound, list_length 
// start between +0 and +4 points (start_min = 0, start_max = 4);
// Gaussian random walk with sd =2 (std_dev=2);
// fluctuare with bounds between 0~9 (lower_bound = 0; higher_bound = 9);
//list_length = 156
stock1_reward = calculate_reward(0, 4, 2, 0, 9, 156);

// start between +5 and +9 points (start_min = 0, start_max = 4);
// Gaussian random walk with sd =2 (std_dev=2);
// fluctuare with bounds between 0~9 (lower_bound = 0; higher_bound = 9);
//list_length = 156 
stock2_reward = calculate_reward(5, 9, 2, 0, 9, 156);

console.log(stock1_reward, "stock1 reward"); //for debugging, ok to delete
console.log(stock2_reward, "stock2 reward"); //for debugging, ok to delete
/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
 ◢◤                                                                                                                                           ◢◤
 ◢◤                                                   * "Central Executive" *                                                                 ◢◤
 ◢◤                                                                                                                                           ◢◤
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
//decide next trial & link to different phases
//functions like centrial executive

var next = function () {
    // first identify which phase. Take dfferent actions in different phases.
    // then check trial length. Keep loading next trial until no trial in the phase exists (trial.length === 0)
    // if no more trials in this phase, load instructions & experiment for next phase
    // also check accuracy & if it's time to take a break
    // add too slow timer for step 1 for each trial in main_trials phase
    // if responding, the timer will be killed in fucntion response_handler()

    switch (phase) { 
        case "step_two_practice_stock1":
            /*◢◤◢◤◢◤◢◤ go to next phase if finshing all trials for current phase ◢◤◢◤◢◤◢◤*/
            if (trials.length === 0) { // change the number if you want to test partial trials in this phase
                return psiTurk.doInstructions(step_two_prac_stock2_pages,
                    function () {
                        currentview = new step_two_practice_stock2();
                    }
                );
            } else {
            /*◢◤◢◤◢◤◢◤  begin the phase ◢◤◢◤◢◤◢◤*/
                load_trial();
            }
            break;
        case "step_two_practice_stock2":
        /*◢◤◢◤◢◤◢◤ go to next phase if finshing all trials for current phase ◢◤◢◤◢◤◢◤*/
            if (trials.length === 0) { // change the number if you want to test partial trials in this phase
                // see the next phase nscructions first
                return psiTurk.doInstructions(step_one_prac_stock1_pages,
                    function () {
                        currentview = new step_one_practice_stock1();
                    }
                );
            } else {

                load_trial();
            }
            break;
        /*◢◤◢◤◢◤◢◤ step_one_practice_stock1 ◢◤◢◤◢◤◢◤*/
        case "step_one_practice_stock1":
            /*◢◤◢◤◢◤◢◤ go to next phase if accuracy is >= 13/16 ◢◤◢◤◢◤◢◤*/
            if (correct_num >= 13 && trials.length === 0) { // change the number if you want to test partial trials in this phase
                                // see the inscructions for next phase first
                return psiTurk.doInstructions(step_one_prac_stock2_pages,
                    function () {
                        console.log('go to stock2 practice');
                        currentview = new step_one_practice_stock2();
                    });
                /*◢◤◢◤◢◤◢◤  keep doing the same phase if accuracy is <= 13/16◢◤◢◤◢◤◢◤*/
            } else if (correct_num < 13 && trials.length === 0) { // change the number if you want to test partial trials in this phase
                                          // see the reminder inscructions first
                return psiTurk.doInstructions(step_one_prac_stock1_reminder_pages,
                    function () {
                        console.log('keep doing stock1 practice');
                        currentview = new step_one_practice_stock1();
                    });
                /*◢◤◢◤◢◤◢◤  begin the phase ◢◤◢◤◢◤◢◤*/
            } else {
                load_trial();
            };
            break;
        /*◢◤◢◤◢◤◢◤ step_one_practice_stock2 ◢◤◢◤◢◤◢◤*/
        case "step_one_practice_stock2":
            /*◢◤◢◤◢◤◢◤ go to next phase if accuracy is >= 13/16 ◢◤◢◤◢◤◢◤*/
            if (correct_num >= 13 && trials.length === 0) { // change the number if you want to test partial trials in this phase
                return psiTurk.doInstructions(main_trials_pages,
                    function () {
                        console.log('go to main trials');
                        currentview = new main_trials();
                    });
                /*◢◤◢◤◢◤◢◤  keep doing the same phase if accuracy is <= 13/16◢◤◢◤◢◤◢◤*/
            } else if (correct_num < 13 && trials.length === 0) { // change the number if you want to test partial trials in this phase
                                          // see the reminder inscructions first
                return psiTurk.doInstructions(step_one_prac_stock2_reminder_pages,
                    function () {
                        console.log('keep doing stock2 practice');
                        currentview = new step_one_practice_stock2();
                    });
                /*◢◤◢◤◢◤◢◤  begin the phase ◢◤◢◤◢◤◢◤*/
            } else {
                load_trial();
            };
            break;
        /*◢◤◢◤◢◤◢◤ main_trials ◢◤◢◤◢◤◢◤*/
        case "main_trials":
            /*◢◤◢◤◢◤◢◤ end the task if complete all the trials in this phase ◢◤◢◤◢◤◢◤*/
            if (trials.length === 0) { // change the number if you want to test partial trials in this phase
                finish();
                /*◢◤◢◤◢◤◢◤ break session after finshing 52rd or 105th trial ◢◤◢◤◢◤◢◤*/
            } else if (trial_id === 53 || trial_id === 105) { // change the number if you want to test the break session faster
                break_session();
            } else {
     
                /*◢◤◢◤◢◤◢◤  begin the phase ◢◤◢◤◢◤◢◤*/
                load_trial();
                /*◢◤◢◤◢◤◢◤ "too slow" warning for step 1 per trial ◢◤◢◤◢◤◢◤*/
                timer_step1 = setTimeout(function () {
                    d3.select('#warning').html('TOO SLOW!');
                    document.getElementById('stim2').style.opacity = 0.6; // make stimuli darker when showing too slow
                    document.getElementById('stim1').style.opacity = 0.6; // make stimuli darker when showing too slow

                    warning = true;
                /*◢◤◢◤◢◤◢◤ go to next trial after "too slow" warning ◢◤◢◤◢◤◢◤*/
                    listening = false;
                    setTimeout(function () {
                        remove_stim();
                        next();
                    }, 500);
                }, response_deadline);
            };
            break;
    };
};


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
 ◢◤                                                                                                                                           ◢◤
 ◢◤                                                         * Task Phases *                                                                   ◢◤
 ◢◤                                                                                                                                           ◢◤
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* PRACTICE STEP TWO - STOCK 1 *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var step_two_practice_stock1 = function () {

    phase = "step_two_practice_stock1";
    trial_id = 1;



    trials = stock1_list;
    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');

    // Register the response handler that is defined above to handle any
    // key down events. 
    $("body").focus().keydown(response_handler);

    // Start practice phase A
    next();
};

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* PRACTICE STEP TWO - STOCK 2 *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var step_two_practice_stock2 = function () {

    phase = "step_two_practice_stock2";
    trial_id = 1;


    trials = stock2_list;
    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');

    // Register the response handler that is defined above to handle any
    // key down events. 
    $("body").focus().keydown(response_handler);

    // Start practice phase A
    next();
};

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* PRACTICE STEP ONE - STOCK 1 *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var step_one_practice_stock1 = function () {
    phase = "step_one_practice_stock1";
    trials = balanced_trials(essential_trials, step_one_practice_trial_num);

    correct_num = 0; // reset accuracy calculation
   
    trial_id = 1;  //reset trial id in this phase

    //debuging, check if images appear on the both of the screen on the same frequencies;
    a1_left = a1_right = a2_right = a2_left = a3_left = a3_right = a4_right = a4_left = 0; 

    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');
    // Register the response handler that is defined above to handle any
    // key down events.
    $("body").focus().keydown(response_handler);
    // start the first trial
    next();
};

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* PRACTICE STEP ONE - STOCK 2 *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var step_one_practice_stock2 = function () {

    phase = "step_one_practice_stock2";
    trials = balanced_trials(essential_trials, step_one_practice_trial_num);

    correct_num = 0;// reset accuracy calculation

    trial_id = 1; //reset trial id in this phase

    //debuging, check if images appear on the both of the screen on the same frequencies;
    a1_left = a1_right = a2_right = a2_left = a3_left = a3_right = a4_right = a4_left = 0;

    /*◢◤◢◤◢◤◢◤ prepare the page for practice phase B ◢◤◢◤◢◤◢◤*/
    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');
    // Register the response handler that is defined above to handle any
    // key down events.
    $("body").focus().keydown(response_handler);
    // srt the first trial
    next();
};



/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* Main Trials *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

var main_trials = function () {
    phase = "main_trials";

    trial_id = 1; //reset trial id in this phase
    // per the request, in the first 52 trials, each agent should appear 13 times ob both sides of the screen
    var pre_1st_break_trials = balanced_trials(essential_trials, main_tirals_before_1st_break);

    var post_1st_break_trials = balanced_trials(essential_trials, main_tirals_after_1st_break);

    trials = pre_1st_break_trials.concat(post_1st_break_trials);



    //debuging, check if images appear on the both of the screen on the same frequencies;
    a1_left = a1_right = a2_right = a2_left = a3_left = a3_right = a4_right = a4_left = 0;

    /*◢◤◢◤◢◤◢◤ prepare the page for practice phase B ◢◤◢◤◢◤◢◤*/
    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');
    // Register the response handler that is defined above to handle any
    // key down events.

    $("body").focus().keydown(response_handler);
  
    // start the first trial
    next();
};


//delete will cause errors
/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* Finish main trials *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var finish = function () {
    $("body").unbind("keydown", response_handler); // Unbind keys
    currentview = new Questionnaire1();
};


/****************
* Questionnaire 1 *
****************/

var Questionnaire1 = function () {

    var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

    record_responses = function () {

        //psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

        $('input').each(function (i, val) {
            psiTurk.recordUnstructuredData(this.id, this.value);
        });
        $('select').each(function (i, val) {
            psiTurk.recordUnstructuredData(this.id, this.value);
        });

    };

    prompt_resubmit = function () {
        replaceBody(error_message);
        $("#resubmit").click(resubmit);
    };

    resubmit = function () {
        replaceBody("<h1>Trying to resubmit...</h1>");
        reprompt = setTimeout(prompt_resubmit, 10000);

        psiTurk.saveData({
            success: function () {
                clearInterval(reprompt);

            },
            error: prompt_resubmit
        });
    };
    // Load the questionnaire snippet 
    psiTurk.showPage('postquestionnaire1.html');
    psiTurk.recordTrialData({ 'phase': 'postquestionnaire1', 'status': 'begin' });

    $("#next").click(function () {
        record_responses();
        psiTurk.saveData({
            success: function () {
                psiTurk.computeBonus('compute_bonus', function () {
                    psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                });
            },
            error: prompt_resubmit
        });
    });


};




// Task object to keep track of the current phase, psiturk deault. Don't delete 
var currentview;

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
 * Run Task *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

/*** by deault, this phase starts first ***/
//$(window).load(function () {
//    psiTurk.doInstructions(
//        step_two_prac_stock1_pages, // a list of pages you want to display in sequence

//        function () { currentview = new step_two_practice_stock1(); } // what you want to do when you are done with instructions
//    );
//});

/*** If you want to skip the other phases and test how the step_two_practice_stock2 phase works, comment out the lines above and uncomment the lines below
***/
//$(window).load(function () {
//    psiTurk.doInstructions(
//        step_two_prac_stock2_pages, // a list of pages you want to display in sequence

//        function () { currentview = new step_two_practice_stock2(); } // what you want to do when you are done with instructions
//    );
//});


/*** If you want to skip the other phases and test how the step_one_practice_stock1 phase works, comment out the lines above and uncomment the lines below
 ***/
//$(window).load( function(){
//    psiTurk.doInstructions(
//        step_one_prac_stock1_pages, // a list of pages you want to display in sequence

//        function () { currentview = new step_one_practice_stock1(); } // what you want to do when you are done with instructions
//    );
//});

/*** If you want to skip the other phases and test how the step_one_practice_stock2 phase works, comment out the lines above and uncomment the lines below
// ***/
//$(window).load(function () {
//    psiTurk.doInstructions(
//        step_one_prac_stock2_pages, // a list of pages you want to display in sequence

//        function () { currentview = new step_one_practice_stock2(); } // what you want to do when you are done with instructions
//    );
//});



/*** If you want to skip the other phases and test how the Questionnaire1 works, comment out the lines above and uncomment the lines below
***/
//$(window).load(function () {
//    psiTurk.doInstructions(
//         main_trials_pages,// a list of pages you want to display in sequence
//        function () { currentview = new Questionnaire1(); } // what you want to do when you are done with instructions
//    );
//});




/*** If you want to skip the other phases and test how the main_trials phase works, comment out the lines above and uncomment the lines below
***/
$(window).load(function () {
    psiTurk.doInstructions(
        main_trials_pages, // a list of pages you want to display in sequence
        function () { currentview = new main_trials(); } // what you want to do when you are done with instructions
    );
});
