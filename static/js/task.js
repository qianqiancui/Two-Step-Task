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
        "postquestionnaire1.html"
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
* relationship between agents & stocks (for reference) *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var rela_dict = {
    "stock1": ["agent1", "agent3"],
    "stock2": ["agent2", "agent4"]
};


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* decide which stock should be stock1/stock2 randomly *
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
var stim1, stim2, stim1_name, stim2_name;
var response_deadline = 3000;
var warning = false;
var listening = false;
var correct_num;
var stim_on; // time stimulus is presented
var current_step;
var phase, trials, current_trial;
var trial_id;
var timer_step1, timer_step2, timer_break;
/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
 * ◢◤◢◤◢◤◢◤◢◤◢◤◢◤
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


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* prepare balanced trials for  STEP ONE TASKS (practice & main trials)
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
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
    /*◢◤◢◤◢◤◢◤ trial interval: 500ms  ◢◤◢◤◢◤◢◤*/
        setTimeout(function () {
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
            };
        }, 500);
    };

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
            var hit = response;
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
* show_stim & remove_stim functions that will be used in STEP ONE TASKS (practice & main trials) *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
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

    document.getElementById('stim1').style.border = "initial";
    document.getElementById('stim2').style.border = "initial";

    document.getElementById('stim1').style.top = "40%";
    document.getElementById('stim2').style.top = "40%";

    document.getElementById('stim1').style.left = "20%";
    document.getElementById('stim2').style.left = "80%";

    document.getElementById('stim1').style.width = "";
    document.getElementById('stim1').style.height = "";
    document.getElementById('stim2').style.width = "";
    document.getElementById('stim2').style.height= "";

    //opacity of each stimulus (0: transparent; 1: solid);
    document.getElementById('stim1').style.opacity = 1;
    document.getElementById('stim2').style.opacity = 1;

    d3.select('#warning').html('');
};

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* load necessary information for a single trial *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var load_trial = function () {
    /*◢◤◢◤◢◤◢◤ trial interval: 500ms  ◢◤◢◤◢◤◢◤*/
    setTimeout(function () {
        /*◢◤◢◤◢◤◢◤ record trial id ◢◤◢◤◢◤◢◤*/

        /*◢◤◢◤◢◤◢◤ start practice ◢◤◢◤◢◤◢◤*/
        stim_on = new Date().getTime();
        listening = true;
        console.log("trial id", trial_id);

        current_trial = trials.shift();
        //console.log('shift', current_trial);

        //for debug purpose; 
        //console.log(trials, 'trials', trial_id);
        //console.log(current_trial, 'current', trial_id);

        stim1 = current_trial[1];
        stim2 = current_trial[5];
        stim1_name = current_trial[3];
        stim2_name = current_trial[7];
        show_stim(stim1, stim2);

        trial_id++;
        current_step = "one";

    }, 500);
};

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* record response *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var response_handler = function (e) {
    if (!listening) return;

    var keyCode = e.keyCode,
        response;
    switch (keyCode) {
        /*◢◤◢◤◢◤◢◤ press [F]; target on the left ◢◤◢◤◢◤◢◤*/
        case 74:
            if (current_step === "one") {
                response = stim2_name;
                document.getElementById('stim2').style.border = "5px solid yellow";

                /*◢◤◢◤◢◤◢◤ JQuery move image ◢◤◢◤◢◤◢◤*/
                //$("#stim2").animate({ top: '-=20%', left: '-=25.5%', width: '-=11%', height: '-=15%' }, 300);
                $("#stim2").animate({ top: '-=20%', left: '-=24.6%', width: '-=11%', height: '-=15%' }, 300);

                document.getElementById('stim1').style.opacity = 0;
                response_received = true;
            }
            break;
        /*◢◤◢◤◢◤◢◤ press [J]; target on the RIGHT ◢◤◢◤◢◤◢◤*/
        case 70:
            if (current_step === "one") {
                response = stim1_name;
                document.getElementById('stim1').style.border = "5px solid yellow";
                /*◢◤◢◤◢◤◢◤ JQuery move image ◢◤◢◤◢◤◢◤*/
                //$("#stim1").animate({ top: '-=20%', left: '+=25.5%', width: '-=11%', height: '-=15%' }, 300);

                $("#stim1").animate({ top: '-=20%', left: '+=24.6%', width: '-=11%', height: '-=15%' }, 300);
                document.getElementById('stim2').style.opacity = 0;
                response_received = true;
            }
            break;
        //if do not press anything
        case 32:
            if (current_step === "two") {
                response = "space";
                response_step2 = "space";
                document.getElementById('stim').style.border = "5px solid yellow";
            }
                break;
        default:
            response = "";
            break;

    }
    if (response.length > 0) {


        if (timer_step1) {
            // cancel existing timer if exist;
            clearTimeout(timer_step1);
            warning = false;
        };
        if (phase === "main_trials"){
            timer_step2 = setTimeout(function () {
                d3.select('#warning').html('TOO SLOW!');
                warning = true;
                setTimeout(function () {
                    remove_stim();
                    next();
                }, 500);
            }, response_deadline);
        };

        //setTimeout(function () {
        //    //d3.select('#stock_value').html(stock_value);
        //}, 500);
        current_step = "two";

        if (response === "agent1" || response === "agent3") {
            setTimeout(function () {
               d3.select("#stim")
                    .append("img")
                    .attr("src", stimFolder + stock1_img)
                    .attr("id", 'pic')
                    .style("width", "300px")
                    .style("height", "300px");
            }, 500);


            if (phase === "step_one_practice_stock1") {
                correct_num++;
            }
        } else if (response === "agent2" || response === "agent4") {
            setTimeout(function () {
                d3.select("#stim")
                    .append("img")
                    .attr("src", stimFolder + stock2_img)
                    .attr("id", 'pic')
                    .style("width", "300px")
                    .style("height", "300px");
            }, 500);

            if (phase === "step_one_practice_stock2") {
                correct_num++;
            };
        };

        listening = false;
        var hit = response;
        var rt = new Date().getTime() - stim_on;
        psiTurk.recordTrialData({
            'phase': "step_one_practice",
            'response': response,
            'hit': hit,
            'rt': rt,
            'sto_step2ck1_name': stock1,
            'stock2_name': stock2,
            'correct_num': correct_num
        });

        console.log(stock1, 'stock1', stock2, 'stock2', correct_num, 'correct', response, current_step);



        if (phase === "step_one_practice_stock1" || phase === "step_one_practice_stock2") {
            setTimeout(function () {
                remove_stim();
                next();
            }, 1500);
        } else if (phase === "main_trials") {
            if (response === "space") {
               
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


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* Trial Structure *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var next = function () {
    switch (phase) {
    /*◢◤◢◤◢◤◢◤ step_one_practice_stock1 ◢◤◢◤◢◤◢◤*/
         case "step_one_practice_stock1":
             /*◢◤◢◤◢◤◢◤ go to main trials if getting 13 + judgements correct ◢◤◢◤◢◤◢◤*/
            if (correct_num >= 13 && trials.length === 0) {
                return psiTurk.doInstructions(testing_instruction_pages,
                    function () {
                         console.log('go to stock2 practice');
                         currentview = new step_one_practice_stock2();
                     });
             } else if (correct_num < 13 && trials.length === 0) {
                 return psiTurk.doInstructions(testing_instruction_pages,
                     function () {
                         console.log('keep doing stock1 practice');
                         currentview = new step_one_practice_stock1();
                     });
             } else {
                 load_trial();
             };
             break;
    /*◢◤◢◤◢◤◢◤ step_one_practice_stock2 ◢◤◢◤◢◤◢◤*/
        case "step_one_practice_stock2":
            if (correct_num >= 13 && trials.length === 0) {
                return psiTurk.doInstructions(testing_instruction_pages,
                    function () {
                        console.log('go to main trials');
                        currentview = new main_trials();
                    });
            } else if (correct_num < 13 && trials.length === 0) {
                return psiTurk.doInstructions(testing_instruction_pages,
                    function () {
                        console.log('keep doing stock2 practice');
                        currentview = new step_one_practice_stock2();
                    });
            } else {
                load_trial();
            };
            break;
    /*◢◤◢◤◢◤◢◤ main_trials ◢◤◢◤◢◤◢◤*/
        case "main_trials":
            if (trials.length === 151) {
                finish();
            } else if (trial_id === 52) {
                break_session();
            } else {
                load_trial();
            /*◢◤◢◤◢◤◢◤ "too slow" warning for step 1 per trial ◢◤◢◤◢◤◢◤*/
                timer_step1 = setTimeout(function () {
                    d3.select('#warning').html('TOO SLOW!');
                    warning = true;

                    setTimeout(function () {
                        remove_stim();
                        next();
                    }, 500);
                }, response_deadline);

            };
            break;
    };
};

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* break session  *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var break_session = function () {
    var timeleft = 15;
    /*◢◤◢◤◢◤◢◤ break sessions  ◢◤◢◤◢◤◢◤*/
    timer_break = setInterval(function () {
        console.log('break session');
        d3.select("#pause_instruction").html('<p>You have finished a round of this task.</p><p>You will now take a break for 15 seconds.</p> <p>A 3 - second countdown will signal the start of the next round.</p>');
        timeleft -= 1;
        if (timeleft < 5) {
            //d3.select("#fixation_cross").html("");
            d3.select("#countdown").html(timeleft);
        };
        if (timeleft <= 0) {
            clearInterval(timer_break);
            d3.select("#countdown").html('');
            d3.select("#pause_instruction").html('');
            load_trial();

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

/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* PRACTICE STEP ONE - STOCK 1 *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var step_one_practice_stock1 = function () {
    phase = "step_one_practice_stock1";
    trials = balanced_trials(left_right_order, right_left_order, 16);
    //record accuracy; 
    //var correct_num = 0;

    correct_num = 0;
    //record trial id; 
    trial_id = 1;
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
* PRACTICE STEP ONE - STOCK 2 *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var step_one_practice_stock2 = function () {

    phase = "step_one_practice_stock2";
    trials = balanced_trials(left_right_order, right_left_order, 16);

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



/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* Main Trials *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/

var main_trials = function () {
    phase = "main_trials";
    //record trial id; 
    var pre_1st_break_trials = balanced_trials(left_right_order, right_left_order, 52);
    var post_1st_break_trials = balanced_trials(left_right_order, right_left_order, 104);

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


/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* Finish all the trials *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
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
//        training_instruction_pages, // a list of pages you want to display in sequence

//        function () { currentview = new step_two_practice(); } // what you want to do when you are done with instructions
//    );
//});

//////test step_one_practice_stock1
//$(window).load( function(){
//    psiTurk.doInstructions(
//        training_instruction_pages, // a list of pages you want to display in sequence

//        function () { currentview = new step_one_practice_stock1(); } // what you want to do when you are done with instructions
//    );
//});

////test step_one_practice_stock2
//$(window).load(function () {
//    psiTurk.doInstructions(
//        training_instruction_pages, // a list of pages you want to display in sequence

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
//// ***/
//$(window).load(function () {
//    psiTurk.doInstructions(
//        testing_instruction_pages, // a list of pages you want to display in sequence
//        function () { currentview = new main_trials(); } // what you want to do when you are done with instructions
//    );
//});
