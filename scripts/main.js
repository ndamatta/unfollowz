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

function compareLists() {
  const followers = document.getElementById('followers').value.split('\n').map(item => item.trim());
  const following = document.getElementById('following').value.split('\n').map(item => item.trim());

  const cleanFollowers = removeDate(followers);
  const cleanFollowing = removeDate(following);

  return cleanFollowing.filter(item => !cleanFollowers.includes(item)).sort();
}
  
function showOutput() {
  const outputList = compareLists();
  const outputSection = document.getElementById('outputSection');
  const output = document.querySelector('#output');

  outputSection.scrollIntoView({ behavior: "smooth", block: "start" });
  console.log(outputList);
  
  if (outputList.length === 0) {
    const outputHTML = `
      <p class="has-text-success has-background-dark py-1 px-3 mb-5">You don't have any unfollowerZ</p>
      <p>All the people you follow are following you back!</p>
    `;
    output.innerHTML = outputHTML;
    outputSection.style.display = 'block';
  } else {
    let outputHTML = `<p class="has-text-danger has-background-dark py-1 px-3 mb-5">You have ${outputList.length} unfollowerZ</p>`;

    outputList.forEach(user => {
      outputHTML += `<a href="https://www.instagram.com/${user}" target="_blank">${user}</a><br>`;
    });

    output.innerHTML = outputHTML;
    outputSection.style.display = 'block';
  }
}