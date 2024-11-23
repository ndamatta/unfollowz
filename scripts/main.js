//BURGER BUTTON
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
   navbarMenu.classList.toggle('is-active');
})

//HOW TO BUTTON
const howtobtn = document.querySelector('#howtobtn');
if (howtobtn) {
  howtobtn.addEventListener("click", () => {
    var url = "https://github.com/ndamatta/unfollowz/blob/main/howToDownloadInfo.md";
    window.open(url, "_blank");
  });
}


function extractUsername(list) {
  const usernameRegex = /\b(?!Following|Profiles)[a-zA-Z0-9._]+\b/;

  return list.map(item => {
    // Match the username
    const match = item.match(usernameRegex);
    return match ? match[0] : '';
  });
}

function displayOutputElements(newOutput) {
  const output = document.querySelector('#output');
  const outputSection = document.querySelector('#outputSection');
  const separator = document.querySelector('.separator');

  output.innerHTML = newOutput;
  separator.style.display = 'block';
  outputSection.style.display = 'block';
}

function compareLists() {
  const followers = document.querySelector('#followers').value.split('\n').map(item => item.trim());
  const following = document.querySelector('#following').value.split('\n').map(item => item.trim());

  const cleanFollowers = extractUsername(followers);
  const cleanFollowing = extractUsername(following);

    return cleanFollowing.filter(item => !cleanFollowers.includes(item)).sort();
}
  
function showOutput() {
  const outputList = compareLists();
  outputSection.scrollIntoView({ behavior: "smooth", block: "start" });
  
  if (outputList.length === 0) {
    const outputHTML = `
      <p class="success has-text-weight-bold py-3 px-5 mb-5 animate__animated animate__bounceIn">You don't have any unfollowerZ</p>
      <p>All the people you follow are following you back!</p>
    `;
    displayOutputElements(outputHTML);
  } else {
    let outputHTML = `<p class="danger has-text-weight-bold has-text-danger py-3 px-5 mb-5 animate__animated animate__bounceIn">You have ${outputList.length} unfollowerZ</p>`;

    outputList.forEach(user => {
      outputHTML += `<a href="https://www.instagram.com/${user}" target="_blank">${user}</a><br>`;
    });
    displayOutputElements(outputHTML)
  }
}
const findUnfollowerzBtn = document.querySelector('#findUnfollowerzBtn');
findUnfollowerzBtn.addEventListener('click', function(){showOutput()})