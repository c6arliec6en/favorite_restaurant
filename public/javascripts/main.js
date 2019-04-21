const dropDown = document.querySelector('[data-toggle=dropdown]')

dropDown.addEventListener('click', () => {
  const dropDownMenu = document.querySelector('.dropdown-menu')
  dropDownMenu.classList.toggle('show')
})

