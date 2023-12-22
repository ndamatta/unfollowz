//BURGER BUTTON
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
   navbarMenu.classList.toggle('is-active');
})

function removeDate(list) {
  //lang words
  const eng_words = 'Following|Accounts you choose to see content from';
  const spa_words = 'Seguidos|Cuentas cuyo contenido eliges ver';

  //regex and adding g flag
  const regexPattern = `\\b(?:[A-Z][a-z]{2}\\s\\d{1,2},\\s\\d{4},\\s\\d{1,2}:\\d{2}\\s(?:AM|PM)|\\d{1,2}\\s[A-z][a-z]{2}.\\s\\d{4}\\s\\d{1,2}:\\d{1,2}|${eng_words}|${spa_words})\\b`;
  const regex = new RegExp(regexPattern, 'g');

  return list.map(item => {
    const match = item.match(regex);
    return match ? item.replace(regex, '').trim() : item.trim();
  });
}

function displayOutputElements(newOutput) {
  const output = document.querySelector('#output');
  const outputSection = document.getElementById('outputSection');
  const separator = document.querySelector('.separator');

  output.innerHTML = newOutput;
  separator.style.display = 'block';
  outputSection.style.display = 'block';
}

function compareLists() {
  const followers = document.getElementById('followers').value.split('\n').map(item => item.trim());
  const following = document.getElementById('following').value.split('\n').map(item => item.trim());

  const cleanFollowers = removeDate(followers);
  const cleanFollowing = removeDate(following);

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