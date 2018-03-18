/*
  TODOs:
  1. Grab all emails using fetchEmailsFromDatabase
  2. Implement and run the fetched emails through getFilteredEmails

  HINTs:
  1. Read documentation for "fetchEmailsFromDatabase" carefully
  2. Make use of "cursor" and "next" like paging results from APIs
*/

function render() {
  // TODO 1: Your Code Here
var allemails = [];
var nextcursor = 0;

//all emails
fetchEmailsFromDatabase(nextcursor, grabsection);
function grabsection(arg){
    if(allemails.length>= 7){
      //fetch all emails page by page until end length 7
      //pushing the resulting array from get filtered into the function already created rendemails
      return renderEmails(getFilteredEmails(allemails));
    }
    //once Finished fetching render
    nextcursor = arg["next"];
        arg.result.forEach(function(element){
          //avoid duplicates
            if(!allemails.includes(element)){
                allemails.push(element);
            }
        });
        return nextcursor, fetchEmailsFromDatabase(nextcursor, grabsection);
    }
//all emails

}

/*
  Emails are of format { author: String, subject: String, body: String }

  args:
    allEmails: [Email], All emails fetched from fetchEmailsFromDatabase
    searchInputs: [Strings], Inputs to filter allEmails on

  return: [Email]
          All emails that have at least one mapped value
          that has any element of searchInputs as a substring
*/

function getFilteredEmails(allEmails = [], searchInputs = getSearchInputs()) {
  // TODO 2: Your Code Here
  //returning statements of true should the text of the search inputs be included in the text of each part of the email's text
  function isMatch(obj) {
    // first line search string
    if(obj.includes(searchInputs[0])){
      return true;
    }
    // second line search string
    if(obj.includes(searchInputs[1])){
      return true;
    }
    // third line search string
    if(obj.includes(searchInputs[2])){
      return true;
    }
}
//match hard-coded to return true statements if the function isMatch returns a valid includes statement for 
// each of the values in each key of the email object
function match(email) {
  // if any of the top following match then return true to capture the object in the filter
  if (isMatch(email.author) || isMatch(email.subject) || isMatch(email.body)) {
    return true;
  } 
  return false; 
}
//filter to return an array of all the resulting objects (emails)
var filtered = allEmails.filter(match);
return filtered;
}

render();

//  ------------ Read But Do Not Make Changes Below This Line ------------

/*
  args:
    cursor: Integer, points to emails being fetched. Defaults to the beginning.

    callback: Function with args ({result, next})
      result: emails that were fetched from this call
      next: cursor pointing to the next page of results,
            or null if there are no more results.
*/
function fetchEmailsFromDatabase(cursor = 0, callback) {
  const emails = [
    {
      author: 'Bobby Bob',
      subject: 'Hey Friend!',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      author: 'Bobby Not-Bob',
      subject: 'Hey Friend!',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      author: 'Bobby Obo',
      subject: 'Hey Friendo!',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      author: 'Jenny Jane',
      subject: 'Let me know if you are planning...',
      body: `ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    },
    {
      author: 'Jenny Janey',
      subject: 'Let Jenny know if you are planning...',
      body: `ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    },
    {
      author: 'Some Guy',
      subject: 'Please DO NOT buy my product.',
      body: `My product is a scam. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat quis nostrud.`,
    },
    {
      author: 'Some Guy',
      subject: 'Please buy my product.',
      body: `My product is the best. For just $1,000 you could buy my product and make me somewhat richer. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat quis nostrud.`,
    },
  ];

  setTimeout(() => {
    const last = emails.length;
    const next = Math.min(cursor + _.random(1, 3), last);
    const fetchedEmails = _.slice(emails, cursor, next);

    callback({
      result: fetchedEmails,
      next: cursor === last ? null : next,
    });
  }, 100);
}

function renderEmails(emails) {
  const emailListHtml = _.map(emails, ({ author, subject, body }) => {
    return `<li class="email-item">
              <div class="meta-data">
                <span> <b>${author}</b>: ${subject} </span>
                <span> Today <b> 11:07 PM </b> </span>
              </div>
              ${body}
            </li>`;
  });

  $('#js-email-list').empty().append(emailListHtml);
}

function getSearchInputs() {
  return [
    'Bobby Bob',
    'Let me know if you are planning',
    'product is the best',
  ];
}
