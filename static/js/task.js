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
* PRACTICE PHASE A *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var practice_phase_a = function () {
    /*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤variable list ◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
    var stim_on, // time stimulus is presented
        listening = false;
    var stimFolder = "/static/images/"

    var trial_id = 1;
    var step_type = 'step_two';
    var stock_value;
    var stock_name;

    var stock1 = [["stock1.jpg", 8, "stock1"], ["stock1.jpg", 9, "stock1"], ["stock1.jpg", 7, "stock1"],
    ["stock1.jpg", 5, "stock1"], ["stock1.jpg", 3, "stock1"]];
    var stock2 = [["stock2.jpg", 1, "stock2"], ["stock2.jpg", 0, "stock2"], ["stock2.jpg", 2, "stock2"],
    ["stock2.jpg", 5, "stock1"], ["stock2.jpg", 6, "stock2"]];
    //var trials = _.shuffle([].concat(stock1).concat(stock2));

    //stock 1 & stock 2 together
    var trials = [].concat(stock1).concat(stock2);

    var next = function () {
        
        /*◢◤◢◤◢◤◢◤ ◢◤◢◤◢◤◢◤*/
        trial_id++;
        /*◢◤◢◤◢◤◢◤ advance to practice phase b after finishing phase a ◢◤◢◤◢◤◢◤*/
        if (trials.length === 0) {
            return psiTurk.doInstructions(testing_instruction_pages,
                function () {
                    currentview = new practice_phase_b();
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
            console.log(response);
            // add yellow soild box
            document.getElementById('stim').style.border = "5px solid yellow";
            d3.select('#stock_value').html(stock_value);
            listening = false;
            var hit = response == stim[1];
            var rt = new Date().getTime() - stim_on;
            psiTurk.recordTrialData({
                'phase': "practice_a",
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


    var remove_stim = function () {
        //remove the previous images;
        //set the border of each image to initial state;

        d3.select("#pic").remove();
        document.getElementById('stim').style.border = "initial";
        d3.select('#stock_value').html('');
    }

    // Load the stage.html snippet into the body of the page
    psiTurk.showPage('stage.html');

    // Register the response handler that is defined above to handle any
    // key down events.
    $("body").focus().keydown(response_handler);

    // Start the test
    next();
};

    
/*◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤
* PRACTICE PHASE B *
◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤*/
var practice_phase_b = function () {

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
$(window).load( function(){
    psiTurk.doInstructions(
        training_instruction_pages, // a list of pages you want to display in sequence

        function () { currentview = new practice_phase_a(); } // what you want to do when you are done with instructions
    );
});


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