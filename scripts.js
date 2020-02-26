;(function($){
	//CacheDOM
	var $el = $('#sub-addition')
	var template = $el.html()

	//bindEvents
	$el.delegate('button','click',op)

	render()

	function op(event){
		$currentEl = $(event.target)
		name = $el.find('input')[0].value
		operation = $currentEl.html().toLowerCase()
		events.trigger("sub_" + operation,name)
		render()
	}

	function render(){
		$el.find('input').val('')
	}

})(jQuery);


(function(){
	//CacheDOM
	var $el = $('#pub-addition')
	var template = $el.html()

	//bindEvents
	$el.delegate('button','click',op)

	render()

	function op(event){
		$currentEl = $(event.target)
		name = $el.find('input')[0].value
		operation = $currentEl.html().toLowerCase()
		events.trigger("pub_" + operation,name)
		render()
	}

	function render(){
		$el.find('input').val('')
	}
})();


var Subscriber = (function(){

	var subscribers = [];

	var $el = $('#subscriber-list')
	var template = $el.html()

	//bindEvents
	$el.delegate('button','click',addtitle)
	events.on('notify', _notify)
	events.on('sub_add', add)
	// events.on('sub_remove', remove)

	_render()

// only call render when changes need to be made to the DOM. Such as updating
	function _render(){
		data = {
				subscribers: subscribers
		}

		$el.html(Mustache.render(template, data))
	}
//accepts an index or nothing. If an index is given then subscriber with the specified index is returned
	function get(indx){
		indx = indx || -1
		if(indx != -1)
			return subscribers[indx]
		return subscribers;
	}
// adds subscriber to the subscriber list by just specifying the name. Other info such as notifications and tell info are added
// as they arrive from the event queue.
//extract subscriber names from the subscriber objects
	function add(name){
		subs = subscribers.map(function(sub, indx){

			return sub.name.toLowerCase()
		});

		// check if the  name exists. If the name does not exist then -1 is returned. If the subscriber
		// exist then we do not change anything and add the subscriber to the subscriber list

		indx = subs.indexOf(name.toLowerCase())
		if(indx != -1) {
			alert(name + ' already exists!')
			return
		}

		// add subcriber name to array of subscribers
		subscribers.push({'name' : name})
		_render()
	}


// notify subscribers on tells 'Titles' they have Subscribed. For every subscriber object initialize tells and notifications if empty
// notifications happen for each subscriber in subscriber list
// once all subscribers have been checked for subscription to specific tell
// call the render function to update the dom and display notifications to Subscribers


	function _notify(info){
		subscribers.forEach(function(sub, indx){
			sub.titles = sub.titles ||  []
			sub.tellers = sub.tellers || []
			sub.keywords = sub.keywords || []
			sub.notifications = sub.notifications || []
			if(sub.titles.indexOf(info.title)!= -1 || sub.tellers.indexOf(info.teller)!= -1 || sub.keywords.indexOf(info.keyword)!= -1)
			sub.notifications.push(info)
			// if the subscriber follows the title then they will be notifed

		});

		_render()
	}

// call function when the subscribe function is clicked
// this function will add the tell title to the textbox to the list of subscribed tells
// takes in click event as a parameter
// the selectot for event.target will return the DOM for click subscribe button and caches it in a local variable called '$currentEl'

	function addtitle(event){
        $currentEl = $(event.target)
        $sub = $currentEl.closest('.subscriber');
        name = $sub.find('h4').html(); // corresponding subscriber Name
        title = $sub.find('input')[0].value; // new title wishing to subscribe to which is typed into the textbox
				teller = $sub.find('input')[1].value // new teller to subscribe to
				keyword = $sub.find('input')[2].value // keyword to subscribe to

		subscribers.forEach(function(sub, indx){
			if(name.toLowerCase() == sub.name.toLowerCase()){
				sub.titles = sub.titles || []
				sub.tellers = sub.tellers || []
				sub.keywords = sub.keywords || []


				if(sub.titles.indexOf(title) == -1 || sub.tellers.indexOf(teller) == -1 || sub.keywords.indexOf(keyword) ){ // if subscribed dont do anything
					sub.titles.push(title);
					sub.tellers.push(teller);
					sub.keywords.push(keyword)

				// if not Subscribed then add to list of tells and rerender the screen with render function
					_render()
					return;
				}

			}

		});
	}
// END OF ADD TITLE function

	function removetitle(title){
		indx = Subscribers.indexOf(title)
		if(indx != -1) {
			titles.splice(indx,1);
			_render()
		}
	}

	return{
		get: get,
		unsubscribe: removetitle
	}
})();


// Start of publisher module
// only DOM elements to cache is the publisher list

var Publisher = (function(){

	var publishers = []

	//cacheDOM
	var $el = $('#publisher-list')
	var template = $el.html()

	//bindEvents (DOM)
	$el.delegate('button','click',send)
	// when clicked send text in the title,teller and Keyword textboxes and send it to the subpub module
	// to notify the correct subscribers

	//bindEvents (PubSub)
	events.on('pub_add', add)
	events.on('pub_remove', remove) // preserves decoupling

	_render();

	function _render(){
		// pass publishers array which has list of publishers
		// and the corresponding name and works of each publisher are accessed directly from the mustache template as seen
		// in index.html file. Denoted as {{name}} AND {{works}}
		data = {
				publishers: publishers
		}
		$el.html(Mustache.render(template, data))
	}
// retrieve specific publisher by index. If nothing is specified then the entire publishers array is returned
//
	function get(indx){
		indx = indx || -1
		if(indx != -1)
			return publishers[indx]
		return publishers;
	}

// Add a publisher to the list of Publishers
// storing as an object literal and pushed into the publisher array if it doesnt exist

	function add(name){

		pubs = publishers.map(function(pub, indx){

			return [pub.name.toLowerCase()]

		});

		indx = pubs.indexOf(name.toLowerCase())
		if(indx != -1) {
			alert(name + ' is already a publisher!')
			return
		}
// since the array changes, the DOM must be updated using render()
		publishers.push({'name' : name})

		_render()
	}

	function remove(pub){
		pubs = publishers.map(function(publisher){
			return publisher.name;
		});

		indx = pubs.indexOf(pub);

		if(indx != -1) {
			publishers.splice(indx, 1)
			_render()
		}
	}
// takes cick event as a parameter when a publisher clicks 'Publish' button
// selector target returns the DOM for the click event publish button and
// cache it in a local variable called $currentEl

	function send(event){
        $currentEl = $(event.target)
        $pub = $currentEl.closest('.publisher');
        name = $pub.find('h4').html();
        title = $pub.find('input')[0].value;
				teller = $pub.find('input')[1].value;
				keyword = $pub.find('input')[2].value;
				date = 	new Date().toString();
				uniqueId = 'id-' + Math.random().toString(36).substr(2, 16);
				notificationCount = publishers.length;


// teller info is an object literal containing their name
// title uniqueId, teller name, keywords and date & time the notification is received

		tellInfo = {
			'name':name,
			'uniqueId':uniqueId,
			'title': title,
			'teller':teller,
			'keyword':keyword,
			'date':date


		};

		pubs = publishers.map(function(publisher){
			return publisher.name;
		});

// extract list of names from the publishers array and find the index of this publisher
// then retrieve the list of tellInfo that this publisher has pubished


		indx = pubs.indexOf(tellInfo.name);
// tellInfo is initialized as an empty array if its the first time that publisher has released tellInfo

		publishers[indx].tellInfos = publishers[indx].tellInfos || []

		publishers[indx].tellInfos.push({
			'uniqueId':uniqueId,
			'title':title,
			'teller':teller,
			'keyword':keyword,
			'date':date

		});


		_render();

// notify pubsub module of the new tellInfo by triggering the notify event
// this will notify subscribers following the published topics

		events.trigger('notify', tellInfo)
	}
// expose API
	return {
		get: get,
		send: send
	}

})();
