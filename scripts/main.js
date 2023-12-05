function removeDate(list) {
  const regex = /\b(?:[A-Z][a-z]{2}\s\d{1,2},\s\d{4},\s\d{1,2}:\d{2}\s(?:AM|PM)|Following|Accounts you choose to see content from)\b/g;
  return list.map(item => {
    const match = item.match(regex);
    return match ? item.replace(regex, '').trim() : item.trim();
  });
}

function compareLists() {
  const igSuffix = 'https://www.instagram.com/';
  const followers = document.getElementById('followers').value.split('\n').map(item => item.trim());
  const following = document.getElementById('following').value.split('\n').map(item => item.trim());

  const cleanFollowers = removeDate(followers);
  const cleanFollowing = removeDate(following).map(item => item.includes(igSuffix) ? item : igSuffix + item);

  return cleanFollowing
    .filter(item => !cleanFollowers.includes(item))
    .sort();
}
  
function showOutput() {
  const outputList = compareLists();
  const outputElement1 = document.getElementById('output1');
  const outputElement2 = document.getElementById('output2');
  const outputSection = document.getElementById('outputSection');
  
  outputSection.scrollIntoView({behavior: "smooth", block: "start"});

  if (outputList.length === 0) {

      outputElement1.classList.remove('has-text-danger')
      outputElement1.classList.add('has-text-success', 'has-background-dark', 'py-1', 'px-3', 'my-1')
      outputElement1.innerText = `you don't have any unfollowerZ`;
      outputElement2.innerText = `All the people you follow, is following you back!`;
      outputSection.style.display = 'block';
  } else {
      outputElement1.classList.remove('has-text-success')
      outputElement1.classList.add('has-text-danger', 'has-background-dark', 'py-1', 'px-3', 'my-1')
      outputElement1.innerText = `you have unfollowerZ`;
      outputElement2.innerText = outputList.join('\n')
      outputSection.style.display = 'block';
  }
}