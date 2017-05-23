var currentLink = '';


var manager = (function(){
	var numberOptions = 3;
	var activePrepositions = ['to','from','in','at','by','on'];
	
	var toggleActivePrepositions = function(preposition){
			if (activePrepositions.indexOf(preposition) === -1){
				activePrepositions.push(preposition);
			}
			else if (activePrepositions.indexOf(preposition) !== -1){
				if (activePrepositions.length === 2){
					return;
				}
				else{
					activePrepositions = activePrepositions.filter(function(e){
						return e !== preposition;
					});
					if (numberOptions === activePrepositions.length){
						numberOptions--;
					}
				}
			}
		};
		
	var getActivePrepositions = function(){
			return activePrepositions;
		};
		
	var increaseOptions = function(){
			if (numberOptions < activePrepositions.length - 1){
				numberOptions++;
				return true;
			}
			else {
				return false;
			}
		};
		
	var decreaseOptions = function(){
			if (numberOptions > 1){
				numberOptions--;
				return true;
			}
			else{
				return false;
			}
		};
	var changeNumberOptions = function(instruction){
		if (instruction === 'increase'){
			return increaseOptions();
		}
		else if (instruction === 'decrease'){
			return decreaseOptions();
		}
	};
	
	var getNumberOptions = function(){
		return numberOptions;
	};
		
	var output =	{	toggleActivePrepositions: toggleActivePrepositions,
						getActivePrepositions : getActivePrepositions,
						increaseOptions : increaseOptions,
						changeNumberOptions : changeNumberOptions,
						getNumberOptions : getNumberOptions						
					};
	
	return output;
}());


/*************/
var getNewSentence = function(){};
var getActivePrepositions = function(){};//these preferences could be stored on the server side for better persistence.  So maybe don't need this function here?  Or set a flag--if the preferences are changed, then get the new preferences and update them on the server side.  If not updated, then just request a new sentence from server, which will deliver a sentence with reference to the stored preferences
//server side functions will return a sentence that includes one or more of the active prepositions, and which hasn't been shown lately

var formatNewSentence = function(){};
var populateModal = function(){};
var randomizePrepositions = function(){};

var updateSelectedPreposition = function(){};
var correctSentence = function(){};



/**************/




var buttonAction = function(){
	$('#getSentence').on('click', function(){
		//console.log('clicking...');
		$.ajax({
			method: 'POST',
			error:function(err){
				console.log(err);
			},
			success:function(data){
				$('.sentence_container').html(data.text + ' ' + data.iteration);
			}
		});
	});
};

var getNewSentence = function(){
	$.ajax({
		method: 'POST',
		error:function(err){
			console.log(err);
			return '';
		},
		success:function(data){
			return data;
		}
	});
};

var shuffleArray = function(array){
	
  var currentIndex = array.length,
		temporaryValue,
		randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  
  return array;
};

var setModals = function(){
	$(".modal-wide").on("show.bs.modal", function() {
		var height = $(window).height() - 200;
		$(this).find(".modal-body").css("max-height", height);
	});
};


var setPrepositionButtons = function(){
	var btns = $("#btnsPrepositions").children(".btn");
	btns.each(function(i, e){
		var p = $(e).html(),
			f = function(func, arg){
				return (function(){
					func(arg);
				});
			};
		$(e).on('click', f(manager.toggleActivePrepositions,p));		
	});
};

var setOptionButtons = function(){
	var btns = $("#btnsNumberOptions").children(".btn");
	btns.each(function(i, e){
		var p = $(e).attr('name'),
			f = function(func, arg){
				return (function(){
					func(arg);
				});
			};
		$(e).on('click', f(manager.changeNumberOptions,p));		
	});
};

var getRandomPrepositions = function(currentPreposition, numberNeeded){
	var arr = manager.getActivePrepositions(),
		i,
		result = [];
		
	arr = shuffleArray(arr);
	
	for (i = 0; i < numberNeeded; i++){
		if (arr[i] === currentPreposition){
			numberNeeded++;
			continue;
		}
		result.push(arr[i]);
	}
	return result;
};

var prepositionButtonAction = function(link){
	return (function(){
		var buttonName = $(this).html();
		var linkName = link.html();
		link.html(buttonName);
		$(this).html(linkName);
	});
};

var linkAction = function(){
	var i,
		m = $('#optionsButtons'),
		action,
		prepositions;
	
	currentLink = $(this);
	currentLinkId = currentLink.attr('id');
	//console.log('current link html: ' + currentLink.html());
	m.children().remove();
	prepositions = getRandomPrepositions(currentLink.html(), manager.getNumberOptions());
	
	for (i = 0; i < manager.getNumberOptions(); i++){
		action = prepositionButtonAction(currentLink);
		m.append($('<button>').attr({'class':'btn btn-default','type':'button','data-toggle':'modal','data-target':'#optionsModal'}).html(prepositions[i]).on('click', action));	
	}
};

$(document).ready(function(){
	setModals();
	setPrepositionButtons();
	setOptionButtons();
	//buttonAction();
	$('#openModalLink').on('click', linkAction);

});