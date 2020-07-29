/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* Author: Lee Qianqian Cui
* Email: qc697@nyu.edu
* Website: https://qianqiancui.github.io/
* Two Step Task
* New York University
* Summer 2020
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object, do not delete
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

//psiTurk.taskdata.set('condition', 2);
//psiTurk.taskdata.get('condition');
experiment_code_version = 1.0;
num_conds = 2;
num_counters = 1;

var mycondition = condition;  // these two variables are passed by the psiturk server process

var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you


// All pages to be loaded
var pages = [

    "instructions/instruct-ready.html",
    "stage.html",
    "instructions/ansInstruct-ready.html",
    "postquestionnaire1.html",

    "instructions/step_two_prac_stock1.html",
    "instructions/step_two_prac_stock2.html",
    "instructions/step_one_prac_stock1_reminder.html",
    "instructions/step_one_prac_stock2_reminder.html",
    "instructions/step_one_prac_stock1.html",
    "instructions/step_one_prac_stock2.html",
    "instructions/main_trials.html"
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
var training_instruction_pages = [ // add as a list as many pages as you like

	"instructions/instruct-ready.html"
];


var testing_instruction_pages = [// add as a list as many pages as you like
   
    "instructions/ansInstruct-ready.html"
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


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* relationship between agents & stocks (for reference) *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var rela_dict = {
    "stock1": ["agent1", "agent3"],
    "stock2": ["agent2", "agent4"]
};

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
◢◤                                                                                                                                ◢◤
◢◤                                                    * Global Variables *                                                        ◢◤
◢◤                                                                                                                                ◢◤
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var stimFolder = "/static/images/";

/*◢◤◢◤◢◤◢◤ * variables for step two practice * ◢◤◢◤◢◤◢◤*/
var stock_value, stock_name;
var step_two_practice_stock1_list, step_two_practice_stock2_list;

/*◢◤◢◤◢◤◢◤ * variables for step one practice * ◢◤◢◤◢◤◢◤*/
var left_target, right_target, chosen_target, chosen_stock;
var stock1_img, stock2_img, stock1, stock2, stim1, stim2, stim1_name, stim2_name;

var step_one_practice_trial_num = 16;
var main_tirals_before_1st_break = 52;
var main_tirals_after_1st_break = 104;

var break_session_length = 15; //(seconds);
var response_deadline = 3000; //(milliseconds);
var warning = false;
var listening = false;
var correct_num;
var stim_on; // time stimulus is presented
var current_step;
var phase, trials, current_trial;
var trial_id;
var timer_step1, timer_step2, timer_break; // (1), (2) → timer for "too slow" warning in step 1 & step; (3) → timer for break session;

var axiom_reward, zephyr_reward;



/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
◢◤                                                                                                                                ◢◤
◢◤                                         * Elements for Building the Entire T ask *                                              ◢◤
◢◤                                                                                                                                ◢◤
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

/*◢◤◢◤◢◤◢◤ stock value lists for step two practice ◢◤◢◤◢◤◢◤*/
var axiom_values = [["axiom.jpg", "+8", "axiom"], ["axiom.jpg", "+9", "axiom"], ["axiom.jpg", "+7", "axiom"],
["axiom.jpg", "+5", "axiom"], ["axiom.jpg", "+3", "axiom"]];
var zephyr__values = [["zephyr.jpg", "+1", "zephyr"], ["zephyr.jpg", "+0", "zephyr"], ["zephyr.jpg", "+2", "zephyr"],
    ["zephyr.jpg", "+5", "zephyr"], ["zephyr.jpg", "+6", "zephyr"]];


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* decide which stock should be stock1/stock2 randomly *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var decider = Math.random();

if (decider <= 0.5) {
    stock1 = "axiom";
    stock1_img = "axiom.jpg";
    stock2 = "zephyr";
    stock2_img = "zephyr.jpg";
    step_two_practice_stock1_list = axiom_values;
    step_two_practice_stock2_list = zephyr__values;
} else {
    stock2 = "axiom";
    stock2_img = "axiom.jpg";
    stock1 = "zephyr";
    stock1_img = "zephyr.jpg";

    step_two_practice_stock2_list = axiom_values;
    step_two_practice_stock1_list = zephyr__values;
}
console.log("stock1", stock1, "stock2", stock2);


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* prepare stimulus on both sides of the screen (in a balanced way) *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var left_right_order = [
    [[stock1_img, "1.jpg", stock1, "agent1", stock2_img, "2.jpg", stock2, "agent2"]],
    [[stock1_img, "1.jpg", stock1, "agent1", stock2_img, "4.jpg", stock2, "agent4"]],
    [[stock1_img, "3.jpg", stock1, "agent3", stock2_img, "2.jpg", stock2, "agent2"]],
    [[stock1_img, "3.jpg", stock1, "agent3", stock2_img, "4.jpg", stock2, "agent4"]]
];

var right_left_order = [
    [[stock2_img, "2.jpg", stock2, "agent2", stock1_img, "1.jpg", stock1, "agent1"]],
    [[stock2_img, "4.jpg", stock2, "agent4", stock1_img, "1.jpg", stock1, "agent1"]],
    [[stock2_img, "2.jpg", stock2, "agent2", stock1_img, "3.jpg", stock1, "agent3"]],
    [[stock2_img, "4.jpg", stock2, "agent4", stock1_img, "3.jpg", stock1, "agent3"]]
];

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* prepare balanced trials for step one tasks (practice & main trials) *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var balanced_trials = function (left_side, right_side,  trial_num) {
    var trial_container_1 = [];
    var trial_container_2 = [];
    var trial_container_3 = [];
    var trial_container = [];
    // put all trials (containing stimuli information) into arrays based on desired number of trials 
    for (var x = 0; x < trial_num / 2; x++) {
        trial_container_1 = trial_container_1.concat(left_side[x % 4]);
    };

    for (var y = 0; y < trial_num / 2; y++) {
        trial_container_2 = trial_container_2.concat(right_side[y % 4]);
    };

    //shuffle everything
    trial_container_3 = _.shuffle([].concat(trial_container_1).concat(trial_container_2));
    trial_container = _.shuffle(trial_container.concat(trial_container_3));

    console.log(trial_container, 'preview all trials');
    return trial_container;

};


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* show_stim & remove_stim functions that will be used in STEP ONE TASKS (practice & main trials) *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
/*◢◤◢◤◢◤◢◤ * display two stimuli * ◢◤◢◤◢◤◢◤*/
var show_stim = function (image1, image2) {
    //load image1 (on the left)
    d3.select("#stim1")
        .append("img")
        .attr("src", stimFolder + image1)
        .attr("id", 'pic1')
        .style("width", "100%")
        .style("height", "100%")
        .style("border", "initial")
        .style("top", "40%");
    //load image1 (on the right)
    d3.select("#stim2")
        .append("img") // append image
        .attr("src", stimFolder + image2)
        .attr("id", 'pic2')
        .style("width", "100%")
        .style("height", "100%")
        .style("border", "initial")
        .style("top", "40%");
};
/*◢◤◢◤◢◤◢◤ * remove two stimuli * ◢◤◢◤◢◤◢◤*/
var remove_stim = function () {
    //remove the previous images;
    d3.select("#pic1").remove();
    d3.select("#pic2").remove();
    d3.select("#pic").remove();
    //set the border of each image to initial state;
    document.getElementById('stim').style.border = "initial";
    d3.select('#stock_value').html('');
    document.getElementById('stim1').style.border = "initial";
    document.getElementById('stim2').style.border = "initial";

    //back to original positions
    document.getElementById('stim1').style.top = "40%";
    document.getElementById('stim2').style.top = "40%";

    document.getElementById('stim1').style.left = "20%";
    document.getElementById('stim2').style.left = "80%";
    // back to orignial size
    document.getElementById('stim1').style.width = "";
    document.getElementById('stim1').style.height = "";
    document.getElementById('stim2').style.width = "";
    document.getElementById('stim2').style.height= "";

    //opacity of each stimulus (0: transparent; 1: solid);
    document.getElementById('stim1').style.opacity = 1;
    document.getElementById('stim2').style.opacity = 1;

    //clear "too slow" text
    d3.select('#warning').html('');
};

var show_stim_step_two_practice = function (image) {
    d3.select("#stim")
        .append("img")
        .attr("src", stimFolder + image)
        .attr("id", 'pic')
        .style("width", "300px")
        .style("height", "300px")
        .style("border", "initial");
};


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* load information for a single trial *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var load_trial = function () {
    /*◢◤◢◤◢◤◢◤ trial interval: 500ms  ◢◤◢◤◢◤◢◤*/
    setTimeout(function () {

        stim_on = new Date().getTime();
        listening = true;

        if (phase === "step_two_practice_stock1" || phase === "step_two_practice_stock2") {
            current_trial = trials.shift();

            show_stim_step_two_practice(current_trial[0]);
            //stim_on = new Date().getTime();
            //listening = true;
            stock_value = current_trial[1];
            stock_name = current_trial[2];
            current_step = "two";
        } else {
        /*◢◤◢◤◢◤◢◤ start practice ◢◤◢◤◢◤◢◤*/
        current_trial = trials.shift();
        //for debug purpose; 
        //console.log(trials, 'trials', trial_id);
        //console.log(current_trial, 'current', trial_id);
        //console.log('shift', current_trial);

        //find path & name of the image
        stim1 = current_trial[1];
        stim2 = current_trial[5];
        // get stimuli's names
        stim1_name = current_trial[3];
        stim2_name = current_trial[7];
        // display
        show_stim(stim1, stim2);

        left_target = stim1_name;
        right_target = stim2_name;
        current_step = "one";
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
    if (!listening) return

/*◢◤◢◤◢◤◢◤ record key pressing event & display animation effect ◢◤◢◤◢◤◢◤*/
    var keyCode = e.keyCode,
        response;
    switch (keyCode) {
        /*◢◤◢◤◢◤◢◤ press [J]; target on the RIGHT ◢◤◢◤◢◤◢◤*/
        case 74:
            if (current_step === "one") {
            /*◢◤◢◤◢◤◢◤ record resoponse ◢◤◢◤◢◤◢◤*/
                response = "right";
                chosen_target = stim2_name;
            /*◢◤◢◤◢◤◢◤ display animation effect ◢◤◢◤◢◤◢◤*/
                //add solid box
                document.getElementById('stim2').style.border = "5px solid yellow";
                // move to the left & top within 300 ms
                // stimulus becomes around 75% of its orignal size
                $("#stim2").animate({ top: '-=20%', left: '-=24.6%', width: '-=11%', height: '-=15%' }, 300);

                // stimulus becomes around 60% of its orignal size
                //$("#stim2").animate({ top: '-=20%', left: '-=25.5%', width: '-=11%', height: '-=15%' }, 300);


                //hide the other stimulus
                document.getElementById('stim1').style.opacity = 0;
 
            }
            break;
        /*◢◤◢◤◢◤◢◤ press [F]; target on the LEFT ◢◤◢◤◢◤◢◤*/
        case 70:
            if (current_step === "one") {
            /*◢◤◢◤◢◤◢◤ record resoponse ◢◤◢◤◢◤◢◤*/
                response = "left";

                chosen_target = stim1_name;
            /*◢◤◢◤◢◤◢◤ display animation effect ◢◤◢◤◢◤◢◤*/
                //add solid box
                document.getElementById('stim1').style.border = "5px solid yellow";
                // move to the right & top in 300 ms
                // stimulus becomes around 75% of its orignal size
                $("#stim1").animate({ top: '-=20%', left: '+=24.6%', width: '-=11%', height: '-=15%' }, 300);

                // stimulus becomes around 60% of its orignal size
                //$("#stim1").animate({ top: '-=20%', left: '+=25.5%', width: '-=11%', height: '-=15%' }, 300);
                //hide the other stimulus
                document.getElementById('stim2').style.opacity = 0;
            }
            break;

        case 32:
            if (current_step === "two") {
                response = "space";

                document.getElementById('stim').style.border = "5px solid yellow";
                console.log("space_pressed");
             }
            break;

        //if do not press anything
        default:
            response = "";
            break;

    }
/*◢◤◢◤◢◤◢◤ record if length of the response > 0 ◢◤◢◤◢◤◢◤*/
    if ((response.length > 0)) {

    /*◢◤◢◤◢◤◢◤ record responses for step two practice ◢◤◢◤◢◤◢◤*/
        if (phase === "step_two_practice_stock1" || phase === "step_two_practice_stock2") {
                // add yellow soild box
                document.getElementById('stim').style.border = "5px solid yellow";
                setTimeout(function () {
                    d3.select('#stock_value').html(stock_value);
                }, 500);

                listening = false;
                var hit = response;
                var rt = new Date().getTime() - stim_on;
                psiTurk.recordTrialData({
                    'phase': "step_two_practice",
                    'current_step': current_step,
                    'trial': trial_id,
                    'stock_name': stock_name,
                    'stock_value': stock_value,
                    'response': response,
                    'hit': hit,
                    'rt': rt
                });

                setTimeout(function () {
                    remove_stim();
                    next();
                }, 1500);
        }

    /*◢◤◢◤◢◤◢◤ cancel step 1 "too slow" warning if F/J is presed ◢◤◢◤◢◤◢◤*/
        if (timer_step1) {
            // cancel existing timer if exist;
            clearTimeout(timer_step1);
            warning = false;
        };

    /*◢◤◢◤◢◤◢◤ set up step 2 "too slow" warning ◢◤◢◤◢◤◢◤*/
        if (phase === "main_trials") {
            timer_step2 = setTimeout(function () {
                d3.select( '#warning').html('TOO SLOW!');
                warning = true;
                setTimeout(function () {
                    remove_stim();
                    next();
                }, 500);
            }, response_deadline);

            correct_num = "null";
        };

        //setTimeout(function () {
        //    //d3.select('#stock_value').html(stock_value);
        //}, 500);
        current_step = "two";

    /*◢◤◢◤◢◤◢◤ display stocks based on the chosen target ◢◤◢◤◢◤◢◤*/
        if (chosen_target === "agent1" || chosen_target === "agent3") {
            setTimeout(function () {
               d3.select("#stim")
                    .append("img")
                    .attr("src", stimFolder + stock1_img)
                    .attr("id", 'pic')
                    .style("width", "300px")
                    .style("height", "300px");
            }, 600);
            chosen_stock = "stock1";

        /*◢◤◢◤◢◤◢◤ check if it is the correct answer for step one practice ◢◤◢◤◢◤◢◤*/
            if (phase === "step_one_practice_stock1") {
                correct_num++;
            }
        } else if (chosen_target === "agent2" || chosen_target === "agent4") {
            setTimeout(function () {
                d3.select("#stim")
                    .append("img")
                    .attr("src", stimFolder + stock2_img)
                    .attr("id", 'pic')
                    .style("width", "300px")
                    .style("height", "300px");
            }, 600);
            chosen_stock = "stock2";
        /*◢◤◢◤◢◤◢◤ check if it is the correct answer for step one practice ◢◤◢◤◢◤◢◤*/
            if (phase === "step_one_practice_stock2") {
                correct_num++;
            };
        };

        listening = false;
    /*◢◤◢◤◢◤◢◤ calculate reaction time ◢◤◢◤◢◤◢◤*/
        var rt = new Date().getTime() - stim_on;

    /*◢◤◢◤◢◤◢◤ psiTurk record data ◢◤◢◤◢◤◢◤*/
        psiTurk.recordTrialData({
            'phase': phase,
            'response': response,
            'left_target': left_target,
            'right_target': right_target,
            'chosen_target': chosen_target,
            'chosen_stock': chosen_stock,
            'rt': rt,
            'stock1_name': stock1,
            'stock2_name': stock2,
            'correct_num': correct_num
        });

        console.log(stock1, 'stock1', stock2, 'stock2', correct_num, 'correct', response,rt, 'left',left_target, 'chosen', chosen_target, response);
        console.log(current_step);

    /*◢◤◢◤◢◤◢◤ if step one practice phases,just go to next trial after pressing [F/J] key ◢◤◢◤◢◤◢◤*/
        if (phase === "step_one_practice_stock1" || phase === "step_one_practice_stock2") {
            setTimeout(function () {
                remove_stim();
                next();
            }, 1500);
        } else if (phase === "main_trials") {

        /*◢◤◢◤◢◤◢◤ if main trials,go to next trial after pressing [SPACE] bar ◢◤◢◤◢◤◢◤*/
            if (response === "space") {

            /*◢◤◢◤◢◤◢◤ cancel the step 2 "too slow" warning if press [SPACE] bar before the response deadline ◢◤◢◤◢◤◢◤*/
                if (timer_step2) {
                    // cancel existing timer if exist;
                    clearTimeout(timer_step2);
                    warning = false;
                };

                setTimeout(function () {
                    remove_stim();
                    next();
                }, 1500);
            };
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
    timer_break = setInterval(function () {
        console.log('break session');
        d3.select("#pause_instruction").html('<p>You have finished a round of this task.</p><p>You will now take a break for 15 seconds.</p> <p>A 3 - second countdown will signal the start of the next round.</p>');
        timeleft -= 1;
        if (timeleft < 5) {
            //d3.select("#fixation_cross").html("");
            d3.select("#countdown").html(timeleft);
        };

    /*◢◤◢◤◢◤◢◤ 0s left, end break session ◢◤◢◤◢◤◢◤*/
        if (timeleft <= 0) {
            clearInterval(timer_break);
            d3.select("#countdown").html('');
            d3.select("#pause_instruction").html('');

        /*◢◤◢◤◢◤◢◤ prepare next trial ◢◤◢◤◢◤◢◤*/
            load_trial();
        /*◢◤◢◤◢◤◢◤ prepare step 1 "too slow" timer for the trial ◢◤◢◤◢◤◢◤*/
            timer_step1 = setTimeout(function () {
                d3.select('#warning').html('TOO SLOW!');
                warning = true;
                setTimeout(function () {
                    remove_stim();
                    next();
                }, 500);
            }, response_deadline);
        }
    }, 500);


};



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
var calculate_reward = function () {

    

};



/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
 ◢◤                                                                                                                                           ◢◤
 ◢◤                                                   * "Central Executive" *                                                                 ◢◤
 ◢◤                                                                                                                                           ◢◤
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* decide next trial & link to different phases *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var next = function () {
    switch (phase) {
        case "step_two_practice_stock1":
            /*◢◤◢◤◢◤◢◤ go to next phase if finshing all trials for current phase ◢◤◢◤◢◤◢◤*/
            if (trials.length === 0) {
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
            if (trials.length === 0) {
                return psiTurk.doInstructions(step_one_prac_stock1_pages,
                    function () {
                        currentview = new step_one_practice_stock1();
                    }
                );
            } else {
            /*◢◤◢◤◢◤◢◤  begin the phase ◢◤◢◤◢◤◢◤*/
                load_trial();
            }
            break;
        /*◢◤◢◤◢◤◢◤ step_one_practice_stock1 ◢◤◢◤◢◤◢◤*/
        case "step_one_practice_stock1":
            /*◢◤◢◤◢◤◢◤ go to next phase if accuracy is >= 13/16 ◢◤◢◤◢◤◢◤*/
            if (correct_num >= 13 && trials.length === 0) {
                return psiTurk.doInstructions(step_one_prac_stock2_pages,
                    function () {
                        console.log('go to stock2 practice');
                        currentview = new step_one_practice_stock2();
                    });
                /*◢◤◢◤◢◤◢◤  keep doing the same phase if accuracy is <= 13/16◢◤◢◤◢◤◢◤*/
            } else if (correct_num < 13 && trials.length === 0) {
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
            if (correct_num >= 13 && trials.length === 0) {
                return psiTurk.doInstructions(main_trials_pages,
                    function () {
                        console.log('go to main trials');
                        currentview = new main_trials();
                    });
                /*◢◤◢◤◢◤◢◤  keep doing the same phase if accuracy is <= 13/16◢◤◢◤◢◤◢◤*/
            } else if (correct_num < 13 && trials.length === 0) {
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
            if (trials.length === 0) {
                finish();
                /*◢◤◢◤◢◤◢◤ break session @ trial #52 ◢◤◢◤◢◤◢◤*/
            } else if (trial_id === 52) {
                break_session();
            } else {
                /*◢◤◢◤◢◤◢◤  begin the phase ◢◤◢◤◢◤◢◤*/
                load_trial();
                /*◢◤◢◤◢◤◢◤ "too slow" warning for step 1 per trial ◢◤◢◤◢◤◢◤*/
                timer_step1 = setTimeout(function () {
                    d3.select('#warning').html('TOO SLOW!');
                    warning = true;
                    /*◢◤◢◤◢◤◢◤ go to next trial after "too slow" warning ◢◤◢◤◢◤◢◤*/
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


    trials = step_two_practice_stock1_list;
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


    trials = step_two_practice_stock2_list;
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
    trials = balanced_trials(left_right_order, right_left_order, step_one_practice_trial_num);
    //record accuracy; 
    //var correct_num = 0;

    correct_num = 0;
    //record trial id; 
    trial_id = 1;

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
    trials = balanced_trials(left_right_order, right_left_order, step_one_practice_trial_num);

    correct_num = 0;
    trial_id = 1;

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
    //record trial id;
    trial_id = 1;

    var pre_1st_break_trials = balanced_trials(left_right_order, right_left_order, main_tirals_before_1st_break);
    var post_1st_break_trials = balanced_trials(left_right_order, right_left_order, main_tirals_after_1st_break);

    trials = pre_1st_break_trials.concat(post_1st_break_trials);

    console.log(pre_1st_break_trials, post_1st_break_trials, trials);

   
    /*◢◤◢◤◢◤◢◤ prepare the page for practice phase B ◢◤◢◤◢◤◢◤*/
    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');
    // Register the response handler that is defined above to handle any
    // key down events.
    $("body").focus().keydown(response_handler);
    // start the first trial
    next();
};


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
    //psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});

    $("#next").click(function () {
        record_responses();
        currentview = new Questionnaire2();

    });


};


/****************
* Questionnaire 2 *
****************/

var Questionnaire2 = function () {

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

    psiTurk.showPage('postquestionnaire2.html');

	$("#next").click(function () {
	    record_responses();
	    psiTurk.saveData({
            success: function(){
                psiTurk.computeBonus('compute_bonus', function() { 
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                }); 
            }, 
            error: prompt_resubmit});
	});

};




// Task object to keep track of the current phase
var currentview;


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
 * Run Task *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
////test step_two_practice
//$(window).load(function () {
//    psiTurk.doInstructions(
//        step_two_prac_stock1_pages, // a list of pages you want to display in sequence

//        function () { currentview = new step_two_practice_stock1(); } // what you want to do when you are done with instructions
//    );
//});

//////test step_one_practice_stock1
//$(window).load( function(){
//    psiTurk.doInstructions(
//        step_one_prac_stock1_pages, // a list of pages you want to display in sequence

//        function () { currentview = new step_one_practice_stock1(); } // what you want to do when you are done with instructions
//    );
//});

////test step_one_practice_stock2
//$(window).load(function () {
//    psiTurk.doInstructions(
//        step_one_prac_stock2_pages, // a list of pages you want to display in sequence

//        function () { currentview = new step_one_practice_stock2(); } // what you want to do when you are done with instructions
//    );
//});



//$(window).load(function () {
//    psiTurk.doInstructions(
//        testing_instruction_pages, // a list of pages you want to display in sequence
//        function () { currentview = new Questionnaire1(); } // what you want to do when you are done with instructions
//    );
//});



///***for testing only.
// * If you want to skip the training phase and test how the testing phase works, comment out the lines above and uncomment the lines below
// ***/
$(window).load(function () {
    psiTurk.doInstructions(
        main_trials_pages, // a list of pages you want to display in sequence
        function () { currentview = new main_trials(); } // what you want to do when you are done with instructions
    );
});
