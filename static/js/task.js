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
    "instructions/ansInstruct-ready.html"
];

psiTurk.preloadPages(pages);

var training_instruction_pages = [ // add as a list as many pages as you like

	"instructions/instruct-ready.html"
];


var testing_instruction_pages = [// add as a list as many pages as you like
   
    "instructions/ansInstruct-ready.html"
];


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* relationship between agents & stocks *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

var rela_dict = {
    "stock1": ["agent1", "agent3"],
    "stock2": ["agent2", "agent4"]
};


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* decide which stock should be stock1/stock2 in a randomized way *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
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


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* variables *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var stimFolder = "/static/images/";
var left_target, right_target;
var stock1_img, stock2_img;
var stock1, stock2;


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* prepare stimuli on the right & on the left (in a balanced way) *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
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
//var left_right_order = [
//    [["stock1.jpg", "1.jpg", "stock1", "agent1", "stock2.jpg", "2.jpg", "stock2", "agent2"]],
//    [["stock1.jpg", "1.jpg", "stock1", "agent1", "stock2.jpg", "4.jpg", "stock2", "agent4"]],
//    [["stock1.jpg", "3.jpg", "stock1", "agent3", "stock2.jpg", "2.jpg", "stock2", "agent2"]],
//    [["stock1.jpg", "3.jpg", "stock1", "agent3", "stock2.jpg", "4.jpg", "stock2", "agent4"]]
//];

//var right_left_order = [
//    [["stock2.jpg", "2.jpg", "stock2", "agent2", "stock1.jpg", "1.jpg", "stock1", "agent1"]],
//    [["stock2.jpg", "4.jpg", "stock2", "agent4", "stock1.jpg", "1.jpg", "stock1", "agent1"]],
//    [["stock2.jpg", "2.jpg", "stock2", "agent2", "stock1.jpg", "3.jpg", "stock1", "agent3"]],
//    [["stock2.jpg", "4.jpg", "stock2", "agent4", "stock1.jpg", "3.jpg", "stock1", "agent3"]]
//];


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* prepare balanced trials for practice phase B and main trials*
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var balanced_trials = function (left_side, right_side,  trial_num) {
    var trial_container_1 = [];
    var trial_container_2 = [];
    var trial_container_3 = [];
    var trial_container = [];
    // put all trials (containing stimuli information) into arrays based on desired number of trials
    for (var x = 0; x < trial_num / 2; x++) {
        trial_container_1 = trial_container_1.concat(left_side[x%(trial_num/4)]);
    };
    for (var y = 0; y < trial_num / 2; y++) {
        trial_container_2 = trial_container_2.concat(right_side[x%(trial_num/4)]);
    };
    //shuffle everything 
    trial_container_3 = _.shuffle([].concat(trial_container_1).concat(trial_container_2));
    trial_container = _.shuffle(trial_container.concat(trial_container_3));

    console.log(trial_container, 'preview all trials');
    return trial_container;

};


///*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
//* two step function would be used in practice phase B and main trials*
//◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
//var two_step_task = function (trials) {

//    var current_trial = trials.shift();
//    console.log(trials, 'trials');
//    console.log(current_trial, 'current');

//    stim1 = current_trial[1];
//    stim2 = current_trial[5];


//    stim1_name = current_trial[3];
//    stim2_name = current_trial[7];

//    show_stim(stim1, stim2);
//    console.log(stim1);
//}

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* PRACTICE STEP TWO*
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var step_two_practice = function () {
    /*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤variable list ◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
    var stim_on, // time stimulus is presented
        listening = false;
    var stimFolder = "/static/images/"

    var trial_id = 1;
    var step_type = 'step_two';
    var stock_value;
    var stock_name;

    //load stock image and values 
    var stock1 = [[stock1_img, "+8", stock1], [stock1_img, "+9", stock1], [stock1_img, "+7", stock1],
        [stock1_img, "+5", stock1], [stock1_img, "+3", stock1]];
    var stock2 = [[stock2_img, "+1", stock2], [stock2_img, "+0", stock2], [stock2_img, "+2", stock2],
        [stock2_img, "+5", stock1], [stock2_img, "+6", stock2]];
    //shffle the order of the stocks
    //var trials = _.shuffle([].concat(stock1).concat(stock2));

    //put stock 1 & stock 2 together
    var trials = [].concat(stock1).concat(stock2);

    var next = function () {
        
        /*◢◤◢◤◢◤◢◤ record trial id ◢◤◢◤◢◤◢◤*/
        trial_id++;
        /*◢◤◢◤◢◤◢◤ advance to practice phase b after finishing phase a ◢◤◢◤◢◤◢◤*/
        if (trials.length === 0) {
            return psiTurk.doInstructions(testing_instruction_pages,
                function () {
                    currentview = new step_one_practice_stock1();
                }
            );
        } else {
            /*◢◤◢◤◢◤◢◤ load practice phase a  ◢◤◢◤◢◤◢◤*/
            //load stock 1 & 2 (image and value)
            current_stim = trials.shift();

            show_stim(current_stim[0]);
            stim_on = new Date().getTime();
            listening = true;
            stock_value = current_stim[1];
            stock_name = current_stim[2];
        }
    }

/*◢◤◢◤◢◤◢◤ load image ◢◤◢◤◢◤◢◤*/
    var show_stim = function (image) {
        d3.select("#stim")
            .append("img")
            .attr("src", stimFolder + image)
            .attr("id", 'pic')
            .style("width", "300px")
            .style("height", "300px")
            .style("border", "initial");
    };

    //record subject's response
    var response_handler = function (e) {
        if (!listening) return;

        var keyCode = e.keyCode,
            response;

        switch (keyCode) {
            case 32:
                // "SPACE"
                response = "space";
                break;
            default:
                response = "";
                break;
        }
        if (response.length > 0) {
            // add yellow soild box
            document.getElementById('stim').style.border = "5px solid yellow";
            setTimeout(function () {
                d3.select('#stock_value').html(stock_value);
            }, 500);

            listening = false;
            var hit = response == stim[1];
            var rt = new Date().getTime() - stim_on;
            psiTurk.recordTrialData({
                'phase': "step_two_practice",
                'step_type': step_type,
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
    };

/*◢◤◢◤◢◤◢◤ remove stimuli after subject finishes one trial ◢◤◢◤◢◤◢◤*/
    var remove_stim = function () {
        //remove the previous images;
        //borders of each image go back to initial state;
        d3.select("#pic").remove();
        document.getElementById('stim').style.border = "initial";
        //remove stock value;
        d3.select('#stock_value').html('');
    }


/*◢◤◢◤◢◤◢◤ prepare the page for practice phase A ◢◤◢◤◢◤◢◤*/
    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');

    // Register the response handler that is defined above to handle any
    // key down events. 
    $("body").focus().keydown(response_handler);

    // Start practice phase A
    next();
};

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* show_stim & remove_stim functions that will be used in PRACTICE STEP ONE *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
/*◢◤◢◤◢◤◢◤ * display two stimuli * ◢◤◢◤◢◤◢◤*/
var show_stim = function (image1, image2) {
    //load image1 (on the left)
    d3.select("#stim1")
        .append("img")
        .attr("src", stimFolder + image1)
        .attr("id", 'pic1')
        .style("width", "300px")
        .style("height", "300px")
        .style("border", "initial");
    //load image1 (on the right)
    d3.select("#stim2")
        .append("img") // append image
        .attr("src", stimFolder + image2)
        .attr("id", 'pic2')
        .style("width", "300px")
        .style("height", "300px")
        .style("border", "initial");
};
/*◢◤◢◤◢◤◢◤ * remove two stimuli * ◢◤◢◤◢◤◢◤*/
var remove_stim = function () {
    //remove the previous images;
    d3.select("#pic1").remove();
    d3.select("#pic2").remove();
    d3.select("#pic").remove();
    //set the border of each image to initial state; 
    document.getElementById('stim1').style.border = "initial";
    document.getElementById('stim2').style.border = "initial";

    //opacity of each stimulus (0: transparent; 1: solid);
    document.getElementById('stim1').style.opacity = 1;
    document.getElementById('stim2').style.opacity = 1;
};


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* PRACTICE STEP ONE - STOCK 1 *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var step_one_practice_stock1 = function () {

    console.log(decider, 'decider', stock1, stock2);
    //record accuracy;
    var correct_num = 0;
    //record trial id; 
    var trial_id = 0;

    var stim1, stim2, stim1_name, stim2_name;
    //var stock1_img_practice, stock2_img_practice, stock1_name, stock2_name;

    //load trial information (image, variable name, etc)
    var trials = balanced_trials(left_right_order, right_left_order, 16)
    console.log(trials,'preview all trials (shuffled)');

/*◢◤◢◤◢◤◢◤ load elemments per trial ◢◤◢◤◢◤◢◤*/
    var next = function () {
        /*◢◤◢◤◢◤◢◤ record trial id ◢◤◢◤◢◤◢◤*/
        trial_id++;
        /*◢◤◢◤◢◤◢◤ go to main trials if getting 13 + judgements correct ◢◤◢◤◢◤◢◤*/
        if (correct_num >= 13 && trials.length === 0) {
            return psiTurk.doInstructions(testing_instruction_pages,
                function () {
                    currentview = new step_one_practice_stock2();
                }
            );

            /*◢◤◢◤◢◤◢◤ keep doing practice phase B if accuracy is below 13/16 ◢◤◢◤◢◤◢◤*/
        } else if (correct_num < 13 && trials.length === 0) {
            return psiTurk.doInstructions(testing_instruction_pages,
                function () {
                    //trial_id = 0;
                    currentview = new step_one_practice_stock1();
                    //currentview = new step_two_practice();
                }
            );

        } else {
            /*◢◤◢◤◢◤◢◤ start practice ◢◤◢◤◢◤◢◤*/
            stim_on = new Date().getTime();
            listening = true;
            var current_trial = trials.shift();

            //for debug purpose; 
            //console.log(trials, 'trials', trial_id);
            console.log(current_trial, 'current', trial_id);

            stim1 = current_trial[1];
            stim2 = current_trial[5];
            stim1_name = current_trial[3];
            stim2_name = current_trial[7];

            show_stim(stim1, stim2);
        };
    };

/*◢◤◢◤◢◤◢◤ record response ◢◤◢◤◢◤◢◤*/
    var response_handler = function (e) {
        if (!listening) return;

        var keyCode = e.keyCode,
            response;
        switch (keyCode) {
            // press [F]
            case 74:
                //target on the left
                response = stim2_name;
                document.getElementById('stim2').style.border = "5px solid yellow";
                document.getElementById('stim1').style.opacity = 0;
                response_received = true;
                break;
            // press [J]  
            case 70:
                //target on the RIGHT 
                response = stim1_name;
                document.getElementById('stim1').style.border = "5px solid yellow";
                document.getElementById('stim2').style.opacity = 0;
                response_received = true;
                break;
            //if do not press anything
            default:
                response = "";
                break;

        }
        if (response.length > 0) {
            // add yellow soild box
            setTimeout(function () {
                //d3.select('#stock_value').html(stock_value);
            }, 500);

            if (response === "agent1" || response === "agent3") {
                d3.select("#stim")
                    .append("img")
                    .attr("src", stimFolder + stock1_img)
                    .attr("id", 'pic')
                    .style("width", "300px")
                    .style("height", "300px");
                correct_num++;
            }
            else if (response === "agent2" || response === "agent4") {
                d3.select("#stim")
                    .append("img")
                    .attr("src", stimFolder + stock2_img)
                    .attr("id", 'pic')
                    .style("width", "300px")
                    .style("height", "300px");
            }


            listening = false;
            var hit = response;
            var rt = new Date().getTime() - stim_on;
            psiTurk.recordTrialData({
                'phase': "practice_b",
                'response': response,
                'hit': hit,
                'rt': rt,
                'stock1_name': stock1,
                'stock2_name': stock2,
                'correct_num': correct_num

            });

            console.log(stock1,'stock1', stock2, 'stock2',correct_num, 'correct', response);

            setTimeout(function () {
                remove_stim();
                next();
            }, 1500);
        }
    };
/*◢◤◢◤◢◤◢◤ prepare the page for practice phase B ◢◤◢◤◢◤◢◤*/
    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');
    // Register the response handler that is defined above to handle any
    // key down events.
    $("body").focus().keydown(response_handler);
    // start the first trial
    next();
};


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* PRACTICE STEP ONE *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var step_one_practice_stock2 = function () {
    //record accuracy; 
    var correct_num = 0;
    //record trial id; 
    var trial_id = 0;

    var stim1, stim2, stim1_name, stim2_name;
    var stock1_name, stock2_name;

    //load trial information (image, variable name, etc)
    var trials = balanced_trials(left_right_order, right_left_order, 16)
    console.log(trials, 'preview all trials (shuffled)');

    /*◢◤◢◤◢◤◢◤ load elemments per trial ◢◤◢◤◢◤◢◤*/
    var next = function () {
        /*◢◤◢◤◢◤◢◤ record trial id ◢◤◢◤◢◤◢◤*/
        trial_id++;
        /*◢◤◢◤◢◤◢◤ go to main trials if getting 13 + judgements correct ◢◤◢◤◢◤◢◤*/
        if (correct_num >= 13 && trials.length === 0) {
            return psiTurk.doInstructions(testing_instruction_pages,
                function () {
                    currentview = new main_trials();
                }
            );

            /*◢◤◢◤◢◤◢◤ keep doing practice phase B if accuracy is below 13/16 ◢◤◢◤◢◤◢◤*/
        } else if (correct_num < 13 && trials.length === 0) {
            return psiTurk.doInstructions(testing_instruction_pages,
                function () {
                    currentview = new step_one_practice_stock2();
                }
            );

        } else {
            /*◢◤◢◤◢◤◢◤ start practice ◢◤◢◤◢◤◢◤*/
            stim_on = new Date().getTime();
            listening = true;
            var current_trial = trials.shift();

            //for debug purpose; 
            //console.log(trials, 'trials', trial_id);
            console.log(current_trial, 'current', trial_id);

            stim1 = current_trial[1];
            stim2 = current_trial[5];
            stim1_name = current_trial[3];
            stim2_name = current_trial[7];

            //stock1_img_practice = current_trial[0];
            //stock2_img_practice = current_trial[4];

            //stock1_name = current_trial[2];
            //stock2_name = current_trial[6];

            show_stim(stim1, stim2);
            //two_step_task(trials);
        };
    };

    /*◢◤◢◤◢◤◢◤ record response ◢◤◢◤◢◤◢◤*/
    var response_handler = function (e) {
        if (!listening) return;

        var keyCode = e.keyCode,
            response;
        switch (keyCode) {
            // press [F]
            case 74:
                //target on the left
                response = stim2_name;
                document.getElementById('stim2').style.border = "5px solid yellow";
                document.getElementById('stim1').style.opacity = 0;
                response_received = true;
                break;

            // press [J] 
            case 70:
                //target on the RIGHT 
                response = stim1_name;
                document.getElementById('stim1').style.border = "5px solid yellow";
                document.getElementById('stim2').style.opacity = 0;
                response_received = true;
                break;

            default:
                response = "";
                break;
        }
        if (response.length > 0) {
            // add yellow soild box
            setTimeout(function () {

                if (response === "agent1" || response === "agent3") {
                    d3.select("#stim")
                        .append("img")
                        .attr("src", stimFolder + stock1_img)
                        .attr("id", 'pic')
                        .style("width", "300px")
                        .style("height", "300px");
                    correct_num++;
                }
                else if (response === "agent2" || response === "agent4") {
                    d3.select("#stim")
                        .append("img")
                        .attr("src", stimFolder + stock2_img)
                        .attr("id", 'pic')
                        .style("width", "300px")
                        .style("height", "300px");
                }

            }, 500);



            listening = false;
            var hit = response == stim[1];
            var rt = new Date().getTime() - stim_on;
            psiTurk.recordTrialData({
                'phase': "practice_b",
                'response': response,
                'hit': hit,
                'rt': rt,
                'stock1_name': stock1_name,
                'stock2_name': stock2_name,
                'correct_num': correct_num

            });

            console.log(correct_num, 'correct');

            setTimeout(function () {
                remove_stim();
                next();
            }, 1500);
        }
    };
    /*◢◤◢◤◢◤◢◤ prepare the page for practice phase B ◢◤◢◤◢◤◢◤*/
    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');
    // Register the response handler that is defined above to handle any
    // key down events.
    $("body").focus().keydown(response_handler);
    // start the first trial
    next();
};




/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* Main Trials *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var main_trials = function(){

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

/*******************
 * Run Task
 ******************/
//test step_two_practice
$(window).load(function () {
    psiTurk.doInstructions(
        training_instruction_pages, // a list of pages you want to display in sequence

        function () { currentview = new step_two_practice(); } // what you want to do when you are done with instructions
    );
});

////test step_one_practice_stock1
//$(window).load( function(){
//    psiTurk.doInstructions(
//        training_instruction_pages, // a list of pages you want to display in sequence

//        function () { currentview = new step_one_practice_stock1(); } // what you want to do when you are done with instructions
//    );
//});


//$(window).load(function () {
//    psiTurk.doInstructions(
//        testing_instruction_pages, // a list of pages you want to display in sequence
//        function () { currentview = new Questionnaire1(); } // what you want to do when you are done with instructions
//    );
//});



/***for testing only.
 * If you want to skip the training phase and test how the testing phase works, comment out the lines above and uncomment the lines below
 ***/
//$(window).load(function () {
//    psiTurk.doInstructions(
//        testing_instruction_pages, // a list of pages you want to display in sequence
//        function () { currentview = new testing_phase(); } // what you want to do when you are done with instructions
//    );
//});