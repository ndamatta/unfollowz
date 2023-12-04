function compareLists() {
    const listA = document.getElementById('listA').value.split('\n').map(item => item.trim());
    const listB = document.getElementById('listB').value.split('\n').map(item => item.trim());
  
    return listB.filter(item => !listA.includes(item)).sort();
  }
  
  function showOutput() {
    const outputList = compareLists();
    const outputElement1 = document.getElementById('output1');
    const outputElement2 = document.getElementById('output2');
    const outputSection = document.getElementById('outputSection');
  
    if (outputList.length === 0) {
      outputElement1.classList.add('has-text-success', 'has-background-dark', 'py-1', 'px-3')
      outputElement1.innerText = `you don't have any unfollowerZ`;
      outputElement2.innerText = `All the people you follow, is following you back!`;
      outputSection.style.display = 'block';
    } else {
      outputElement1.innerText = outputList.join('\n');
      outputSection.style.display = 'block';
    }
  }