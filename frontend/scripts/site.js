function logout() {
  localStorage.clear();
  location.href = './#login';
  loadView();
}

function back() {
  if (window.localStorage.getItem('token')) {
    if (window.localStorage.getItem('provider') === 'true') {
      navigateTo('provider');
    } else {
      navigateTo('consumer');
    }
  }
}

function navigateTo(path) {
  location.href = `./#${path}`;
  loadView();
}

function checkForLoggedInStatus() {
  var fullname = localStorage.getItem('token');
  if (!fullname) {
    navigateTo('login');
    loadView();
    return false;
  }
  return true;
}

function loadView() {
  var path = location.href.split('#')[1];
  $.get(`./templates/${path}.html`)
    .then((content) => $('#view').html(content))
    .catch(console.error);
}

$(function () {
  loadView();
  showHideUserOptions();
});

function showHideUserOptions() {
  var fullname = localStorage.getItem('fullname');
  if (!fullname) {
    $('#visitorOptions').show();
    $('#userOptions').hide();
  } else {
    $('#visitorOptions').hide();
    $('#userOptions').show();
  }
}
